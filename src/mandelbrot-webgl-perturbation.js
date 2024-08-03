import { antiAliasing, maxIters, perturbationPoint, viewBounds } from "./main.js";
import { getProgramInfo } from "./webgl.js";

const canvas = document.getElementById("glcanvas");

// Fragment shader program
function fsSource() {
    let src = `
    precision highp float;

    uniform float uZReHistory[${maxIters}];
    uniform float uZImHistory[${maxIters}];

    uniform vec2 uDeltaOrigin;
    uniform vec2 uViewSize;
    
    varying vec2 coords;


    void main() {
        vec2 dc = uDeltaOrigin + coords * uViewSize;
        vec2 dz = dc;

        for (int i = 0; i < ${maxIters}; i++) {
            vec2 z0 = vec2(uZReHistory[i], uZImHistory[i]);
            vec2 z = z0 + dz;
            if (dot(z, z) > 4.0) {
                float t = float(i) + 1. - log(log(dot(z, z)))/log(2.);
                gl_FragColor = vec4(
                    (-cos(0.02 * t) + 1.0) / 2.0, 
                    (-cos(0.03 * t) + 1.0) / 2.0, 
                    (-cos(0.05 * t) + 1.0) / 2.0, 
                    1.0
                );
                return;
            }
            // dz' = 2 * z * dz + dz^2 + dc
            dz = vec2(
                2.0 * z0.x * dz.x - 2.0 * z0.y * dz.y + dz.x * dz.x - dz.y * dz.y + dc.x,
                2.0 * z0.x * dz.y + 2.0 * z0.y * dz.x + 2.0 * dz.x * dz.y + dc.y
            );
        }

        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    }
    `;

    return src;
};

function getBaseZHistory() {
    let z0 = perturbationPoint;
    const zReHistory = [z0.re.toNumber()];
    const zImHistory = [z0.im.toNumber()];
    for (let iter = 0; iter < maxIters - 1; iter++) {
        const zNew = {
            re: z0.re.times(z0.re).minus(z0.im.times(z0.im)).plus(perturbationPoint.re),
            im: z0.re.times(z0.im).times(2.0).plus(perturbationPoint.im),
        };
        z0 = zNew;
        zReHistory.push(zNew.re.toNumber());
        zImHistory.push(zNew.im.toNumber());
    }

    return { zReHistory, zImHistory };
}

function drawScene(programInfo) {
    const { gl, buffers, program, attribLocations, uniformLocations } = programInfo;

    // Tell WebGL how to pull out the positions from the position
    // buffer into the vertexPosition attribute.
    const numComponents = 2; // pull out 2 values per iteration
    const type = gl.FLOAT; // the data in the buffer is 32bit floats
    const normalize = false; // don't normalize
    const stride = 0; // how many bytes to get from one set of values to the next
    // 0 = use type and numComponents above
    const offset = 0; // how many bytes inside the buffer to start from
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
        attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset,
    );
    gl.enableVertexAttribArray(attribLocations.vertexPosition);

    // Tell WebGL to use our program when drawing
    gl.useProgram(program);

    const { zReHistory, zImHistory } = getBaseZHistory();

    // Set the shader uniforms
    gl.uniform1fv(uniformLocations.uZReHistory, zReHistory);
    gl.uniform1fv(uniformLocations.uZImHistory, zImHistory);

    gl.uniform2fv(uniformLocations.uDeltaOrigin, [viewBounds.x0.minus(perturbationPoint.re), viewBounds.y0.minus(perturbationPoint.im)]);

    gl.uniform2fv(uniformLocations.uViewSize, [viewBounds.x1.minus(viewBounds.x0), viewBounds.y1.minus(viewBounds.y0)]);

    if (programInfo.uniformLocations.uPixWidth) {
        const pixWidth = viewBounds.x1.minus(viewBounds.x0).div(canvas.width).toNumber();
        gl.uniform2fv(uniformLocations.uPixWidth, split_float(pixWidth));
    }

    {
        const offset = 0;
        const vertexCount = 4;
        gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
    }
}

const UNIFORMS = [
    "uZReHistory", "uZImHistory", "uDeltaOrigin", "uViewSize",
];

let programInfo;

// Draw the scene
export function render(refresh = false) {
    if (!programInfo || refresh) {
        programInfo = getProgramInfo(fsSource(), UNIFORMS);
    }
    // Draw the scene
    drawScene(programInfo, viewBounds);
}

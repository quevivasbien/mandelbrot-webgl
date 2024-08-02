import { antiAliasing, maxIters, viewBounds } from "./main.js";
import { getProgramInfo } from "./webgl.js";

const canvas = document.getElementById("glcanvas");

// Fragment shader program
function fsSource() {
    if (antiAliasing === 1) {
        return `
        precision highp float;

        uniform float uX0;
        uniform float uY0;
        uniform float uX1;
        uniform float uY1;

        varying vec2 coords;
        void main() {
            vec2 c = vec2(
                coords.x * (uX1 - uX0) + uX0,
                coords.y * (uY1 - uY0) + uY0
            );
            vec2 z = c;
            for (int i = 0; i < ${maxIters}; i++) {
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
                z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
            }
            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
        }
        `;
    }
    else {
        return `
        precision highp float;

        uniform float uX0;
        uniform float uY0;
        uniform float uX1;
        uniform float uY1;

        uniform float uPixWidth;
        
        varying vec2 coords;

        vec4 iteration(vec2 c) {
            vec2 z = c;
            for (int i = 0; i < ${maxIters}; i++) {
                if (dot(z, z) > 4.0) {
                    float t = float(i) + 1. - log(log(dot(z, z)))/log(2.);
                    return vec4(
                        (-cos(0.02 * t) + 1.0) / 2.0, 
                        (-cos(0.03 * t) + 1.0) / 2.0, 
                        (-cos(0.05 * t) + 1.0) / 2.0, 
                        1.0
                    );
                }
                z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
            }
            return vec4(0.0, 0.0, 0.0, 1.0);
        }

        void main() {
            vec2 cBase = vec2(
                coords.x * (uX1 - uX0) + uX0 - 0.5 * uPixWidth,
                coords.y * (uY1 - uY0) + uY0 - 0.5 * uPixWidth
            );
            for (int xi = 0; xi < ${antiAliasing}; xi++) {
                for (int yi = 0; yi < ${antiAliasing}; yi++) {
                    vec2 c = cBase + vec2(
                        float(xi) + 0.5,
                        float(yi) + 0.5
                    ) * uPixWidth / ${antiAliasing}.0;
                    gl_FragColor = gl_FragColor + iteration(c) / (${antiAliasing}.0 * ${antiAliasing}.0);
                }
            }
        }
        `;
    }
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

    // Set the shader uniforms
    gl.uniform1f(uniformLocations.uX0, viewBounds.x0);
    gl.uniform1f(uniformLocations.uY0, viewBounds.y0);
    gl.uniform1f(uniformLocations.uX1, viewBounds.x1);
    gl.uniform1f(uniformLocations.uY1, viewBounds.y1);

    if (programInfo.uniformLocations.uPixWidth) {
        const pixWidth = viewBounds.x1.minus(viewBounds.x0).div(canvas.width);
        gl.uniform1f(uniformLocations.uPixWidth, pixWidth);
    }

    {
        const offset = 0;
        const vertexCount = 4;
        gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
    }
}

let programInfo;

// Draw the scene
export function render(refresh = false) {
    if (!programInfo || refresh) {
        programInfo = getProgramInfo(fsSource());
    }
    // Draw the scene
    drawScene(programInfo);
}

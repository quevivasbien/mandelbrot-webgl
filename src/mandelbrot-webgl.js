import { initBuffers } from "./init-buffers.js";
import { maxIters, viewBounds } from "./main.js";

// Vertex shader program
const vsSource = `
precision highp float;

attribute vec4 aVertexPosition;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

varying vec2 coords;

void main(void) {
    gl_Position = aVertexPosition;
    coords = vec2(aVertexPosition.x, aVertexPosition.y) * 0.5 + 0.5;
}
`;

// Fragment shader program
const fsSource = () => {
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
};


//
// creates a shader of the given type, uploads the source and
// compiles it.
//
function loadShader(gl, type, source) {
    const shader = gl.createShader(type);

    // Send the source to the shader object

    gl.shaderSource(shader, source);

    // Compile the shader program

    gl.compileShader(shader);

    // See if it compiled successfully

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(
            `An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`
        );
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}

//
// Initialize a shader program, so WebGL knows how to draw our data
//
function initShaderProgram(gl, vsSource, fsSource) {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    // Create the shader program

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    // If creating the shader program failed, alert

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert(
            `Unable to initialize the shader program: ${gl.getProgramInfoLog(
                shaderProgram
            )}`
        );
        return null;
    }

    return shaderProgram;
}

function getProgramInfo() {
    const canvas = document.getElementById("glcanvas");
    const gl = canvas.getContext("webgl");
    if (!gl) {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
        return;
    }

    const shaderProgram = initShaderProgram(gl, vsSource, fsSource());

    // Collect all the info needed to use the shader program.
    return {
        gl,
        program: shaderProgram,
        attribLocations: {
            vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
        },
        uniformLocations: {
            uX0: gl.getUniformLocation(shaderProgram, "uX0"),
            uY0: gl.getUniformLocation(shaderProgram, "uY0"),
            uX1: gl.getUniformLocation(shaderProgram, "uX1"),
            uY1: gl.getUniformLocation(shaderProgram, "uY1"),
        },
        buffers: initBuffers(gl),
    };
}

function drawScene(programInfo, bounds) {
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
    gl.uniform1f(uniformLocations.uX0, bounds.x0);
    gl.uniform1f(uniformLocations.uY0, bounds.y0);
    gl.uniform1f(uniformLocations.uX1, bounds.x1);
    gl.uniform1f(uniformLocations.uY1, bounds.y1);

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
        programInfo = getProgramInfo();
    }
    // Draw the scene
    drawScene(programInfo, viewBounds);
}

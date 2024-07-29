import { initBuffers } from "./init-buffers.js";
import { drawScene } from "./draw-scene.js";

const canvas = document.getElementById("glcanvas");

const viewBounds = {
    x0: -2.0,
    y0: -1.5,
    x1: 1.0,
    y1: 1.5,
};

function updateCanvasSize() {
    // Base canvas width and height on window size
    canvas.width = 0.8 * window.innerWidth;
    canvas.height = 0.8 * window.innerHeight;

    // Update y bounds based on canvas height
    const yCenter = 0.5 * (viewBounds.y0 + viewBounds.y1);
    const yRange = (canvas.height / canvas.width) * (viewBounds.x1 - viewBounds.x0);
    viewBounds.y0 = yCenter - 0.5 * yRange;
    viewBounds.y1 = yCenter + 0.5 * yRange;
}

updateCanvasSize();

// When the window is resized, update the canvas size
window.addEventListener("resize", () => {
    updateCanvasSize();
    console.log("Resized");
    render(true);
});

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

const maxIters = 300;

// Fragment shader program
const fsSource = `
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
        z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
        if (length(z) > 2.0) {
            float t = float(i) + 1. - log(log(length(z)))/log(2.);
            gl_FragColor = vec4(
                (-cos(0.02 * t) + 1.0) / 2.0, 
				(-cos(0.03 * t) + 1.0) / 2.0, 
				(-cos(0.05 * t) + 1.0) / 2.0, 
				1.0
            );
            return;
        }
    }
    float s = length(c) / 2.0;
    gl_FragColor = vec4(s, s, s, 1.0);
}
`;


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
    const gl = canvas.getContext("webgl");
    if (!gl) {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
        return;
    }

    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

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

let programInfo = getProgramInfo();

let frameTimes = [];

// Draw the scene
function render(refresh = false) {
    const startTime = performance.now();
    if (refresh) {
        programInfo = getProgramInfo();
    }
    // Draw the scene
    drawScene(programInfo, viewBounds);
    frameTimes.push(performance.now() - startTime);
    if (frameTimes.length === 100) {
        console.log(`Avg frame time for last 100 frames: ${frameTimes.reduce((a, b) => a + b, 0) / 100}ms`);
        frameTimes = [];
    }
}

function move(x, y) {
    const width = viewBounds.x1 - viewBounds.x0;
    const height = viewBounds.y1 - viewBounds.y0;
    viewBounds.x0 += x * width;
    viewBounds.x1 += x * width;
    viewBounds.y0 += y * height;
    viewBounds.y1 += y * height;
}

function zoom(amt) {
    const width = (viewBounds.x1 - viewBounds.x0) / amt;
    const height = (viewBounds.y1 - viewBounds.y0) / amt;
    const xCenter = 0.5 * (viewBounds.x0 + viewBounds.x1);
    const yCenter = 0.5 * (viewBounds.y0 + viewBounds.y1);
    viewBounds.x0 = xCenter - 0.5 * width;
    viewBounds.x1 = xCenter + 0.5 * width;
    viewBounds.y0 = yCenter - 0.5 * height;
    viewBounds.y1 = yCenter + 0.5 * height;
}

const keyPresses = {
    left: false,
    right: false,
    up: false,
    down: false,
    zoomOut: false,
    zoomIn: false,
};

const keyBindings = {
    left: "a",
    right: "d",
    up: "w",
    down: "s",
    zoomOut: "q",
    zoomIn: "e",
};

// Bind keyboard events
window.addEventListener("keydown", (event) => {
    switch (event.key) {
        case keyBindings.left:
            keyPresses.left = true;
            break;
        case keyBindings.right:
            keyPresses.right = true;
            break;
        case keyBindings.up:
            keyPresses.up = true;
            break;
        case keyBindings.down:
            keyPresses.down = true;
            break;
        case keyBindings.zoomOut:
            keyPresses.zoomOut = true;
            break;
        case keyBindings.zoomIn:
            keyPresses.zoomIn = true;
            break;
    }
});

window.addEventListener("keyup", (event) => {
    switch (event.key) {
        case keyBindings.left:
            keyPresses.left = false;
            break;
        case keyBindings.right:
            keyPresses.right = false;
            break;
        case keyBindings.up:
            keyPresses.up = false;
            break;
        case keyBindings.down:
            keyPresses.down = false;
            break;
        case keyBindings.zoomOut:
            keyPresses.zoomOut = false;
            break;
        case keyBindings.zoomIn:
            keyPresses.zoomIn = false;
            break;
    }
});

document.getElementById('up-key').innerText = keyBindings.up.toUpperCase();
document.getElementById('left-key').innerText = keyBindings.left.toUpperCase();
document.getElementById('down-key').innerText = keyBindings.down.toUpperCase();
document.getElementById('right-key').innerText = keyBindings.right.toUpperCase();
document.getElementById('zoom-out-key').innerText = keyBindings.zoomIn.toUpperCase();
document.getElementById('zoom-in-key').innerText = keyBindings.zoomOut.toUpperCase();


document.getElementById("zoom-out").addEventListener("click", () => {
    zoom(0.5);
    render();
});

document.getElementById("zoom-in").addEventListener("click", () => {
    zoom(2);
    render();
});

document.getElementById("move-up").addEventListener("click", () => {
    move(0, 0.2);
    render();
});

document.getElementById("move-down").addEventListener("click", () => {
    move(0, -0.2);
    render();
});

document.getElementById("move-left").addEventListener("click", () => {
    move(-0.2, 0);
    render();
});

document.getElementById("move-right").addEventListener("click", () => {
    move(0.2, 0);
    render();
});

function checkForMovement() {
    let x = 0;
    let y = 0;
    let zoom_amt = 1;
    if (keyPresses.left) {
        x -= 0.02;
    }
    if (keyPresses.right) {
        x += 0.02;
    }
    if (keyPresses.up) {
        y += 0.02;
    }
    if (keyPresses.down) {
        y -= 0.02;
    }
    if (keyPresses.zoomOut) {
        zoom_amt *= 0.8;
    }
    if (keyPresses.zoomIn) {
        zoom_amt *= 1.25;
    }
    if (x !== 0 || y !== 0) {
        move(x, y);
    }
    if (zoom_amt !== 1) {
        zoom(zoom_amt);
    }
    if (x !== 0 || y !== 0 || zoom_amt !== 1) {
        render();
    }
}

function renderLoop() {
    checkForMovement();
    requestAnimationFrame(renderLoop);
}

render();
renderLoop();

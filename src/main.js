import * as MandelbrotWebGL from "./mandelbrot-webgl.js";
import * as MandelbrotWebGL64 from "./mandelbrot-webgl-64.js";
import * as MandelbrotVanilla from "./mandelbrot-vanilla.js";
import * as MandelbrotPerturbation from "./mandelbrot-perturbation.js";

const glcanvas = document.getElementById("glcanvas");
const canvas2d = document.getElementById("2dcanvas");

let canvas = glcanvas;
let render = MandelbrotWebGL.render;

export const viewBounds = {
    x0: -2.0,
    y0: -1.5,
    x1: 1.0,
    y1: 1.5,
};

function updateCanvasSize() {
    // Base canvas width and height on window size
    canvas.width = 0.8 * window.innerWidth;
    canvas.height = 0.8 * window.innerHeight;

    console.log(`Canvas size: ${canvas.width}x${canvas.height}`);

    // Update y bounds based on canvas height
    const yCenter = 0.5 * (viewBounds.y0 + viewBounds.y1);
    const yRange = (canvas.height / canvas.width) * (viewBounds.x1 - viewBounds.x0);
    viewBounds.y0 = yCenter - 0.5 * yRange;
    viewBounds.y1 = yCenter + 0.5 * yRange;
}

// When the window is resized, update the canvas size
window.addEventListener("resize", () => {
    updateCanvasSize();
    console.log("Resized");
    render(true);
});

function setCanvas(gl) {
    if (gl) {
        canvas = glcanvas;
        updateCanvasSize();
        canvas2d.style.display = "none";
        glcanvas.style.display = "block";
    }
    else {
        canvas = canvas2d;
        updateCanvasSize();
        canvas2d.style.display = "block";
        glcanvas.style.display = "none";
    }
}

setCanvas(true);

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

document.getElementById("render-type").addEventListener("change", (event) => {
    if (event.target.value === "WebGL") {
        render = MandelbrotWebGL.render;
        setCanvas(true);
    }
    else if (event.target.value === "WebGL-64") {
        render = MandelbrotWebGL64.render;
        setCanvas(true);
    }
    else if (event.target.value === "JS") {
        render = MandelbrotVanilla.render;
        setCanvas(false);
    }
    else if (event.target.value === "JS-Perturb") {
        render = MandelbrotPerturbation.render;
        setCanvas(false);
    }
    render(true);
});
document.getElementById("render-type").value = "WebGL";

function renderLoop() {
    checkForMovement();
    requestAnimationFrame(renderLoop);
}

render();
renderLoop();
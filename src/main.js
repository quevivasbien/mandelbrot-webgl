import Decimal from "decimal.js";
import * as MandelbrotWebGL from "./mandelbrot-webgl.js";
import * as MandelbrotWebGL64 from "./mandelbrot-webgl-64.js";
import * as MandelbrotVanilla from "./mandelbrot-vanilla.js";
import * as MandelbrotPerturbation from "./mandelbrot-perturbation.js";

const glcanvas = document.getElementById("glcanvas");
const canvas2d = document.getElementById("2dcanvas");

let canvas = glcanvas;
let renderFn = MandelbrotWebGL.render;

export const viewBounds = {
    x0: new Decimal(-2.0),
    y0: new Decimal(-1.5),
    x1: new Decimal(1.0),
    y1: new Decimal(1.5),
};

export let maxIters = document.getElementById("max-iters").value;
let autoMaxIters = document.getElementById("auto-max-iters").checked;

export let antiAliasing = parseInt(document.getElementById("anti-aliasing").value);

function updateMaxIters(newMaxIters) {
    if (!newMaxIters) {
        return;
    }
    maxIters = newMaxIters;
    document.getElementById("max-iters").value = maxIters;
}

function autoSetMaxiters() {
    let zoomLevel = Math.log(viewBounds.x1.minus(viewBounds.x0).toNumber());
    let itersNeeded = 100 * ((zoomLevel < 0) ? Math.ceil(-zoomLevel / 2) : 1);
    if (maxIters !== itersNeeded) {
        updateMaxIters(itersNeeded);
        return true;
    }
    return false;
}

function render(refresh = false) {
    // If maxIters is auto, check if max iters needs to be changed
    if (autoMaxIters) {
        refresh |= autoSetMaxiters();
    }

    renderFn(refresh);
}

document.getElementById("auto-max-iters").addEventListener("click", () => {
    autoMaxIters = document.getElementById("auto-max-iters").checked;
    document.getElementById("max-iters").disabled = autoMaxIters;
    if (autoSetMaxiters()) {
        render(true);
    }
});

document.getElementById("max-iters").addEventListener("input", () => {
    updateMaxIters(parseInt(document.getElementById("max-iters").value));
    render(true);
});

document.getElementById("anti-aliasing").addEventListener("change", (e) => {
    antiAliasing = parseInt(e.target.value);
    render(true);
})

function updateCanvasSize() {
    // Base canvas width and height on window size
    canvas.width = 0.8 * window.innerWidth;
    canvas.height = 0.8 * window.innerHeight;

    console.log(`Canvas size: ${canvas.width}x${canvas.height}`);

    // Update y bounds based on canvas height
    const yCenter = viewBounds.y0.plus(viewBounds.y1).times(0.5);
    const yRange = viewBounds.x1.minus(viewBounds.x0).times(canvas.height / canvas.width);
    viewBounds.y0 = yCenter.minus(yRange.times(0.5));
    viewBounds.y1 = yCenter.plus(yRange.times(0.5));
}

// When the window is resized, update the canvas size
window.addEventListener("resize", () => {
    updateCanvasSize();
    render(true);
});

function setMode(gl) {
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
    document.getElementById("anti-aliasing").disabled = !gl;
}

setMode(true);

document.getElementById("render-type").addEventListener("change", (event) => {
    if (event.target.value === "WebGL") {
        renderFn = MandelbrotWebGL.render;
        setMode(true);
    }
    else if (event.target.value === "WebGL-64") {
        renderFn = MandelbrotWebGL64.render;
        setMode(true);
    }
    else if (event.target.value === "JS") {
        renderFn = MandelbrotVanilla.render;
        setMode(false);
    }
    else if (event.target.value === "JS-Perturb") {
        renderFn = MandelbrotPerturbation.render;
        setMode(false);
    }
    render(true);
});
document.getElementById("render-type").value = "WebGL";

function updateViewLocLabel() {
    const xCenter = viewBounds.x0.plus(viewBounds.x1).times(0.5);
    const yCenter = viewBounds.y0.plus(viewBounds.y1).times(0.5);
    const xWidth = viewBounds.x1.minus(viewBounds.x0);
    const zoomLevel = 3.0 / xWidth.toNumber();
    const precisionNeeded = 3 + Math.floor(Math.log(zoomLevel) / Math.log(10.0));
    document.getElementById("view-loc").innerHTML = `x: ${xCenter.toPrecision(precisionNeeded)}, y: ${yCenter.toPrecision(precisionNeeded)}, zoom: ${zoomLevel.toPrecision(3)}`;
}
updateViewLocLabel();

function move(x, y) {
    const width = viewBounds.x1.minus(viewBounds.x0);
    const height = viewBounds.y1.minus(viewBounds.y0);
    viewBounds.x0 = viewBounds.x0.plus(width.times(x));
    viewBounds.x1 = viewBounds.x1.plus(width.times(x));
    viewBounds.y0 = viewBounds.y0.plus(height.times(y));
    viewBounds.y1 = viewBounds.y1.plus(height.times(y));

    updateViewLocLabel();
}

function zoom(amt) {
    const width = viewBounds.x1.minus(viewBounds.x0).div(amt);
    const height = viewBounds.y1.minus(viewBounds.y0).div(amt);
    const xCenter = viewBounds.x0.plus(viewBounds.x1).times(0.5);
    const yCenter = viewBounds.y0.plus(viewBounds.y1).times(0.5);
    viewBounds.x0 = xCenter.minus(width.times(0.5));
    viewBounds.x1 = xCenter.plus(width.times(0.5));
    viewBounds.y0 = yCenter.minus(height.times(0.5));
    viewBounds.y1 = yCenter.plus(height.times(0.5));

    updateViewLocLabel();
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
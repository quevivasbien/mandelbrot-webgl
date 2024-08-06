import Decimal from "decimal.js";
import * as MandelbrotWebGL from "./mandelbrot-webgl.js";
import * as MandelbrotWebGL64 from "./mandelbrot-webgl-64.js";
import * as MandelbrotWebGLPerturbation from "./mandelbrot-webgl-perturbation.js";
import * as MandelbrotVanilla from "./mandelbrot-vanilla.js";
import * as MandelbrotPerturbation from "./mandelbrot-perturbation.js";

const glcanvas = document.getElementById("glcanvas");
const canvas2d = document.getElementById("2dcanvas");

let canvas = glcanvas;
let renderFn = MandelbrotWebGL.render;

const coords = {
    x: new Decimal(-0.5),
    y: new Decimal(0.0),
    halfWidth: new Decimal(1.5),
}

export const viewBounds = {
    x0: new Decimal(-2.0),
    y0: new Decimal(-1.5),
    x1: new Decimal(1.0),
    y1: new Decimal(1.5),
};

function updateViewLocLabel() {
    const zoomLevel = 1.5 / coords.halfWidth.toNumber();
    const precisionNeeded = 3 + Math.floor(Math.log(zoomLevel) / Math.log(10.0));
    document.getElementById("view-loc").innerHTML = `re: ${coords.x.toPrecision(precisionNeeded)}, im: ${coords.y.toPrecision(precisionNeeded)}, zoom: ${zoomLevel.toPrecision(3)}`;
}

function updateDecimalPrecision() {
    const precisionNeeded = 4 + Math.ceil(-Math.log(coords.halfWidth) / Math.log(10.0));
    while (Decimal.precision < precisionNeeded) {
        Decimal.precision += 4;
    }
    while (Decimal.precision > precisionNeeded + 8) {
        Decimal.precision -= 4;
    }
}

function updateViewBounds() {
    const halfHeight = coords.halfWidth.times(canvas.height / canvas.width);

    viewBounds.x0 = coords.x.minus(coords.halfWidth);
    viewBounds.x1 = coords.x.plus(coords.halfWidth);
    viewBounds.y0 = coords.y.minus(halfHeight);
    viewBounds.y1 = coords.y.plus(halfHeight);

    updateViewLocLabel();
    updateDecimalPrecision();
}

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
    let zoomLevel = -Math.log(coords.halfWidth);
    let itersNeeded = 100 * ((zoomLevel > 0) ? Math.ceil(zoomLevel / 2) : 1);
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
});

const helpOverlay = document.getElementById("help-overlay");

document.getElementById("show-help-button").addEventListener("click", () => {
    helpOverlay.style.display = "block";
});

document.getElementById("close-help-button").addEventListener("click", () => {
    helpOverlay.style.display = "none";
});

helpOverlay.addEventListener("click", (e) => {
    if (e.target === helpOverlay) {
        helpOverlay.style.display = "none";
    }
});

function updateCanvasSize() {
    // Base canvas width and height on window size
    canvas.width = 0.8 * window.innerWidth;
    canvas.height = 0.8 * window.innerHeight;

    console.log(`Canvas size: ${canvas.width}x${canvas.height}`);

    updateViewBounds();
}

// When the window is resized, update the canvas size
window.addEventListener("resize", () => {
    updateCanvasSize();
    render(true);
});

export let perturbationPoint = { re: new Decimal(0.0), im: new Decimal(0.0) };

function pointFromScreenCoords(screenX, screenY) {
    const width = viewBounds.x1.minus(viewBounds.x0);
    const height = viewBounds.y1.minus(viewBounds.y0);
    return {
        re: viewBounds.x0.plus(width.times(screenX)),
        im: viewBounds.y0.plus(height.times(screenY)),
    };
}

function setPerturbationPoint(event) {
    if (renderFn !== MandelbrotPerturbation.render && renderFn !== MandelbrotWebGLPerturbation.render) {
        return;
    }
    const screenX = event.offsetX / canvas.width;
    const screenY = 1.0 - event.offsetY / canvas.height;
    perturbationPoint = pointFromScreenCoords(screenX, screenY);
    console.log(`Perturbation point: ${perturbationPoint.re}, ${perturbationPoint.im}`);
    render();
}

canvas2d.addEventListener("click", setPerturbationPoint);
glcanvas.addEventListener("click", setPerturbationPoint);

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
    else if (event.target.value === "WebGL-Perturb") {
        renderFn = MandelbrotWebGLPerturbation.render;
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

document.getElementById("download-link").addEventListener("click", () => {
    const link = document.getElementById("download-link");
    link.href = canvas.toDataURL();
});

function move(x, y) {
    coords.x = coords.x.plus(coords.halfWidth.times(x));
    coords.y = coords.y.plus(coords.halfWidth.times(y));
    updateViewBounds(); y
}

function zoom(amt) {
    coords.halfWidth = coords.halfWidth.div(amt);
    updateViewBounds();
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

const BUTTON_MOVE_AMT = 0.25;
const BUTTON_ZOOM_AMT = 2.0;

document.getElementById("zoom-out").addEventListener("click", () => {
    zoom(1 / BUTTON_ZOOM_AMT);
    render();
});

document.getElementById("zoom-in").addEventListener("click", () => {
    zoom(BUTTON_ZOOM_AMT);
    render();
});

document.getElementById("move-up").addEventListener("click", () => {
    move(0, BUTTON_MOVE_AMT);
    render();
});

document.getElementById("move-down").addEventListener("click", () => {
    move(0, -BUTTON_MOVE_AMT);
    render();
});

document.getElementById("move-left").addEventListener("click", () => {
    move(-BUTTON_MOVE_AMT, 0);
    render();
});

document.getElementById("move-right").addEventListener("click", () => {
    move(BUTTON_MOVE_AMT, 0);
    render();
});

const KEYBOARD_MOVE_AMT = 0.04;
const KEYBOARD_ZOOM_AMT = 1.25;

function checkForMovement() {
    let x = 0;
    let y = 0;
    let zoom_amt = 1;
    if (keyPresses.left) {
        x -= KEYBOARD_MOVE_AMT;
    }
    if (keyPresses.right) {
        x += KEYBOARD_MOVE_AMT;
    }
    if (keyPresses.up) {
        y += KEYBOARD_MOVE_AMT;
    }
    if (keyPresses.down) {
        y -= KEYBOARD_MOVE_AMT;
    }
    if (keyPresses.zoomOut) {
        zoom_amt /= KEYBOARD_ZOOM_AMT;
    }
    if (keyPresses.zoomIn) {
        zoom_amt *= KEYBOARD_ZOOM_AMT;
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
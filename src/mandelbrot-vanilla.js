import { maxIters, viewBounds } from "./main.js";

const canvas = document.getElementById("2dcanvas");
let ctx;

export function render(refresh = false) {
    if (!ctx || refresh) {
        ctx = canvas.getContext("2d", { willReadFrequently: true });
    }
    const newData = new Uint8ClampedArray(canvas.width * canvas.height * 4);
    const x0 = viewBounds.x0.toNumber();
    const x1 = viewBounds.x1.toNumber();
    const y0 = viewBounds.y0.toNumber();
    const y1 = viewBounds.y1.toNumber();
    for (let i = 0; i < canvas.height; i++) {
        for (let j = 0; j < canvas.width; j++) {
            const idx = i * canvas.width + j;
            const x = x0 + j * (x1 - x0) / (canvas.width - 1);
            const y = y1 - i * (y1 - y0) / (canvas.height - 1);
            const c = { re: x, im: y };
            const z = { ...c };
            for (let iter = 0; iter < maxIters; iter++) {
                if (z.re * z.re + z.im * z.im > 4.0) {
                    const t = iter + 1 - Math.log(Math.log(z.re * z.re + z.im * z.im)) / Math.log(2.0);
                    newData[idx * 4 + 0] = 255 * (1.0 - Math.cos(0.02 * t)) / 2.0;
                    newData[idx * 4 + 1] = 255 * (1.0 - Math.cos(0.03 * t)) / 2.0;
                    newData[idx * 4 + 2] = 255 * (1.0 - Math.cos(0.05 * t)) / 2.0;
                    break;
                }
                const z_re = z.re * z.re - z.im * z.im + c.re;
                z.im = 2.0 * z.re * z.im + c.im;
                z.re = z_re;
            }
            newData[idx * 4 + 3] = 255;
        }
    }
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    imageData.data.set(newData);
    ctx.putImageData(imageData, 0, 0);
}
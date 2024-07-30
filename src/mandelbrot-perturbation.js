import { viewBounds } from "./main.js";

const maxIters = 300;

const canvas = document.getElementById("2dcanvas");
let ctx;

const baseCoords = { x: 0.5, y: 0.5 };

canvas.addEventListener("click", (event) => {
    baseCoords.x = event.offsetX / canvas.width;
    baseCoords.y = 1.0 - event.offsetY / canvas.height;
    render();
});

export function render(refresh=false) {
    if (!ctx || refresh) {
        ctx = canvas.getContext("2d", { willReadFrequently: true });
    }
    const newData = new Uint8ClampedArray(canvas.width * canvas.height * 4);
    const { x0, y0, x1, y1 } = viewBounds;

    // Select base point
    const base_c = {
        re: x0 + baseCoords.x * (x1 - x0),
        im: y1 - baseCoords.y * (y1 - y0),
    };
    const base_z = [{ ...base_c }];
    for (let iter = 0; iter < maxIters - 1; iter++) {
        const z0 = base_z[iter];
        const z_new = {
            re: z0.re * z0.re - z0.im * z0.im + base_c.re,
            im: 2.0 * z0.re * z0.im + base_c.im
        };
        base_z.push(z_new);
    }

    for (let i = 0; i < canvas.height; i++) {
        for (let j = 0; j < canvas.width; j++) {
            const idx = i * canvas.width + j;
            const x = x0 + j * (x1 - x0) / (canvas.width - 1);
            const y = y1 - i * (y1 - y0) / (canvas.height - 1);
            const c = { re: x, im: y };
            const dc = { re: c.re - base_c.re, im: c.im - base_c.im };
            const z = { ...c };
            const dz = { ...dc };
            for (let iter = 0; iter < maxIters; iter++) {
                if (z.re * z.re + z.im * z.im > 4.0) {
                    const t = iter + 1 - Math.log(Math.log(z.re * z.re + z.im * z.im)) / Math.log(2.0);
                    newData[idx * 4 + 0] = 255 * (1.0 - Math.cos(0.02 * t)) / 2.0;
                    newData[idx * 4 + 1] = 255 * (1.0 - Math.cos(0.03 * t)) / 2.0;
                    newData[idx * 4 + 2] = 255 * (1.0 - Math.cos(0.05 * t)) / 2.0;
                    break;
                }
                const z0 = base_z[iter];
                // dz' = 2 * z * dz + dz^2 + dc
                const dz_re_new = 2.0 * z0.re * dz.re - 2.0 * z0.im * dz.im + dz.re * dz.re - dz.im * dz.im + dc.re;
                const dz_im_new = 2.0 * z0.re * dz.im + 2.0 * z0.im * dz.re + 2.0 * dz.re * dz.im + dc.im;
                dz.re = dz_re_new;
                dz.im = dz_im_new;
                z.re = z0.re + dz.re;
                z.im = z0.re + dz.im;
                
            }
            newData[idx * 4 + 3] = 255;
        }
    }
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    imageData.data.set(newData);
    ctx.reset();
    ctx.putImageData(imageData, 0, 0);

    // draw an X at the base point
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.moveTo((baseCoords.x - 0.005) * canvas.width, (1.0-baseCoords.y + 0.005) * canvas.height);
    ctx.lineTo((baseCoords.x + 0.005) * canvas.width, (1.0-baseCoords.y - 0.005) * canvas.height);
    ctx.stroke();

    ctx.moveTo((baseCoords.x - 0.005) * canvas.width, (1.0-baseCoords.y - 0.005) * canvas.height);
    ctx.lineTo((baseCoords.x + 0.005) * canvas.width, (1.0-baseCoords.y + 0.005) * canvas.height);
    ctx.stroke();

}
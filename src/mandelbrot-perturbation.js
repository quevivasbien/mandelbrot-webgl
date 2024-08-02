import { maxIters, viewBounds } from "./main.js";

const canvas = document.getElementById("2dcanvas");
let ctx;

const baseCoords = { x: 0.5, y: 0.5 };

canvas.addEventListener("click", (event) => {
    baseCoords.x = event.offsetX / canvas.width;
    baseCoords.y = 1.0 - event.offsetY / canvas.height;
    render();
});

export function render(refresh = false) {
    if (!ctx || refresh) {
        ctx = canvas.getContext("2d", { willReadFrequently: true });
    }
    const newData = new Uint8ClampedArray(canvas.width * canvas.height * 4);
    const { x0, y0, x1, y1 } = viewBounds;

    // Select base point
    const base_c = {
        re: x0.plus(x1.minus(x0).times(baseCoords.x)),
        im: y0.plus(y1.minus(y0).times(baseCoords.y)),
    };
    let z0 = base_c;
    const base_z = [{ re: z0.re.toNumber(), im: z0.im.toNumber() }];
    for (let iter = 0; iter < maxIters - 1; iter++) {
        const z_new = {
            re: z0.re.times(z0.re).minus(z0.im.times(z0.im)).plus(base_c.re),
            im: z0.re.times(z0.im).times(2.0).plus(base_c.im),
        };
        z0 = z_new;
        base_z.push({ re: z_new.re.toNumber(), im: z_new.im.toNumber() });
    }
    const width = x1.minus(x0).toNumber();
    const height = y1.minus(y0).toNumber();
    
    for (let i = 0; i < canvas.height; i++) {
        for (let j = 0; j < canvas.width; j++) {
            const idx = i * canvas.width + j;
            const xCoord = j / (canvas.width - 1);
            const yCoord = 1 - i / (canvas.height - 1);
            const relXCoord = xCoord - baseCoords.x;
            const relYCoord = yCoord - baseCoords.y;
            const dx = relXCoord * width;
            const dy = relYCoord * height;
            const dc = { re: dx, im: dy };
            const dz = { ...dc };
            for (let iter = 0; iter < maxIters; iter++) {
                const z0 = base_z[iter];
                const z = { re: z0.re + dz.re, im: z0.im + dz.im };
                if (z.re * z.re + z.im * z.im > 4.0) {
                    const t = iter + 1 - Math.log(Math.log(z.re * z.re + z.im * z.im)) / Math.log(2.0);
                    newData[idx * 4 + 0] = 255 * (1.0 - Math.cos(0.02 * t)) / 2.0;
                    newData[idx * 4 + 1] = 255 * (1.0 - Math.cos(0.03 * t)) / 2.0;
                    newData[idx * 4 + 2] = 255 * (1.0 - Math.cos(0.05 * t)) / 2.0;
                    break;
                }
                // dz' = 2 * z * dz + dz^2 + dc
                const dz_re_new = 2.0 * z0.re * dz.re - 2.0 * z0.im * dz.im + dz.re * dz.re - dz.im * dz.im + dc.re;
                const dz_im_new = 2.0 * z0.re * dz.im + 2.0 * z0.im * dz.re + 2.0 * dz.re * dz.im + dc.im;
                dz.re = dz_re_new;
                dz.im = dz_im_new;
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
    const xCenter = baseCoords.x * canvas.width;
    const yCenter = (1-baseCoords.y) * canvas.height;
    ctx.moveTo(xCenter - 5, yCenter + 5);
    ctx.lineTo(xCenter + 5, yCenter - 5);
    ctx.stroke();

    ctx.moveTo(xCenter - 5, yCenter - 5);
    ctx.lineTo(xCenter + 5, yCenter + 5);
    ctx.stroke();

}
import { antiAliasing, maxIters, viewBounds } from "./main.js";
import { getProgramInfo } from "./webgl.js";

const canvas = document.getElementById("glcanvas");

// Fragment shader program
function fsSource() {
    let src = `
    precision highp float;

    uniform float ONE;

    uniform vec2 uX0;
    uniform vec2 uY0;
    uniform vec2 uX1;
    uniform vec2 uY1;

    ${antiAliasing > 1 ? "uniform vec2 uPixWidth;\n" : ""}

    varying vec2 coords;

    // emulation based on https://github.com/gsson/wasm-talk/blob/master/mandelbrot-webgl/crate/src/mandelbrot64.frag

    vec2 quickTwoSum(float a, float b) {
        float sum = (a + b) * ONE;
        float err = b - (sum - a) * ONE;
        return vec2(sum, err);
    }

    vec2 twoSum(float a, float b) {
        float s = (a + b);
        float v = (s * ONE - a) * ONE;
        float err = (a - (s - v) * ONE) * ONE + (b - v);
        return vec2(s, err);
    }

    vec2 twoSub(float a, float b) {
        float s = (a - b);
        float v = (s * ONE - a) * ONE;
        float err = (a - (s - v) * ONE) * ONE - (b + v);
        return vec2(s, err);
    }

    vec2 split(float a) {
        const float SPLIT = 4097.0;
        float t = a * SPLIT;
        float a_hi = t * ONE - (t - a);
        float a_lo = a * ONE - a_hi;
        return vec2(a_hi, a_lo);
    }

    vec2 twoProd(float a, float b) {
        float prod = a * b;
        vec2 a_fp64 = split(a);
        vec2 b_fp64 = split(b);
        float err = (
            (a_fp64.x * b_fp64.x - prod) +
            a_fp64.x * b_fp64.y + a_fp64.y * b_fp64.x)
        + a_fp64.y * b_fp64.y;
        return vec2(prod, err);
    }

    vec2 mul_fp64(vec2 a, vec2 b) {
        vec2 prod = twoProd(a.x, b.x);
        // y component is for the error
        prod.y += a.x * b.y;
        prod = quickTwoSum(prod.x, prod.y);
        prod.y += a.y * b.x;
        prod = quickTwoSum(prod.x, prod.y);
        return prod;
    }

    vec2 add_fp64(vec2 a, vec2 b) {
        vec2 s, t;
        s = twoSum(a.x, b.x);
        t = twoSum(a.y, b.y);
        s.y += t.x;
        s = quickTwoSum(s.x, s.y);
        s.y += t.y;
        s = quickTwoSum(s.x, s.y);
        return s;
    }

    vec2 sub_fp64(vec2 a, vec2 b) {
        vec2 s, t;
        s = twoSub(a.x, b.x);
        t = twoSub(a.y, b.y);
        s.y += t.x;
        s = quickTwoSum(s.x, s.y);
        s.y += t.y;
        s = quickTwoSum(s.x, s.y);
        return s;
    }

    vec2 div_fp64(vec2 a, vec2 b) {
        float xn = 1.0 / b.x;
        vec2 yn = a * xn;
        float diff = (sub_fp64(a, mul_fp64(b, yn))).x;
        vec2 prod = twoProd(xn, diff);
        return add_fp64(yn, prod);
    }

    vec4 iterate(vec2 c_re, vec2 c_im) {
        vec2 z_re = c_re;
        vec2 z_im = c_im;

        for (int i = 0; i < ${maxIters}; i++) {
            vec2 z_re_squared = mul_fp64(z_re, z_re);
            vec2 z_im_squared = mul_fp64(z_im, z_im);
            if (z_re_squared.x + z_im_squared.x >= 4.0) {
                vec2 z = vec2(z_re.x, z_im.x);
                float t = float(i) + 1. - log(log(dot(z, z))) / log(2.);
                return vec4(
                    (-cos(0.02 * t) + 1.0) / 2.0, 
                    (-cos(0.03 * t) + 1.0) / 2.0, 
                    (-cos(0.05 * t) + 1.0) / 2.0, 
                    1.0
                );
            }

            vec2 z_re_temp = add_fp64(sub_fp64(z_re_squared, z_im_squared), c_re);

            z_im = add_fp64(mul_fp64(z_re * 2.0, z_im), c_im);
            z_re = z_re_temp;
        }
        return vec4(0.0, 0.0, 0.0, 1.0);
    }
    `;

    if (antiAliasing === 1) {
        src += `
        void main() {
            vec2 c_re = add_fp64(mul_fp64(vec2(coords.x, 0.0), sub_fp64(uX1, uX0)), uX0);
            vec2 c_im = add_fp64(mul_fp64(vec2(coords.y, 0.0), sub_fp64(uY1, uY0)), uY0);
            gl_FragColor = iterate(c_re, c_im);
        }
        `;
    }
    else {
        src += `
        void main() {
            vec2 cBase_re = sub_fp64(
                add_fp64(mul_fp64(vec2(coords.x, 0.0), sub_fp64(uX1, uX0)), uX0),
                mul_fp64(vec2(0.5, 0.0), uPixWidth)
            );
            vec2 cBase_im = sub_fp64(
                add_fp64(mul_fp64(vec2(coords.y, 0.0), sub_fp64(uY1, uY0)), uY0),
                mul_fp64(vec2(0.5, 0.0), uPixWidth)
            );
            for (int xi = 0; xi < ${antiAliasing}; xi++) {
                for (int yi = 0; yi < ${antiAliasing}; yi++) {
                    vec2 c_re = add_fp64(
                        cBase_re,
                        mul_fp64(
                            vec2(float(xi) + 0.5, 0.0),
                            div_fp64(uPixWidth, vec2(${antiAliasing}.0, 0.0))
                        )
                    );
                    vec2 c_im = add_fp64(
                        cBase_im,
                        mul_fp64(
                            vec2(float(yi) + 0.5, 0.0),
                            div_fp64(uPixWidth, vec2(${antiAliasing}.0, 0.0))
                        )
                    );
                    gl_FragColor = gl_FragColor + iterate(c_re, c_im) / (${antiAliasing}.0 * ${antiAliasing}.0);
                }
            }
        }
        `;
    }

    return src;
};

function split_float(x) {
    const y = new Float32Array(2);
    y[0] = x;
    y[1] = x - y[0];
    return y;
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
    gl.uniform2fv(uniformLocations.uX0, split_float(viewBounds.x0));
    gl.uniform2fv(uniformLocations.uY0, split_float(viewBounds.y0));
    gl.uniform2fv(uniformLocations.uX1, split_float(viewBounds.x1));
    gl.uniform2fv(uniformLocations.uY1, split_float(viewBounds.y1));

    gl.uniform1f(uniformLocations.ONE, 1.0);

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
    "uX0", "uY0", "uX1", "uY1",
    "ONE",
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

function drawScene(programInfo, bounds) {
    const { gl, program, uniformLocations } = programInfo;

    // Tell WebGL how to pull out the positions from the position
    // buffer into the vertexPosition attribute.
    setPositionAttribute(programInfo);

    // Tell WebGL to use our program when drawing
    gl.useProgram(program);

    // Set the shader uniforms
    gl.uniform1f(uniformLocations.uX0, bounds.x0);
    gl.uniform1f(uniformLocations.uY0, bounds.y0);
    gl.uniform1f(uniformLocations.uX1, bounds.x1);
    gl.uniform1f(uniformLocations.uY1, bounds.y1);

    const offset = 0;
    const vertexCount = 4;
    gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
}

// Tell WebGL how to pull out the positions from the position
// buffer into the vertexPosition attribute.
function setPositionAttribute(programInfo) {
    const { gl, buffers, attribLocations } = programInfo;
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
}

export { drawScene };

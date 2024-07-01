/**
 * Given the source code of a vertex and fragment shader, compiles them,
 * and returns the linked program.
 */
 function compileAndLinkGLSL(vs_source, fs_source) {
    let vs = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(vs, vs_source)
    gl.compileShader(vs)
    if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(vs))
        throw Error("Vertex shader compilation failed")
    }

    let fs = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(fs, fs_source)
    gl.compileShader(fs)
    if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(fs))
        throw Error("Fragment shader compilation failed")
    }

    let program = gl.createProgram()
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(program))
        throw Error("Linking failed")
    }
    
    return program
}


/**
 * A callback for requestAnimationFrame that sets time-varying uniforms
 * and has WebGL draw the geometry with the GLSL program.
 */
 function draw(milliseconds) {
    gl.clear(gl.COLOR_BUFFER_BUT)
    gl.useProgram(program)
    let secondsBindPoint = gl.getUniformLocation(program, 'seconds')
    gl.uniform1f(secondsBindPoint, milliseconds/1000)
    const connection = gl.POINTS
    const offset = 0                          // unused here, but required
    const count = 6+(0|milliseconds/100)%100  // number of vertices to draw
    let countBindPoint = gl.getUniformLocation(program, 'count')
    gl.uniform1i(countBindPoint, count)
    gl.drawArrays(connection, offset, count)
    window.animation = requestAnimationFrame(draw)
}

/**
 * Load the GLSL shaders and JSON geometry, set them up,
 * and then initialize the animation.
 */
async function setup(event) {
    window.gl = document.querySelector('canvas').getContext('webgl2')
    let vs = await fetch('webslexVS.glsl').then(res => res.text())
    let fs = await fetch('webslexFS.glsl').then(res => res.text())
    window.program = compileAndLinkGLSL(vs,fs)
    requestAnimationFrame(draw)
}

window.addEventListener('load',setup)

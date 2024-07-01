
/** @global The id of current animation provided by requestAnimationFrame */
var animationId;

/**
 * Given the source code of a vertex and fragment shader, compiles them,
 * and returns the linked program.
 * @param vs_source    Vertex shader source 
 * @param vs_source    Fragment shader source 
 */
 function compileAndLinkGLSL(vs_source, fs_source) {
    let program = gl.createProgram()
    let vs = gl.createShader(gl.VERTEX_SHADER)
    let fs = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(vs, vs_source) 
    gl.shaderSource(fs, fs_source)
    gl.compileShader(vs)
    gl.attachShader(program, vs) 
    gl.compileShader(fs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)

    if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(vs))
        throw Error("Vertex shader compilation failed")
    }

    if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(fs))
        throw Error("Fragment shader compilation failed")
    }

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(program))
        throw Error("Linking failed")
    }
    
    return program
}

/**
 * Sends per-vertex data to the GPU and connects it to a VS input
 * 
 * @param data    a 2D array of per-vertex data (e.g. [[x,y,z,w],[x,y,z,w],...])
 * @param program a compiled and linked GLSL program
 * @param vsIn    the name of the vertex shader's `in` attribute
 * @param mode    (optional) gl.STATIC_DRAW, gl.DYNAMIC_DRAW, etc
 * 
 * @returns the ID of the buffer in GPU memory; useful for changing data later
 */
function supplyDataBuffer(data, program, vsIn, mode) {
    if (mode === undefined) mode = gl.STATIC_DRAW
    
    let loc = gl.getAttribLocation(program, vsIn)
    let f32 = new Float32Array(data.flat())

    let buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, f32, mode)
    
    gl.vertexAttribPointer(loc, data[0].length, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(loc)
    
    return buf;
}

/**
 * Creates a Vertex Array Object and puts into it all of the data in the given
 * JSON structure, which should have the following form:
 * 
 * ````
 * 
 * {"triangles": a list of of indices of vertices
 * ,"attributes":
 *  {name_of_vs_input_1: a list of 2-, 3-, or 4-vectors, one per vertex
 *  ,name_of_vs_input_2: a list of 2-, 3-, or 4-vectors, one per vertex
 *  }
 * }
 * ````
 * 
 * @returns an object with four keys:
 *  - mode = the 1st argument for gl.drawElements
 *  - count = the 2nd argument for gl.drawElements
 *  - type = the 3rd argument for gl.drawElements
 *  - vao = the vertex array object for use with gl.bindVertexArray
 */
function setupGeomery(geom) {
    var triangleArray = gl.createVertexArray()
    gl.bindVertexArray(triangleArray)

    for(let name in geom.attributes) {
        let data = geom.attributes[name]
        supplyDataBuffer(data, program, name)
    }

    var indices = new Uint16Array(geom.triangles.flat())
    var indexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW)

    return {
        mode: gl.TRIANGLES,
        count: indices.length,
        type: gl.UNSIGNED_SHORT,
        vao: triangleArray
    }
}
/**
 * A callback for requestAnimationFrame that sets time-varying uniforms
 * and has WebGL draw the geometry with the GLSL program.
 * @param milliseconds keeps track of time since setup was called when first animation
 * frame was added.
 */
function draw1(milliseconds) {
    gl.useProgram(program)

    let secondsBindPoint = gl.getUniformLocation(program, 'seconds')
    gl.uniform1f(secondsBindPoint, milliseconds/1000)
    
    let seconds = milliseconds/1000;
    let c = Math.cos(seconds);
    let s = Math.sin(seconds);
    
    let rotBindPoint = gl.getUniformLocation(program, 'rotation')
    gl.uniformMatrix2fv(rotBindPoint, false, new Float32Array([c,s,-s,c]))

    gl.bindVertexArray(geom.vao)
    gl.drawElements(geom.mode, geom.count, geom.type, 0)

    animationId = requestAnimationFrame(draw1)
}

/**
 * A callback for requestAnimationFrame that sets time-varying uniforms
 * and has WebGL draw the geometry with the GLSL program.
 */
 function draw2(milliseconds) {
    gl.useProgram(program)
    let secondsBindPoint = gl.getUniformLocation(program, 'seconds')
    gl.uniform1f(secondsBindPoint, milliseconds/1000)
    const connection = gl.POINTS
    const offset = 0                          // unused here, but required
    const count = 6+(0|milliseconds/100)%100  // number of vertices to draw
    let countBindPoint = gl.getUniformLocation(program, 'count')
    gl.uniform1i(countBindPoint, count)
    gl.drawArrays(connection, offset, count)
    animationId = requestAnimationFrame(draw2)
}

/**
 * A callback for requestAnimationFrame that sets time-varying uniforms
 * and has WebGL draw the geometry with the GLSL program.
 */
 function draw3(milliseconds) {
    gl.clear(gl.COLOR_BUFFER_BIT) 

    gl.useProgram(program)

    let secondsBindPoint = gl.getUniformLocation(program, 'seconds')
    gl.uniform1f(secondsBindPoint, milliseconds/1000)
    
    let seconds = milliseconds/1000;

    gl.bindVertexArray(geom.vao)
    gl.drawElements(geom.mode, geom.count, geom.type, 0)

    animationId = requestAnimationFrame(draw3)
}

/**
 * A callback for requestAnimationFrame that sets time-varying uniforms
 * and has WebGL draw the geometry with the GLSL program.
 */
function draw4(milliseconds) {
    gl.useProgram(program)

    let secondsBindPoint = gl.getUniformLocation(program, 'seconds')
    gl.uniform1f(secondsBindPoint, milliseconds/1000)
    
    let seconds = milliseconds/1000;
    let c = Math.cos(seconds);
    let s = Math.sin(seconds);
    
    let rotBindPoint = gl.getUniformLocation(program, 'rotation')
    gl.uniformMatrix2fv(rotBindPoint, false, new Float32Array([c,s,-s,c]))

    gl.bindVertexArray(geom.vao)
    gl.drawElements(geom.mode, geom.count, geom.type, 0)

    animationId = requestAnimationFrame(draw1)
}

function draw5(milliseconds) {
    gl.useProgram(program)

    let secondsBindPoint = gl.getUniformLocation(program, 'seconds')
    gl.uniform1f(secondsBindPoint, milliseconds/1000)
    
    let seconds = milliseconds/1000;
    let c = Math.cos(seconds);
    let s = Math.sin(seconds);
    
    let rotBindPoint = gl.getUniformLocation(program, 'rotation')
    gl.uniformMatrix2fv(rotBindPoint, false, new Float32Array([c,s,-s,c]))

    gl.bindVertexArray(geom.vao)
    gl.drawElements(geom.mode, geom.count, geom.type, 0)

    animationId = requestAnimationFrame(draw5)
}
/**
 * Load the GLSL shaders and JSON geometry, set them up,
 * and then initialize the animation.
 * @param event event that when occurs, calls the setup
 */
async function setup(event) {
    window.gl = document.querySelector('canvas').getContext('webgl2')
    window.vs = await fetch('spinVS.glsl').then(res => res.text())
    window.fs = await fetch('spinFS.glsl').then(res => res.text())
    window.program = compileAndLinkGLSL(vs,fs)
    let data = await fetch('ex05-geometry.json').then(r=>r.json())
    window.geom = setupGeomery(data)
    currentFrame = requestAnimationFrame(draw1)
}

/**
 * Switch shaders and start new animation
 * @param chosen animation ID of current running animation, 
 */
async function switcher(chosen) {
        if (typeof animationId !== 'undefined'){
       
        cancelAnimationFrame(animationId)

        gl = document.querySelector('canvas').getContext('webgl2')

        if (chosen == 1) {
            let vs = await fetch('spinVS.glsl').then(res => res.text())
            let fs = await fetch('spinFS.glsl').then(res => res.text())
            program = compileAndLinkGLSL(vs,fs)
            let data = await fetch('ex05-geometry.json').then(r=>r.json())
            window.geom = setupGeomery(data)
        }

        else if (chosen == 2) {
            let vs = await fetch('webslexVS.glsl').then(res => res.text())
            let fs = await fetch('webslexFS.glsl').then(res => res.text())
            program = compileAndLinkGLSL(vs,fs)

        }
        else if (chosen == 3) {
            let vs = await fetch('psychVS.glsl').then(res => res.text())
            let fs = await fetch('psychFS.glsl').then(res => res.text())
            program = compileAndLinkGLSL(vs,fs)
            let data = await fetch('psych-geometry.json').then(r=>r.json())
            window.geom = setupGeomery(data)
        }
        else if (chosen == 4) {
            let vs = await fetch('spinvsVS.glsl').then(res => res.text())
            let fs = await fetch('spinFS.glsl').then(res => res.text())
            program = compileAndLinkGLSL(vs,fs)
            let data = await fetch('ex05-geometry.json').then(r=>r.json())
            window.geom = setupGeomery(data)
        }
        else if (chosen == 5) {
            let vs = await fetch('spinVS.glsl').then(res => res.text())
            let fs = await fetch('spinFS.glsl').then(res => res.text())
            program = compileAndLinkGLSL(vs,fs)
            let data = await fetch('ex05-geometry.json').then(r=>r.json())
            window.geom = setupGeomery(data)
        }
        window.pending = requestAnimationFrame(window['draw'+chosen])

    }

}

/** Callback for when the radio button selection changes */
function radioChanged() {
    let chosen = document.querySelector('input[name="example"]:checked').value
    cancelAnimationFrame(window.pending)
    switcher(chosen)
}

/**
 * Initializes WebGL and event handlers after page is fully loaded.
 * This example uses only `gl.clear` so it doesn't need any shaders, etc;
 * any real program would initialize models, shaders, and programs for each
 * display and store them for future use before calling `radioChanged` and
 * thus initializing the render.
 */
 window.addEventListener('load',(event)=>{
    window.gl = document.querySelector('canvas').getContext('webgl2')
    document.querySelectorAll('input[name="example"]').forEach(elem => {
        elem.addEventListener('change', radioChanged)
    })
    radioChanged()
})

/**
 * Initial load event listener to call setup function
 */
window.addEventListener('load',setup)




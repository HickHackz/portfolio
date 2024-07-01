/**
 * Animation callback for the first display. Should be invoked as 
 * `window.pending = requestAnimationFrame(draw1)`
 * and invokes that on itself as well; to stop it, call
 * `cancelAnimationFrame(window.pending)`
 *
 * Fills the screen with Illini Orange
 */
 function draw1(milliseconds) {
    gl.clearColor(1, 0.373, 0.02, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)
    window.pending = requestAnimationFrame(draw1)
    window.pending = requestAnimationFrame(draw)

}
/**
 * Animation callback for the second display. See {draw1} for more.
 *
 * Fills the screen with Illini Blue
 */
function draw2() {
    gl.clearColor(0.075, 0.86, 0.292, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)
    window.pending = requestAnimationFrame(draw2)
    window.pending = requestAnimationFrame(draw)

}

/** Callback for when the radio button selection changes */
function radioChanged() {
    let chosen = document.querySelector('input[name="example"]:checked').value
    cancelAnimationFrame(window.pending)
    window.pending = requestAnimationFrame(window['draw'+chosen])

}

/** Resizes the canvas to be a square that fits on the screen with at least 20% vertical padding */
function resizeCanvas() {
    let c = document.querySelector('canvas')
    c.width = c.parentElement.clientWidth
    c.height = document.documentElement.clientHeight * 0.8
    console.log(c.width, c.height)
    if (c.width > c.height) c.width = c.height
    else c.height = c.width
}

/**
 * Initializes WebGL and event handlers after page is fully loaded.
 * This example uses only `gl.clear` so it doesn't need any shaders, etc;
 * any real program would initialize models, shaders, and programs for each
 * display and store them for future use before calling `radioChanged` and
 * thus initializing the render.
 */
window.addEventListener('load',(event)=>{
    resizeCanvas()
    window.gl = document.querySelector('canvas').getContext('webgl2')
    document.querySelectorAll('input[name="example"]').forEach(elem => {
        elem.addEventListener('change', radioChanged)
    })
    radioChanged()
})
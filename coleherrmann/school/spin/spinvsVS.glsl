#version 300 es

in vec4 position;
in vec4 color;

uniform float seconds;
uniform mat2 rotation;

out vec4 vColor;

/**
 * Main vertex shader function takes the current position of a vertex,
 * multiplies it by cos of seconds passed times a golden sequence number,
 * then by a rotation factor calculated in the draw function.
 * 
 * @param None
 */
void main() {
    vColor = color;
    float ang = 0.6180339887498949 * float(gl_VertexID) * seconds;
    gl_Position =vec4(
        position.xy*cos(seconds*0.6180339887498949)*rotation*sin(ang),
            position.zw);
}
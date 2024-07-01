#version 300 es
precision highp float;

in vec4 vColor;

uniform float seconds;

out vec4 fragColor;
/**
 * Main fragment shader, only ports input to output without changing it.
 * @param None
 */
void main() {
    fragColor = vColor;
}
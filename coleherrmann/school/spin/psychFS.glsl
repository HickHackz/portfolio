#version 300 es
precision highp float;

uniform float seconds;
in vec4 vColor;


out vec4 fragColor;


/**
 * Main fragment shader, only ports input to output without changing it.
 * @param None
 */
void main() {
  
float doublesec = seconds + 10000.0;

float triplesec = mod((doublesec), gl_FragCoord.y + gl_FragCoord.x);
float y_alt = sin(gl_FragCoord.y + gl_FragCoord.x);
float c = cos(triplesec + gl_FragCoord.x)*0.5+0.5, s = sin(triplesec + gl_FragCoord.y)*0.5+0.5;
    fragColor = vec4(
        vColor.r*c + vColor.g*s,
        vColor.g*c - vColor.r*s,
        cos(vColor.b*20.-vColor.a*10.)*0.5+0.5,
        vColor.a);
}

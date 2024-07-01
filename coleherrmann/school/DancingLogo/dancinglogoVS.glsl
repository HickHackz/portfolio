#version 300 es

in vec4 position;
in vec4 color;

uniform float seconds;
uniform mat2 rotation;

uniform int count;
void main() {
    vColor = color;
    float c = cos(seconds);
    float s = sin(seconds);
    float x = c*position.x + s*position.y;
    float y = -s*position.x + c*position.y;
    gl_Position = vec4(x, y, position.zw);
    
    gl_Position = vec4( rotation * position.xy, position.zw);
    gl_Position = vec4(rad*cos(ang), rad*sin(ang), 0, 1);
     // gl_Position = vec4(float(position.x*s + dx), float(position.y*s + dy), 0, 1);
    vColor = color; 


    
}
#version 300 es
precision highp float;
out vec4 fragColor;
in vec3 outnormal;
in vec4 outposition;
in float resolution;
uniform vec3 eyedir;
const vec3 lightdir = vec3(0.8, -0.6, 0);
const vec3 snow = vec3(.5, 0, .5);
const vec3 dirt = vec3(.4, .3, .1);


void main() {
    vec3 normal = normalize(outnormal);
    vec3 x = normal * dot(normal, lightdir);
    vec3 r = 2.0*x - lightdir;
    float phongbit = max(0.0,dot(r,eyedir));
    float phong = pow(phongbit, 20.0);
    float lambert = max(0.0, dot(lightdir, normal));

    vec3 color =  outposition.z > 1.0 ? snow : dirt;

    fragColor = vec4((color * lambert) + vec3(phong, phong, phong)/3.0 + vec3(0.2, 0.0, .2), 1);
}


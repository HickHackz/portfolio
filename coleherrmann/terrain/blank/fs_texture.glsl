#version 300 es
precision highp float; // a precision statmeent is required for fragment shaders
in vec2 vTexCoord;
out vec4 fragColor;
in vec3 outnormal;
in float z;
in float resolution;
uniform vec3 eyedir;
uniform sampler2D image;
vec3 lightdir = vec3(0.8, -0.6, 0);

void main() {
    vec3 normal = normalize(outnormal);
    vec3 x = normal * (dot(normal, lightdir));
    vec3 r = 2.0*x - lightdir;
    float phongbit = max(0.0,dot(r,eyedir));
    float phong = pow(phongbit, 20.0);
    float lambert = max(0.0, abs(dot(lightdir, normal)));
 
    //fragColor = vec4(vec3(texture(image, vTexCoord)* lambert) + vec3(phong, phong, phong)/3.0, 1);
    fragColor = texture(image, vTexCoord);
}


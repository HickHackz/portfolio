 #version 300 es
    in vec4 position;
    out vec4 outposition;
    in vec3 normal;
    out vec3 outnormal;
    uniform mat4 p;
    uniform mat4 mv;
    out float resolution;
    uniform float glresolution;


    void main() {
      gl_Position = p * mv * vec4(float(position.x*2.0/glresolution-1.0), float(position.y*2.0/glresolution-1.0), position.z, 1);
      outposition = position;
      outnormal = normal;
      resolution = glresolution;
    }

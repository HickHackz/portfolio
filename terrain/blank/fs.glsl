#version 300 es
precision mediump float;
out vec4 fragColor;
in vec3 outnormal;
in float z;
in float resolution;
uniform vec3 eyedir;
vec3 lightdir = vec3(0.8, -0.6, 0);

//Yes I should probably make these uniform but I'm severly out of time for this MP and I didn't notice any performance constraints
vec3 background = vec3(0,0,0);
vec3 foreground = vec3(1,1,1);
vec3 red = vec3(.98,.235,.235);
 vec3 dark_blue = vec3(.118,.235,1);
 vec3 light_blue = vec3(0,.784,.784);  
 vec3 magenta = vec3(.941,0,.560);  
 vec3 yellow = vec3(.902,.863,.196);  
 vec3 orange = vec3(.941,.560,.157);
 vec3 purple = vec3(.627,0,.784);
 vec3 yellow_green = vec3(.627,.902,.196);  
 vec3 medium_blue = vec3(0,.627,1);  
 vec3 dark_yellow = vec3(.902,.686,.176);  
 vec3 aqua = vec3(0,.823,.549);  
 vec3 dark_purple = vec3(.560,0,.863);  
 vec3 gray = vec3(.666,.666,.666);
 vec3 green = vec3(0,.862,0);  


vec3 getColor() {
    if (z <= .1) {

        float toggle = 10.0 * z;
        //interpolate between purple and dark_purple
         //return (.1-z)*purple+(z)*dark_purple; //10
        return mix(purple, dark_purple, toggle);
    }
    else if (z <= .2) {
        float toggle = 5.0 * z;
        //interpolate between purple and dark_purple
        //return (.2-z)*dark_blue+(z)*medium_blue; //5
        return mix(dark_blue, medium_blue, toggle);

    }
    else if (z <= .3) {
        float toggle = 10.0/3.0 * z;

        //interpolate between purple and dark_purple
        //return (.3-z)*light_blue+(z)*aqua; //10/3
        return mix(light_blue, aqua, toggle);

    }
    else if (z <= .4) {
        //interpolate between purple and dark_purple
        //return ((.4-z)*green+(z)*yellow_green); //5/2
        return mix(green, yellow_green, z);

    }
    else if (z <= .5) {
        //interpolate between purple and dark_purple
        //return (.5-z)*yellow+(z)*dark_yellow; //2
        return mix(yellow, dark_yellow, z);

    }
    else if (z <= .6) {
        //interpolate between purple and dark_purple
        //return (.6-z)*orange+(z)*red; //5/3
        return mix(red,orange, z);
    }
    else
        return magenta;
}

void main() {
    vec3 normal = normalize(outnormal);
    vec3 x = normal * (dot(normal, lightdir));
    vec3 r = 2.0*x - lightdir;
    float phongbit = max(0.0,dot(r,eyedir));
    float phong = pow(phongbit, 20.0);
    float lambert = max(0.0, abs(dot(lightdir, normal)));
    vec3 color;
    color = getColor();
    vec3 newcolor = mix(color, foreground, r);
    fragColor = vec4((newcolor * lambert) + vec3(phong, phong, phong)/3.0 + vec3(0.2, 0, 0.2), 1);
}


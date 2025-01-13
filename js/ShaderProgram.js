import defaultValue from "./defaultValue.js";

function ShaderProgram(option) {
    option = defaultValue(option, {});
    this.context = option.context;
    this.gl = this.context.gl;

    this.program = this.gl.createProgram();
    this.vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
    this.fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
    this.vertexShaderSource = option.vertexShaderSource;
    this.fragmentShaderSource = option.fragmentShaderSource;

    this.gl.shaderSource(this.vertexShader, this.vertexShaderSource);
    this.gl.compileShader(this.vertexShader);
    if (!this.gl.getShaderParameter(this.vertexShader, this.gl.COMPILE_STATUS)) {
        throw new Error(this.gl.getShaderInfoLog(this.vertexShader));
    }
    this.gl.attachShader(this.program, this.vertexShader);
    this.gl.shaderSource(this.fragmentShader, this.fragmentShaderSource);
    this.gl.compileShader(this.fragmentShader);
    if (!this.gl.getShaderParameter(this.fragmentShader, this.gl.COMPILE_STATUS)) {
        throw new Error(this.gl.getShaderInfoLog(this.fragmentShader));
    }
    this.gl.attachShader(this.program, this.fragmentShader);
    this.gl.linkProgram(this.program);
    if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
        throw new Error(this.gl.getProgramInfoLog(this.program));
    }

    this.getLocations();
}

ShaderProgram.prototype.getLocations = function () {
    this.attributeLocations = {};
    for (let i = 0; i < this.gl.getProgramParameter(this.program, this.gl.ACTIVE_ATTRIBUTES); i++) {
        let attribute = this.gl.getActiveAttrib(this.program, i);
        this.attributeLocations[attribute.name] = this.gl.getAttribLocation(this.program, attribute.name);
    }
    this.uniformLocations = {};
    for (let i = 0; i < this.gl.getProgramParameter(this.program, this.gl.ACTIVE_UNIFORMS); i++) {
        let uniform = this.gl.getActiveUniform(this.program, i);
        this.uniformLocations[uniform.name] = this.gl.getUniformLocation(this.program, uniform.name);
    }
}

export default ShaderProgram;
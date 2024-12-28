import defaultValue from "./defaultValue.js";
import WebGLConstants from "./WebGLConstants.js";

function Texture(option){
    option = defaultValue(option, {});
    this.context = option.context;
    /**
     * @type {WebGLRenderingContext}
     */
    this.gl = this.context.gl;

    this.width = option.width;
    this.height = option.height;

    this.internalformat = defaultValue(option.internalformat, WebGLConstants.RGBA);
    this.format = defaultValue(option.format, WebGLConstants.RGBA);
    this.type = defaultValue(option.type, WebGLConstants.UNSIGNED_BYTE);
    this.textureMinFilter = defaultValue(option.textureMinFilter, WebGLConstants.LINEAR);
    this.textureMagFilter = defaultValue(option.textureMagFilter, WebGLConstants.LINEAR);
    this.textureWrapS = defaultValue(option.textureWrapS, WebGLConstants.CLAMP_TO_EDGE);
    this.textureWrapT = defaultValue(option.textureWrapT, WebGLConstants.CLAMP_TO_EDGE);

    this.texture = this.gl.createTexture();
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.internalformat, this.width, this.height, 0, this.format, this.type, null);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.textureMinFilter);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.textureMagFilter);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.textureWrapS);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.textureWrapT);
    this.gl.bindTexture(this.gl.TEXTURE_2D, null);
}

Texture.prototype.destroy = function(){
    this.gl.deleteTexture(this.texture);
    this.texture = null;
}

export default Texture;
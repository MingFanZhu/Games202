import Texture from "./Texture.js";
import defaultValue from "./defaultValue.js";
import WebGLConstants from "./WebGLConstants.js";
function FramneBufferObject(option) {
    option = defaultValue(option, {});
    this.context = option.context;
    this.gl = this.context.gl;
    this.width = option.width;
    this.height = option.height;
    if (option.colorAttachments) {
        this.colorAttachments = option.colorAttachments;
        this.colorAttachmentsNum = option.colorAttachments.length;
    } else {
        this.colorAttachmentsNum = defaultValue(option.colorAttachmentsNum, 1);
        for (let i = 0; i < this.colorAttachmentsNum; i++) {
            this.colorAttachments.push(new Texture({
                context: this.context,
                width: option.width,
                height: option.height
            }));
        }
    }
    if (option.depthAttachment) {
        this.depthAttachment = option.depthAttachment;
    } else {
        this.depthAttachment = new Texture({
            context: this.context,
            width: option.width,
            height: option.height,
            internalformat: WebGLConstants.DEPTH24_STENCIL8,
            format: WebGLConstants.DEPTH_STENCIL,
            type: WebGLConstants.UNSIGNED_INT_24_8
        });
    }

    this.frameBuffer = this.gl.createFramebuffer();
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.frameBuffer);
    for (let i = 0; i < this.colorAttachmentsNum; i++) {
        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0 + i, this.gl.TEXTURE_2D, this.colorAttachments[i].texture, 0);
    }
    this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.DEPTH_STENCIL_ATTACHMENT, this.gl.TEXTURE_2D, this.depthAttachment.texture, 0);
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
}

FramneBufferObject.prototype.bind = function () {
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.frameBuffer);
}

FramneBufferObject.prototype.unbind = function () {
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
}

FramneBufferObject.prototype.resize = function (width, height) {
    if (width !== this.width || height !== this.height) {
        this.width = width;
        this.height = height;
        this.destroy();

        for (let i = 0; i < this.colorAttachmentsNum; i++) {
            this.colorAttachments[i] = new Texture({
                context: this.context,
                width: width,
                height: height
            });
        }
        this.depthAttachment = new Texture({
            context: this.context,
            width: width,
            height: height,
            internalformat: WebGLConstants.DEPTH24_STENCIL8,
            format: WebGLConstants.DEPTH_STENCIL,
            type: WebGLConstants.UNSIGNED_INT_24_8
        });
        this.frameBuffer = this.gl.createFramebuffer();
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.frameBuffer);
        for (let i = 0; i < this.colorAttachmentsNum; i++) {
            this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0 + i, this.gl.TEXTURE_2D, this.colorAttachments[i].texture, 0);
        }
        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.DEPTH_STENCIL_ATTACHMENT, this.gl.TEXTURE_2D, this.depthAttachment.texture, 0);
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
    }
}

FramneBufferObject.prototype.destroy = function () {
    for (let i = 0; i < this.colorAttachmentsNum; i++) {
        this.colorAttachments[i].destroy();
    }
    this.depthAttachment.destroy();
    this.gl.deleteFramebuffer(this.frameBuffer);
    this.frameBuffer = null;
}

export default FramneBufferObject;
import UniformType from "./UniformType.js";
import clearCommand from "./ClearCommand.js";
import defaultValue from "./defaultValue.js";
import RenderState from "./RenderState.js";

/**
 * 
 * @param {Object} option
 * @param {String|HTMLDivElement} option.container
 */
function Context(option) {
    if (typeof option.container === 'string') {
        this.container = document.querySelector(`#${option.container}`);
    } else {
        this.container = option.container;
    }
    /** @type {HTMLCanvasElement}*/
    this.canvas = document.createElement('canvas');
    this.canvas.style.width = "100%";
    this.canvas.style.height = "100%";
    this.canvas.style.display = "block";
    this.canvas.width = this.container.clientWidth;
    this.canvas.height = this.container.clientHeight;
    this.container.appendChild(this.canvas);

    /** @type {WebGL2RenderingContext} */
    this.gl = this.canvas.getContext('webgl2');
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.depthFunc(this.gl.LESS);
    this.gl.depthMask(true);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.cullFace(this.gl.BACK);
    this.renderState = new RenderState();

    this.clearCommand = new clearCommand();
    this.globalUniform = undefined;
    this.globalUniformValues = undefined;
    init(this);
}

function init(context) {
    context.globalUniformValues = {
        camera: undefined,
    }
    let globalUniformValues = context.globalUniformValues;
    context.globalUniform = {
        u_matrix:{
            type: UniformType.MAT4,
            value: function () {
                return globalUniformValues.matrix.packArray();
            }
        },
        u_view: {
            type: UniformType.MAT4,
            value: function () {
                return globalUniformValues.camera.view.packArray();
            }
        },
        u_project:{
            type:UniformType.MAT4,
            value:function(){
                return globalUniformValues.camera.project.packArray();
            }
        }
    }
}

Context.prototype.resize = function () {
    if (this.canvas.width !== this.container.clientWidth || this.canvas.height !== this.container.clientHeight) {
        this.canvas.width = this.container.clientWidth;
        this.canvas.height = this.container.clientHeight;
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    }
}

Context.prototype.clear = function(clearCommand, fbo){
    clearCommand = defaultValue(clearCommand, this.clearCommand);
    if(fbo){
        fbo.bind();
    }

    this.gl.clearColor(clearCommand.color.r,clearCommand.color.g, clearCommand.color.b, clearCommand.color.a);
    this.gl.clearDepth(clearCommand.depth);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    if(fbo){
        fbo.unbind();
    }
}

Context.prototype.draw = function(drawCommand, camera, fbo){
    this.globalUniformValues.camera = camera;
    this.globalUniformValues.matrix = drawCommand.matrix;
    this.checkRenderState(drawCommand.renderState);

    if(fbo){
        fbo.bind();
    }

    let shaderProgram = drawCommand.shaderProgram;
    this.gl.useProgram(shaderProgram.program);
    this.gl.bindVertexArray(drawCommand.vertexArrayObject);

    for(let uniformName in shaderProgram.uniformLocations){
        let uniformLocation = shaderProgram.uniformLocations[uniformName];
        if(drawCommand.uniformMap.hasOwnProperty(uniformName)){
            this.bindUnifrom(uniformLocation, drawCommand.uniformMap[uniformName]);
        }else if (this.globalUniform.hasOwnProperty(uniformName)){
            this.bindUnifrom(uniformLocation, this.globalUniform[uniformName]);
        }else{
            throw new Error(`未定义的uniform:${uniformName}`);
        }
    }
    this.gl.drawElements(drawCommand.primitiveType, drawCommand.count, drawCommand.vertexsAndIndex.indices.type, drawCommand.vertexsAndIndex.indices.offset);
    this.gl.bindVertexArray(null);
    this.gl.useProgram(null);
    if(fbo){
        fbo.unbind();
    }
}

Context.prototype.checkRenderState = function(renderState){
    if(this.renderState.cull.enable !== renderState.cull.enable){
        this.renderState.cull.enable = renderState.cull.enable;
        if(this.renderState.cull.enable){
            this.gl.enable(this.gl.CULL_FACE);
            if(this.renderState.cull.face !== renderState.cull.face){
                this.renderState.cull.face = renderState.cull.face;
                this.gl.cullFace(this.renderState.cull.face);
            }
        }else{
            this.gl.disable(this.gl.CULL_FACE);
        }
    }else{
        if(this.renderState.cull.enable){
            if(this.renderState.cull.face !== renderState.cull.face){
                this.renderState.cull.face = renderState.cull.face;
                this.gl.cullFace(this.renderState.cull.face);
            }
        }
    }

    if(this.renderState.depthTest.enable !== renderState.depthTest.enable){
        this.renderState.depthTest.enable = renderState.depthTest.enable;
        if(this.renderState.depthTest.enable){
            this.gl.enable(this.gl.DEPTH_TEST);
            if(this.renderState.depthTest.func !== renderState.depthTest.func){
                this.renderState.depthTest.func = renderState.depthTest.func;
                this.gl.depthFunc(this.renderState.depthTest.func);
            }
        }else{
            this.gl.disable(this.gl.DEPTH_TEST);
        }
    }else{
        if(this.renderState.depthTest.enable){
            if(this.renderState.depthTest.func !== renderState.depthTest.func){
                this.renderState.depthTest.func = renderState.depthTest.func;
                this.gl.depthFunc(this.renderState.depthTest.func);
            }
        }
    }

    if(this.renderState.depthMask !== renderState.depthMask){
        this.renderState.depthMask = renderState.depthMask;
        this.gl.depthMask(this.renderState.depthMask);
    }
}

Context.prototype.bindUnifrom = function(uniformLocation, uniformMapObj){
    switch(uniformMapObj.type){
        case UniformType.INT:
            this.gl.uniform1i(uniformLocation, uniformMapObj.value());
            break;
        case UniformType.FLOAT:
            this.gl.uniform1f(uniformLocation, uniformMapObj.value());
            break;
        case UniformType.MAT3:
            this.gl.uniformMatrix3fv(uniformLocation, false, uniformMapObj.value());
            break;
        case UniformType.MAT4:
            this.gl.uniformMatrix4fv(uniformLocation, false, uniformMapObj.value());
            break;
        default:
            throw new Error("未定义的uniformType");
    }
}

export default Context;
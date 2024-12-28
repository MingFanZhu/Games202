import WebGLConstants from "./WebGLConstants.js";

function DrawCommand(option) {
    option = defaultValue(option, {});
    this.context = option.context;
    /** @type {WebGL2RenderingContext} */
    this.gl = this.context.gl;
    this.primitiveType = defaultValue(option.primitiveType, WebGLConstants.TRIANGLES)
    this.uniformMap = option.uniformMap;
    this.vertexsAndIndex = option.vertexsAndIndex;
    this.vertexArrayObject = undefined;
    this.count = undefined;
    this.shaderProgram = option.shaderProgram;
    this.init();
}

DrawCommand.prototype.init = function(){
    this.vertexArrayObject = this.gl.createVertexArray();
    this.gl.bindVertexArray(this.vertexArrayObject);
    for(let attributeName in this.shaderProgram.attributeLocations){
        if(!this.vertexsAndIndex.vertexs.hasOwnProperty(attributeName)){
            throw new Error(`未定义的顶点${attributeName}`);
        }
        let vertex = this.vertexsAndIndex.vertexs[attributeName];
        let vertexLocation = this.shaderProgram.attributeLocations[attributeName];
        this.gl.enableVertexAttribArray(vertexLocation);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertex.vao);
        this.gl.vertexAttribPointer(vertexLocation, vertex.size, vertex.type, false, vertex.stride, vertex.offset);
    }
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.vertexsAndIndex.indices.ebo);
    this.gl.bindVertexArray(null);
    if(this.primitiveType === WebGLConstants.TRIANGLES){
        this.count = this.vertexsAndIndex.indices.value / 3;
    }
}

export default DrawCommand;
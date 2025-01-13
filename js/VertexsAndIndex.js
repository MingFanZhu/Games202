import defaultValue from "./defaultValue.js";

function VertexsAndIndex(context) {
    /** @type {WebGL2RenderingContext} */
    this.gl = context.gl;
    this.vertexs = {};
    this.indices = undefined;
}

VertexsAndIndex.prototype.addVertex = function (name, array, size, offset, stride) {
    offset = defaultValue(offset, 0);
    stride = defaultValue(stride, 0);

    if(this.vertexs.hasOwnProperty(name)){
        throw new Error("重复的顶点名");
    }
    let vertexArrayBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexArrayBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, array, this.gl.STATIC_DRAW);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);


    let type = undefined;
    if(array instanceof Float32Array){
        type = this.gl.FLOAT;
    }
    else if(array instanceof Uint16Array){
        type = this.gl.UNSIGNED_SHORT;
    }

    this.vertexs[name] = {
        vao:vertexArrayBuffer,
        value:array,
        size,
        type,
        offset,
        stride
    };
}

/**
 * 
 * @param {Uint16Array | Uint32Array} array 
 */
VertexsAndIndex.prototype.bindIndices = function(array, offset){
    offset = defaultValue(offset, 0);

    let indicesBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, array, this.gl.STATIC_DRAW);
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);

    let type = undefined;
    if(array instanceof Uint16Array){
        type = this.gl.UNSIGNED_SHORT;
    }else if (array instanceof Uint32Array){
        type = this.gl.UNSIGNED_INT;
    }

    this.indices = {
        ebo:indicesBuffer,
        value:array,
        type,
        offset
    };
}

export default VertexsAndIndex;
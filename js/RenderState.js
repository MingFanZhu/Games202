import WebGLConstants from "./WebGLConstants.js";

const defaultRenderState = {
    cull: {
        enabled: true,
        face: WebGLConstants.BACK
    },
    depthTest: {
        enabled: true,
        func: WebGLConstants.LESS
    },
    depthMask: true
}
function RenderState(option) {
    return Object.assign(defaultRenderState, option);
}

export default RenderState;
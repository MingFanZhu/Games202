import defaultValue from "./defaultValue.js";
import Color from "./Color.js";

/**
 * 
 * @param {Object} option
 * @param {Color} option.color
 * @param {Number} option.depth
 * @param {Number} option.stencil
 */
function ClearCommand(option) {
    option = defaultValue(option, {});
    this.color = defaultValue(option.color, new Color(0, 0, 0, 1));
    this.depth = defaultValue(option.depth, 1);
    this.stencil = defaultValue(option.stencil, 0);
}

export default ClearCommand;
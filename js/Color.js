function Color(r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
}

Color.fromByte = function (r, g, b, a) {
    return new Color(r / 255, g / 255, b / 255, a / 255);
}

Color.fromCssString = function (cssString) {
    let color = new Color(0, 0, 0, 1);
    if (cssString.indexOf("rgb") > -1) {
        let rgb = cssString.substring(cssString.indexOf("(") + 1, cssString.indexOf(")")).split(",");
        color.r = parseInt(rgb[0]) / 255;
        color.g = parseInt(rgb[1]) / 255;
        color.b = parseInt(rgb[2]) / 255;
    }
    else if (cssString.indexOf("rgba") > -1) {
        let rgb = cssString.substring(cssString.indexOf("(") + 1, cssString.indexOf(")")).split(",");
        color.r = parseInt(rgb[0]) / 255;
        color.g = parseInt(rgb[1]) / 255;
        color.b = parseInt(rgb[2]) / 255;
        color.a = parseInt(rgb[3]);
    }
    else if (cssString.indexOf("#") > -1) {
        let hex = cssString.substring(1);
        if (hex.length == 3) {
            color.r = parseInt(hex[0] + hex[0], 16) / 255;
            color.g = parseInt(hex[1] + hex[1], 16) / 255;
            color.b = parseInt(hex[2] + hex[2], 16) / 255;
        }
    }
    else if (cssString.indexOf("hsl") > -1) {
        let hsl = cssString.substring(cssString.indexOf("(") + 1, cssString.indexOf(")")).split(",");
        color.r = parseInt(hsl[0]) / 255;
        color.g = parseInt(hsl[1]) / 255;
        color.b = parseInt(hsl[2]) / 255;
    }
    return color;
}

export default Color;
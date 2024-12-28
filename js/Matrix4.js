import Vector3 from "./Vector3.js";

function Matrix4(array) {
    if (array) {
        this.elements = array;
    } else {
        this.elements = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
    }
}

Matrix4.prototype.multiply = function (matrix) {
    const left = this.elements;
    const left0 = left[0];
    const left1 = left[1];
    const left2 = left[2];
    const left3 = left[3];
    const left4 = left[4];
    const left5 = left[5];
    const left6 = left[6];
    const left7 = left[7];
    const left8 = left[8];
    const left9 = left[9];
    const left10 = left[10];
    const left11 = left[11];
    const left12 = left[12];
    const left13 = left[13];
    const left14 = left[14];
    const left15 = left[15];

    const right = matrix.elements;
    const right0 = right[0];
    const right1 = right[1];
    const right2 = right[2];
    const right3 = right[3];
    const right4 = right[4];
    const right5 = right[5];
    const right6 = right[6];
    const right7 = right[7];
    const right8 = right[8];
    const right9 = right[9];
    const right10 = right[10];
    const right11 = right[11];
    const right12 = right[12];
    const right13 = right[13];
    const right14 = right[14];
    const right15 = right[15];

    const column0Row0 =
        left0 * right0 + left4 * right1 + left8 * right2 + left12 * right3;
    const column0Row1 =
        left1 * right0 + left5 * right1 + left9 * right2 + left13 * right3;
    const column0Row2 =
        left2 * right0 + left6 * right1 + left10 * right2 + left14 * right3;
    const column0Row3 =
        left3 * right0 + left7 * right1 + left11 * right2 + left15 * right3;

    const column1Row0 =
        left0 * right4 + left4 * right5 + left8 * right6 + left12 * right7;
    const column1Row1 =
        left1 * right4 + left5 * right5 + left9 * right6 + left13 * right7;
    const column1Row2 =
        left2 * right4 + left6 * right5 + left10 * right6 + left14 * right7;
    const column1Row3 =
        left3 * right4 + left7 * right5 + left11 * right6 + left15 * right7;

    const column2Row0 =
        left0 * right8 + left4 * right9 + left8 * right10 + left12 * right11;
    const column2Row1 =
        left1 * right8 + left5 * right9 + left9 * right10 + left13 * right11;
    const column2Row2 =
        left2 * right8 + left6 * right9 + left10 * right10 + left14 * right11;
    const column2Row3 =
        left3 * right8 + left7 * right9 + left11 * right10 + left15 * right11;

    const column3Row0 =
        left0 * right12 + left4 * right13 + left8 * right14 + left12 * right15;
    const column3Row1 =
        left1 * right12 + left5 * right13 + left9 * right14 + left13 * right15;
    const column3Row2 =
        left2 * right12 + left6 * right13 + left10 * right14 + left14 * right15;
    const column3Row3 =
        left3 * right12 + left7 * right13 + left11 * right14 + left15 * right15;

    let res = new Matrix4();
    let result = res.elements;
    result[0] = column0Row0;
    result[1] = column0Row1;
    result[2] = column0Row2;
    result[3] = column0Row3;
    result[4] = column1Row0;
    result[5] = column1Row1;
    result[6] = column1Row2;
    result[7] = column1Row3;
    result[8] = column2Row0;
    result[9] = column2Row1;
    result[10] = column2Row2;
    result[11] = column2Row3;
    result[12] = column3Row0;
    result[13] = column3Row1;
    result[14] = column3Row2;
    result[15] = column3Row3;
    return res;
}

Matrix4.prototype.multiplyByPoint = function (point) {
    return new Vector3(
        this.elements[0] * point.x + this.elements[4] * point.y + this.elements[8] * point.z + this.elements[12],
        this.elements[1] * point.x + this.elements[5] * point.y + this.elements[9] * point.z + this.elements[13],
        this.elements[2] * point.x + this.elements[6] * point.y + this.elements[10] * point.z + this.elements[14]
    )
}

Matrix4.prototype.packArray = function () {
    return new Float32Array(this.elements);
}

Matrix4.computeView = function (position, direction, up, right, res) {
    if (!res) {
        res = new Matrix4();
    }
    let result = res.elements;
    result[0] = right.x;
    result[1] = up.x;
    result[2] = -direction.x;
    result[3] = 0.0;
    result[4] = right.y;
    result[5] = up.y;
    result[6] = -direction.y;
    result[7] = 0.0;
    result[8] = right.z;
    result[9] = up.z;
    result[10] = -direction.z;
    result[11] = 0.0;
    result[12] = -right.dot(position);
    result[13] = -up.dot(position);
    result[14] = direction.dot(position);
    result[15] = 1.0;
    return res;
};

Matrix4.computePerspectiveFieldOfView = function (
    fovY,
    aspectRatio,
    near,
    far,
    res
) {
    const bottom = Math.tan(fovY * 0.5);

    const column1Row1 = 1.0 / bottom;
    const column0Row0 = column1Row1 / aspectRatio;
    const column2Row2 = (far + near) / (near - far);
    const column3Row2 = (2.0 * far * near) / (near - far);

    if (!res) {
        res = new Matrix4();
    }
    let result = res.elements;
    result[0] = column0Row0;
    result[1] = 0.0;
    result[2] = 0.0;
    result[3] = 0.0;
    result[4] = 0.0;
    result[5] = column1Row1;
    result[6] = 0.0;
    result[7] = 0.0;
    result[8] = 0.0;
    result[9] = 0.0;
    result[10] = column2Row2;
    result[11] = -1.0;
    result[12] = 0.0;
    result[13] = 0.0;
    result[14] = column3Row2;
    result[15] = 0.0;
    return res;
};

export default Matrix4;
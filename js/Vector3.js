function Vector3(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
}

Vector3.prototype.add = function (vector) {
    let res = new Vector3(
        this.x + vector.x,
        this.y + vector.y,
        this.z + vector.z
    );
    return res;
}

Vector3.prototype.subtract = function (vector) {
    let res = new Vector3(
        this.x - vector.x,
        this.y - vector.y,
        this.z - vector.z
    );
    return res;
}

Vector3.prototype.multiply = function (vector) {
    let res = new Vector3(
        this.x * vector.x,
        this.y * vector.y,
        this.z * vector.z
    );
    return res;
}

Vector3.prototype.scale = function (scalar) {
    let res = new Vector3(
        this.x * scalar,
        this.y * scalar,
        this.z * scalar
    );
    return res;
}

Vector3.prototype.divide = function (vector) {
    let res = new Vector3(
        this.x / vector.x,
        this.y / vector.y,
        this.z / vector.z
    );
    return res;
}

Vector3.prototype.dot = function (vector) {
    return this.x * vector.x + this.y * vector.y + this.z * vector.z;
}

Vector3.prototype.cross = function (vector) {
    let res = new Vector3(
        this.y * vector.z - this.z * vector.y,
        this.z * vector.x - this.x * vector.z,
        this.x * vector.y - this.y * vector.x
    );
    return res;
}

Vector3.prototype.length = function () {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
}

Vector3.prototype.normalize = function () {
    let len = this.length();
    let res = new Vector3(
        this.x / len,
        this.y / len,
        this.z / len
    );
    return res;
}

Vector3.prototype.clone = function () {
    return new Vector3(this.x, this.y, this.z);
}

Vector3.prototype.toString = function () {
    return "(" + this.x + ", " + this.y + ", " + this.z + ")";
}

Vector3.prototype.toArray = function () {
    return [this.x, this.y, this.z];
}

Vector3.prototype.fromArray = function (array) {
    this.x = array[0];
    this.y = array[1];
    this.z = array[2];
}

export default Vector3;
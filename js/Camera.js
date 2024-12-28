import defaultValue from "./defaultValue.js";
import Vector3 from "./Vector3.js";
import Matrix4 from "./Matrix4.js";

function Camera(option, canvas) {
    option = defaultValue(option, {});
    this.position = defaultValue(option.position, new Vector3(0, 0, 0));
    this.up = defaultValue(option.up, new Vector3(0, 1, 0));
    this.direction = defaultValue(option.direction, new Vector3(0, 0, -1));
    this.right = this.direction.cross(this.up);
    this.fovy = defaultValue(option.fovy, 60 / 180 * Math.PI);
    this.canvas = canvas;
    if (canvas) {
        this.aspectRatio = canvas.width / canvas.height;
    } else {
        this.aspectRatio = 16 / 9;
    }
    this.near = defaultValue(option.near, 0.1);
    this.far = defaultValue(option.far, 1000);
    this.view = new Matrix4();
    this.project = new Matrix4();

    this.update();
}

Camera.prototype.update = function () {
    if (this.canvas) {
        this.aspectRatio = canvas.width / canvas.height;
    }

    Matrix4.computeView(this.position, this.direction, this.up, this.right, this.view);
    Matrix4.computePerspectiveFieldOfView(this.fovy, this.aspectRatio, this.near, this.far, this.project);
}

export default Camera;
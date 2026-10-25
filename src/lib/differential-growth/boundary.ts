import { vector, type Vector2 } from "./vector";

export class RectangleBoundary {
  readonly center: Vector2;
  readonly left: number;
  readonly right: number;
  readonly top: number;
  readonly bottom: number;

  constructor(width: number, height: number, padding: number) {
    this.center = vector(width / 2, height / 2);
    this.left = padding;
    this.right = Math.max(padding + 1, width - padding);
    this.top = padding;
    this.bottom = Math.max(padding + 1, height - padding);
  }

  contains(position: Vector2) {
    return (
      position.x >= this.left &&
      position.x <= this.right &&
      position.y >= this.top &&
      position.y <= this.bottom
    );
  }

  freezeAtEdge(position: Vector2, velocity: Vector2) {
    if (this.contains(position)) return false;

    position.x = Math.min(this.right, Math.max(this.left, position.x));
    position.y = Math.min(this.bottom, Math.max(this.top, position.y));
    velocity.x = 0;
    velocity.y = 0;

    return true;
  }
}

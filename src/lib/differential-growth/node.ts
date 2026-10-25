import { vector, type Vector2 } from "./vector";

export interface GrowthNode {
  id: number;
  position: Vector2;
  velocity: Vector2;
  fixed: boolean;
}

export const createNode = (
  id: number,
  x: number,
  y: number,
): GrowthNode => ({
  id,
  position: vector(x, y),
  velocity: vector(),
  fixed: false,
});

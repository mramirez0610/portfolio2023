import type { GrowthNode } from "./node";
import type { Vector2 } from "./vector";

export class SpatialHash {
  private readonly cells = new Map<string, number[]>();

  constructor(private readonly cellSize: number) {}

  rebuild(nodes: GrowthNode[]) {
    this.cells.clear();

    nodes.forEach((node, index) => {
      const key = this.keyFor(node.position);
      const cell = this.cells.get(key) ?? [];
      cell.push(index);
      this.cells.set(key, cell);
    });
  }

  nearby(position: Vector2): number[] {
    const cellX = Math.floor(position.x / this.cellSize);
    const cellY = Math.floor(position.y / this.cellSize);
    const nearbyNodes: number[] = [];

    for (let xOffset = -1; xOffset <= 1; xOffset += 1) {
      for (let yOffset = -1; yOffset <= 1; yOffset += 1) {
        const cell = this.cells.get(
          `${cellX + xOffset}:${cellY + yOffset}`,
        );

        if (cell) nearbyNodes.push(...cell);
      }
    }

    return nearbyNodes;
  }

  private keyFor(position: Vector2) {
    return `${Math.floor(position.x / this.cellSize)}:${Math.floor(position.y / this.cellSize)}`;
  }
}

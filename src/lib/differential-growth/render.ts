import type { GrowthNode } from "./node";
import type { GrowthSettings } from "./settings";
import type { RectangleBoundary } from "./boundary";

interface DrawingSurface {
  readonly CLOSE: string;
  noFill(): void;
  stroke(color: string): void;
  strokeWeight(weight: number): void;
  beginShape(): void;
  vertex(x: number, y: number): void;
  endShape(mode?: string): void;
}

export const drawGrowthBoundary = (
  drawing: DrawingSurface,
  boundary: RectangleBoundary,
  settings: GrowthSettings,
) => {
  if (!settings.showBoundary) return;

  drawing.noFill();
  drawing.stroke(settings.boundaryColor);
  drawing.strokeWeight(settings.strokeWidth);
  drawing.beginShape();
  drawing.vertex(boundary.left, boundary.top);
  drawing.vertex(boundary.right, boundary.top);
  drawing.vertex(boundary.right, boundary.bottom);
  drawing.vertex(boundary.left, boundary.bottom);
  drawing.endShape(drawing.CLOSE);
};

export const drawGrowthLine = (
  drawing: DrawingSurface,
  nodes: GrowthNode[],
  settings: GrowthSettings,
) => {
  if (nodes.length < 3) return;

  drawing.noFill();
  drawing.stroke(settings.strokeColor);
  drawing.strokeWeight(settings.strokeWidth);
  drawing.beginShape();

  nodes.forEach(({ position }) => {
    drawing.vertex(position.x, position.y);
  });

  drawing.endShape(drawing.CLOSE);
};

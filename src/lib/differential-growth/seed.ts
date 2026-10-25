import { createNode, type GrowthNode } from "./node";

export const createPolygonSeed = (
  centerX: number,
  centerY: number,
  radius: number,
  nodeCount: number,
): GrowthNode[] => {
  return Array.from({ length: nodeCount }, (_, index) => {
    const angle = (Math.PI * 2 * index) / nodeCount;

    return createNode(
      index,
      centerX + Math.cos(angle) * radius,
      centerY + Math.sin(angle) * radius,
    );
  });
};

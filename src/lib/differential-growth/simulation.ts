import { RectangleBoundary } from "./boundary";
import { createNode, type GrowthNode } from "./node";
import { createPolygonSeed } from "./seed";
import type { GrowthSettings } from "./settings";
import { SpatialHash } from "./spatialHash";
import {
  addScaled,
  difference,
  limit,
  magnitude,
  midpoint,
  normalized,
  vector,
  type Vector2,
} from "./vector";

export class DifferentialGrowth {
  readonly nodes: GrowthNode[];
  readonly settings: GrowthSettings;
  readonly boundary: RectangleBoundary;

  private readonly spatialHash: SpatialHash;
  private nextNodeId: number;

  constructor(width: number, height: number, settings: GrowthSettings) {
    this.settings = settings;
    this.boundary = new RectangleBoundary(
      width,
      height,
      settings.boundaryPadding,
    );
    this.spatialHash = new SpatialHash(settings.repulsionRadius);
    this.nodes = createPolygonSeed(
      width / 2,
      height / 2,
      settings.initialRadius,
      settings.initialNodes,
    );
    this.nextNodeId = this.nodes.length;
  }

  get isFinished() {
    return this.nodes.length >= this.settings.maximumNodes;
  }

  step() {
    this.spatialHash.rebuild(this.nodes);
    const forces = this.nodes.map(() => vector());

    this.nodes.forEach((node, index) => {
      if (node.fixed) return;

      const previousIndex = this.wrapIndex(index - 1);
      const nextIndex = this.wrapIndex(index + 1);
      const previous = this.nodes[previousIndex];
      const next = this.nodes[nextIndex];
      const force = forces[index];

      this.addAttraction(force, node, previous);
      this.addAttraction(force, node, next);
      this.addAlignment(force, node, previous, next);
      this.addRepulsion(force, node, index);
      this.addBrownianMotion(force);
    });

    this.nodes.forEach((node, index) => {
      if (node.fixed) return;

      addScaled(node.velocity, forces[index], 1);
      node.velocity.x *= this.settings.damping;
      node.velocity.y *= this.settings.damping;
      limit(node.velocity, this.settings.maximumSpeed);
      addScaled(node.position, node.velocity, 1);

      if (this.boundary.freezeAtEdge(node.position, node.velocity)) {
        node.fixed = true;
      }
    });

    this.splitStretchedEdges();
  }

  private addAttraction(
    force: Vector2,
    node: GrowthNode,
    neighbor: GrowthNode,
  ) {
    const offset = difference(node.position, neighbor.position);
    const distance = magnitude(offset);
    const stretch = distance - this.settings.preferredEdgeLength;

    if (stretch <= 0) return;

    addScaled(
      force,
      normalized(offset),
      stretch * this.settings.attractionStrength,
    );
  }

  private addAlignment(
    force: Vector2,
    node: GrowthNode,
    previous: GrowthNode,
    next: GrowthNode,
  ) {
    const neighborMidpoint = midpoint(previous.position, next.position);
    const towardMiddle = difference(node.position, neighborMidpoint);
    addScaled(force, towardMiddle, this.settings.alignmentStrength);
  }

  private addRepulsion(
    force: Vector2,
    node: GrowthNode,
    nodeIndex: number,
  ) {
    const radiusSquared = this.settings.repulsionRadius ** 2;

    for (const otherIndex of this.spatialHash.nearby(node.position)) {
      if (otherIndex === nodeIndex) continue;

      const awayFromOther = difference(
        this.nodes[otherIndex].position,
        node.position,
      );
      const distanceSquared =
        awayFromOther.x * awayFromOther.x + awayFromOther.y * awayFromOther.y;

      if (distanceSquared >= radiusSquared || distanceSquared < 0.0001) continue;

      const distance = Math.sqrt(distanceSquared);
      const proximity = 1 - distance / this.settings.repulsionRadius;
      addScaled(
        force,
        normalized(awayFromOther),
        proximity * proximity * this.settings.repulsionStrength,
      );
    }
  }

  private addBrownianMotion(force: Vector2) {
    const strength = this.settings.brownianStrength;

    force.x += (Math.random() - 0.5) * strength;
    force.y += (Math.random() - 0.5) * strength;
  }

  private splitStretchedEdges() {
    if (this.nodes.length >= this.settings.maximumNodes) return;

    const candidates = this.nodes
      .map((node, index) => ({
        index,
        length: magnitude(
          difference(node.position, this.nodes[this.wrapIndex(index + 1)].position),
        ),
      }))
      .filter(({ length }) => length > this.settings.splitDistance)
      .sort((first, second) => second.length - first.length)
      .slice(0, 12);

    candidates
      .sort((first, second) => second.index - first.index)
      .forEach(({ index }) => this.splitEdgeAfter(index));
  }

  private splitEdgeAfter(index: number) {
    if (this.nodes.length >= this.settings.maximumNodes) return;

    const current = this.nodes[index];
    const next = this.nodes[this.wrapIndex(index + 1)];
    const position = midpoint(current.position, next.position);
    const newNode = createNode(this.nextNodeId, position.x, position.y);
    newNode.velocity = midpoint(current.velocity, next.velocity);
    this.nextNodeId += 1;
    this.nodes.splice(index + 1, 0, newNode);
  }

  private wrapIndex(index: number) {
    return (index + this.nodes.length) % this.nodes.length;
  }
}

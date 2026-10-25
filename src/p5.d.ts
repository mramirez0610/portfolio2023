// p5 2.3.3 advertises a declaration entry that is not included in its npm
// package, so keep the small surface used by this site typed locally.
declare module "p5" {
  interface Renderer {
    parent(element: HTMLElement): void;
  }

  export default class p5 {
    readonly CLOSE: string;
    constructor(sketch: (instance: p5) => void);
    setup: () => void;
    draw: () => void;
    createCanvas(width: number, height: number): Renderer;
    resizeCanvas(width: number, height: number): void;
    pixelDensity(density: number): void;
    frameRate(framesPerSecond: number): void;
    clear(): void;
    loop(): void;
    noLoop(): void;
    noFill(): void;
    stroke(color: string): void;
    strokeWeight(weight: number): void;
    beginShape(): void;
    vertex(x: number, y: number): void;
    endShape(mode?: string): void;
  }
}

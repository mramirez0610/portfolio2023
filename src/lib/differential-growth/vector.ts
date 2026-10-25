export interface Vector2 {
  x: number;
  y: number;
}

export const vector = (x = 0, y = 0): Vector2 => ({ x, y });

export const addScaled = (
  target: Vector2,
  direction: Vector2,
  amount: number,
) => {
  target.x += direction.x * amount;
  target.y += direction.y * amount;
};

export const difference = (from: Vector2, to: Vector2): Vector2 => ({
  x: to.x - from.x,
  y: to.y - from.y,
});

export const magnitude = (value: Vector2) =>
  Math.hypot(value.x, value.y);

export const normalized = (value: Vector2): Vector2 => {
  const length = magnitude(value);

  if (length < 0.0001) return vector();

  return vector(value.x / length, value.y / length);
};

export const limit = (value: Vector2, maximum: number) => {
  const length = magnitude(value);

  if (length <= maximum || length === 0) return;

  value.x = (value.x / length) * maximum;
  value.y = (value.y / length) * maximum;
};

export const midpoint = (first: Vector2, second: Vector2): Vector2 => ({
  x: (first.x + second.x) / 2,
  y: (first.y + second.y) / 2,
});

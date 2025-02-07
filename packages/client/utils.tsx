import { ControlPoint } from "@chatbot-builder/store/slices/Builder/Nodes/types";

export const catmullRomToBezier = (
  points: ControlPoint[],
  tension: number = 1.3,
  offset: number = 0
): string => {
  if (points.length < 2) return "";

  const d: string[] = [];

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = i === 0 ? points[0] : points[i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = i === points.length - 2 ? p2 : points[i + 2];

    const b0x = p1.position.x + offset;
    const b0y = p1.position.y + offset;
    const b1x =
      p1.position.x + ((p2.position.x - p0.position.x) * tension) / 6 + offset;
    const b1y =
      p1.position.y + ((p2.position.y - p0.position.y) * tension) / 6 + offset;
    const b2x =
      p2.position.x - ((p3.position.x - p1.position.x) * tension) / 6 + offset;
    const b2y =
      p2.position.y - ((p3.position.y - p1.position.y) * tension) / 6 + offset;
    const b3x = p2.position.x + offset;
    const b3y = p2.position.y + offset;

    if (!i) d.push(`M${b0x},${b0y}`);
    d.push(`C${b1x},${b1y},${b2x},${b2y},${b3x},${b3y}`);
  }

  return d.join(" ");
};

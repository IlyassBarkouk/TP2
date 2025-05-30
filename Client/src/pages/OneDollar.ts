export default class OneDollar {
  options: {
    score: number;
    parts: number;
    step: number;
    angle: number;
    size: number;
  };
  gestures: Record<string, [number, number][]>;

  constructor(options?: Partial<{ score:number; parts:number; step:number; angle:number; size:number; }>) {
    this.options = Object.assign({
      score: 80,
      parts: 64,
      step: 2,
      angle: 45,
      size: 250,
    }, options);
    this.gestures = {};
  }

  add(name: string, points: [number, number][]) {
    this.gestures[name] = this.resample(points, this.options.parts);
  }

  resample(points: [number, number][], n: number): [number, number][] {
    const I = this.pathLength(points) / (n - 1); // interval length
    const newPoints: [number, number][] = [points[0]];
    let D = 0.0;
    for (let i = 1; i < points.length; i++) {
      const d = this.distance(points[i - 1], points[i]);
      if ((D + d) >= I) {
        const qx = points[i - 1][0] + ((I - D) / d) * (points[i][0] - points[i - 1][0]);
        const qy = points[i - 1][1] + ((I - D) / d) * (points[i][1] - points[i - 1][1]);
        newPoints.push([qx, qy]);
        points.splice(i, 0, [qx, qy]);
        D = 0.0;
      } else {
        D += d;
      }
    }
    // Sometimes we fall a rounding-error short of adding the last point, so add it if needed
    if (newPoints.length === n - 1) {
      newPoints.push(points[points.length - 1]);
    }
    return newPoints;
  }

  distance(p1: [number, number], p2: [number, number]) {
    const dx = p2[0] - p1[0];
    const dy = p2[1] - p1[1];
    return Math.sqrt(dx * dx + dy * dy);
  }

  pathLength(points: [number, number][]) {
    let d = 0;
    for (let i = 1; i < points.length; i++) {
      d += this.distance(points[i - 1], points[i]);
    }
    return d;
  }

  pathDistance(pts1: [number, number][], pts2: [number, number][]) {
    let d = 0;
    for (let i = 0; i < pts1.length; i++) {
      d += this.distance(pts1[i], pts2[i]);
    }
    return d / pts1.length;
  }

  check(points: [number, number][]) {
    if (!points.length) return false;
    const n = this.options.parts;
    const candidate = this.resample(points, n);
    let b = Infinity;
    let gestureName = "";
    for (const name in this.gestures) {
      const d = this.pathDistance(candidate, this.gestures[name]);
      if (d < b) {
        b = d;
        gestureName = name;
      }
    }
    // Convert distance to a score (inverse relation)
    const score = Math.max(0, 100 * (1 - b / (0.5 * Math.sqrt(2 * this.options.size * this.options.size))));
    const recognized = score >= this.options.score;
    if (recognized) {
      return { name: gestureName, score, recognized };
    }
    return false;
  }
}

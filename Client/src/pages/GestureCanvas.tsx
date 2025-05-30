import React, { useRef, useEffect, useState } from "react";
import OneDollar from "./OneDollar";
import type { GestureResult } from "../models/pointerUpHandler ";


const GestureCanvas: React.FC = () => {
  const refCanvas = useRef<HTMLCanvasElement>(null);
const [recognizer] = useState(() => new OneDollar({ score: 85, size: 250, parts: 64 }));
  const paint = useRef(false);
  const gesturePoints = useRef<[number, number][]>([]);
  const clickX = useRef<number[]>([]);
  const clickY = useRef<number[]>([]);
  const clickDrag = useRef<boolean[]>([]);

  // État pour afficher le résultat sous le canvas
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
  recognizer.add("triangle", [
    [0.1, 0.1],
    [0.5, 0.9],
    [0.9, 0.1],
    [0.1, 0.1],
  ]);
  recognizer.add("circle", [
    [0.5, 0.1],
    [0.8, 0.3],
    [0.9, 0.6],
    [0.7, 0.9],
    [0.3, 0.9],
    [0.1, 0.6],
    [0.3, 0.3],
    [0.5, 0.1],
  ]);
  recognizer.add("ligne", [
    [0, 0.5],
    [0.3, 0.5],
    [0.6, 0.5],
    [1, 0.5],
  ]);
  recognizer.add("V", [
    [0, 0],
    [0.5, 1],
    [1, 0],
  ]);
  recognizer.add("carre", [
    [0.2, 0.2],
    [0.8, 0.2],
    [0.8, 0.8],
    [0.2, 0.8],
    [0.2, 0.2],
  ]);
}, [recognizer]);

  function addClick(x: number, y: number, dragging: boolean) {
    clickX.current.push(x);
    clickY.current.push(y);
    clickDrag.current.push(dragging);
  }

  function redraw() {
    if (!refCanvas.current) return;
    const ctx = refCanvas.current.getContext("2d");
    if (!ctx) return;
    const width = refCanvas.current.clientWidth;
    const height = refCanvas.current.clientHeight;
    refCanvas.current.width = width;
    refCanvas.current.height = height;

    ctx.clearRect(0, 0, width, height);

    // dessin trait classique
    ctx.strokeStyle = "#df4b26";
    ctx.lineJoin = "round";
    ctx.lineWidth = 2;
    for (let i = 0; i < clickX.current.length; i++) {
      ctx.beginPath();
      if (clickDrag.current[i] && i) {
        ctx.moveTo(clickX.current[i - 1] * width, clickY.current[i - 1] * height);
      } else {
        ctx.moveTo(clickX.current[i] * width - 1, clickY.current[i] * height);
      }
      ctx.lineTo(clickX.current[i] * width, clickY.current[i] * height);
      ctx.stroke();
    }

    // dessin geste en cours (gris foncé)
    if (gesturePoints.current.length > 0) {
      ctx.strokeStyle = "#666";
      ctx.lineJoin = "round";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(gesturePoints.current[0][0] * width, gesturePoints.current[0][1] * height);
      for (let i = 1; i < gesturePoints.current.length; i++) {
        ctx.lineTo(gesturePoints.current[i][0] * width, gesturePoints.current[i][1] * height);
      }
      ctx.stroke();
    }
  }

  function pointerDownHandler(ev: React.PointerEvent) {
    if (ev.pointerType !== "mouse" && ev.pointerType !== "touch") return;
    if (!refCanvas.current) return;
    const rect = refCanvas.current.getBoundingClientRect();
    const x = (ev.clientX - rect.left) / rect.width;
    const y = (ev.clientY - rect.top) / rect.height;

    paint.current = true;
    addClick(x, y, false);
    gesturePoints.current = [[x, y]];
    redraw();
  }

  function pointerMoveHandler(ev: React.PointerEvent) {
    if (!paint.current) return;
    if (ev.pointerType !== "mouse" && ev.pointerType !== "touch") return;
    if (!refCanvas.current) return;
    const rect = refCanvas.current.getBoundingClientRect();
    const x = (ev.clientX - rect.left) / rect.width;
    const y = (ev.clientY - rect.top) / rect.height;

    addClick(x, y, true);
    gesturePoints.current.push([x, y]);
    redraw();
  }

  function pointerUpHandler(ev: React.PointerEvent) {
    if (ev.pointerType !== "mouse" && ev.pointerType !== "touch") return;
    paint.current = false;

    if (gesturePoints.current.length > 0) {
      const checkResult = recognizer.check(gesturePoints.current) as GestureResult | false;
      if (checkResult && checkResult.recognized) {
        setResult(`Geste reconnu : ${checkResult.name} (score: ${checkResult.score.toFixed(2)})`);
      } else {
        setResult("Geste non reconnu");
      }
    }

    gesturePoints.current = [];
    clickX.current = [];
    clickY.current = [];
    clickDrag.current = [];
    redraw();
  }

  useEffect(() => {
    const canvas = refCanvas.current;
    if (!canvas) return;

    canvas.style.touchAction = "none";

    canvas.addEventListener("pointerdown", pointerDownHandler as any);
    canvas.addEventListener("pointermove", pointerMoveHandler as any);
    canvas.addEventListener("pointerup", pointerUpHandler as any);
    canvas.addEventListener("pointerleave", pointerUpHandler as any);

    return () => {
      canvas.removeEventListener("pointerdown", pointerDownHandler as any);
      canvas.removeEventListener("pointermove", pointerMoveHandler as any);
      canvas.removeEventListener("pointerup", pointerUpHandler as any);
      canvas.removeEventListener("pointerleave", pointerUpHandler as any);
    };
  }, []);

  return (
    <>
      <canvas
        ref={refCanvas}
        style={{
          width: "100%",
          height: "400px",
          border: "1px solid #333",
        }}
      />
      <div
        style={{
          marginTop: 10,
          fontWeight: "bold",
          fontSize: 16,
          minHeight: "1.5em",
          color: result && result.includes("non reconnu") ? "red" : "green",
        }}
      >
        {result}
      </div>
    </>
  );
};

export default GestureCanvas;

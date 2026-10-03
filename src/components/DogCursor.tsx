"use client";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const RUN_FRAMES = [
  "/cursor/dog-run-0.png",
  "/cursor/dog-run-1.png",
  "/cursor/dog-run-2.png",
  "/cursor/dog-run-3.png",
] as const;

const DANCE_SRC = "/cursor/dog-dance.png";
const IDLE_MS = 1000;
const FRAME_MS = 90;
const CHASE = 0.18;
const CATCH_UP = 12;

const emptySubscribe = () => () => {};

function useDogEnabled(reduce: boolean | null) {
  return useSyncExternalStore(
    emptySubscribe,
    () => !reduce,
    () => false,
  );
}

function useIsTouchDevice() {
  return useSyncExternalStore(
    emptySubscribe,
    () =>
      window.matchMedia("(pointer: coarse)").matches ||
      navigator.maxTouchPoints > 0,
    () => false,
  );
}

type Mode = "run" | "dance";

/**
 * Dog companion on desktop + mobile.
 * Chases mouse/finger, dances after 1s idle. Never blocks taps/clicks.
 */
export function DogCursor() {
  const reduce = useReducedMotion();
  const enabled = useDogEnabled(reduce);
  const isTouch = useIsTouchDevice();
  const size = isTouch ? 44 : 38;

  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const [mode, setMode] = useState<Mode>("run");
  const [frame, setFrame] = useState(0);
  const [facing, setFacing] = useState<"right" | "left">("right");
  const [dogPos, setDogPos] = useState({ x: -100, y: -100 });

  const pointer = useRef({ x: 0, y: 0 });
  const dog = useRef({ x: 0, y: 0 });
  const ready = useRef(false);
  const pausedRef = useRef(false);
  const lastMoveAt = useRef(0);
  const idleTimer = useRef<number | null>(null);
  const raf = useRef<number | null>(null);
  const frameTimer = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("has-dog-cursor");

    const clearIdle = () => {
      if (idleTimer.current) {
        window.clearTimeout(idleTimer.current);
        idleTimer.current = null;
      }
    };

    const armIdleDance = () => {
      clearIdle();
      idleTimer.current = window.setTimeout(() => {
        const dx = pointer.current.x - dog.current.x;
        const dy = pointer.current.y - dog.current.y;
        if (Math.hypot(dx, dy) < CATCH_UP) setMode("dance");
      }, IDLE_MS);
    };

    const goTo = (x: number, y: number) => {
      pointer.current = { x, y };
      if (!ready.current) {
        dog.current = { x: x - 60, y: y + 30 };
        setDogPos({ x: x - 60, y: y + 30 });
        ready.current = true;
      }
      lastMoveAt.current = performance.now();
      setVisible(true);
      setMode("run");
      armIdleDance();
    };

    // Mobile: spawn once after paint so the dog is visible before first touch
    let spawnId = 0;
    if (isTouch && !ready.current) {
      spawnId = window.requestAnimationFrame(() => {
        const x = window.innerWidth * 0.72;
        const y = window.innerHeight * 0.78;
        pointer.current = { x, y };
        dog.current = { x: x - 80, y: y + 40 };
        setDogPos({ x: x - 80, y: y + 40 });
        ready.current = true;
        setVisible(true);
        setMode("run");
        lastMoveAt.current = performance.now();
        armIdleDance();
      });
    }

    const setPausedState = (value: boolean) => {
      pausedRef.current = value;
      setPaused(value);
    };

    const onMouseMove = (e: MouseEvent) => {
      goTo(e.clientX, e.clientY);
    };

    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      const el = document.elementFromPoint(t.clientX, t.clientY);
      const overField = Boolean(
        el?.closest("input, textarea, select, [contenteditable='true']"),
      );
      setPausedState(overField);
      if (overField) return;
      goTo(t.clientX, t.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t || pausedRef.current) return;
      goTo(t.clientX, t.clientY);
    };

    const onTouchEnd = () => {
      armIdleDance();
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      const overField = Boolean(
        t?.closest("input, textarea, select, [contenteditable='true']"),
      );
      setPausedState(overField);
    };

    const tick = () => {
      const target = pointer.current;
      const cur = dog.current;
      const dx = target.x - cur.x;
      const dy = target.y - cur.y;
      const dist = Math.hypot(dx, dy);

      if (dist > 0.5) {
        const nextX = cur.x + dx * CHASE;
        const nextY = cur.y + dy * CHASE;
        dog.current = { x: nextX, y: nextY };
        setDogPos({ x: nextX, y: nextY });

        if (Math.abs(dx) > 1.5) {
          setFacing(dx >= 0 ? "right" : "left");
        }
        if (dist > CATCH_UP) setMode("run");
      }

      const idleFor = performance.now() - lastMoveAt.current;
      if (dist < CATCH_UP && idleFor >= IDLE_MS) {
        setMode((m) => (m === "dance" ? m : "dance"));
      }

      raf.current = window.requestAnimationFrame(tick);
    };

    raf.current = window.requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      document.documentElement.classList.remove("has-dog-cursor");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
      clearIdle();
      if (spawnId) window.cancelAnimationFrame(spawnId);
      if (raf.current) window.cancelAnimationFrame(raf.current);
      if (frameTimer.current) window.clearInterval(frameTimer.current);
    };
  }, [enabled, isTouch]);

  useEffect(() => {
    if (!enabled || mode !== "run") return;
    frameTimer.current = window.setInterval(() => {
      setFrame((f) => (f + 1) % RUN_FRAMES.length);
    }, FRAME_MS);
    return () => {
      if (frameTimer.current) window.clearInterval(frameTimer.current);
    };
  }, [enabled, mode]);

  if (!enabled) return null;

  const src = mode === "dance" ? DANCE_SRC : RUN_FRAMES[frame];
  const drawSize = mode === "dance" ? size + 8 : size;
  const show = visible && !paused;
  const drawX = dogPos.x - drawSize * 0.35;
  const drawY = dogPos.y - drawSize * 0.25;

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-[95] block"
      style={{
        transform: `translate3d(${drawX}px, ${drawY}px, 0)`,
        opacity: show ? 1 : 0,
        transition: "opacity 120ms ease",
        willChange: "transform",
      }}
      aria-hidden
    >
      <div
        className={cn(
          "relative pointer-events-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.28)]",
          mode === "dance" && "dog-dance-bob",
          facing === "left" && mode === "run" && "scale-x-[-1]",
        )}
        style={{ width: drawSize, height: drawSize }}
      >
        <Image
          src={src}
          alt=""
          width={drawSize}
          height={drawSize}
          unoptimized
          priority
          className="pointer-events-none h-full w-full object-contain select-none"
          draggable={false}
        />
      </div>
    </div>
  );
}

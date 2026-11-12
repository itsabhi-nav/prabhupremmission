"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, Volume2, VolumeX, Wind } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A small, synthesised sound shrine: a tanpura-like drone, a temple bell and
 * a conch. Nothing is recorded, nothing autoplays — the visitor opens the
 * sound themselves, and can close it again.
 */
export function AmbientAudio({
  className,
  placement = "down",
  label = false,
}: {
  className?: string;
  placement?: "down" | "up";
  label?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const droneRef = useRef<OscillatorNode[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const ensureContext = useCallback(() => {
    if (ctxRef.current) return ctxRef.current;
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return null;
    const ctx = new Ctor();
    const master = ctx.createGain();
    master.gain.value = 0.0001;
    master.connect(ctx.destination);
    ctxRef.current = ctx;
    masterRef.current = master;
    return ctx;
  }, []);

  const ringBell = useCallback(
    (level = 0.5) => {
      const ctx = ensureContext();
      const master = masterRef.current;
      if (!ctx || !master) return;

      const now = ctx.currentTime;
      const partials = [1, 2.02, 2.76, 4.07, 5.43, 8.93];
      const weights = [0.5, 0.28, 0.2, 0.12, 0.08, 0.045];

      partials.forEach((ratio, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const base = 196;
        osc.type = "sine";
        osc.frequency.value = base * ratio;
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(
          Math.max(0.0002, weights[index] * level * 0.5),
          now + 0.012,
        );
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 7.5 - index * 0.6);
        osc.connect(gain).connect(master);
        osc.start(now);
        osc.stop(now + 8);
      });
    },
    [ensureContext],
  );

  const blowShankh = useCallback(() => {
    const ctx = ensureContext();
    const master = masterRef.current;
    if (!ctx || !master) return;

    const now = ctx.currentTime;
    const dur = 3.4;

    // breath — a band of filtered noise under the tone
    const buffer = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.value = 900;
    noiseFilter.Q.value = 0.8;
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.0001, now);
    noiseGain.gain.linearRampToValueAtTime(0.16, now + 0.5);
    noiseGain.gain.linearRampToValueAtTime(0.1, now + 2.4);
    noiseGain.gain.linearRampToValueAtTime(0.0001, now + dur);
    noise.connect(noiseFilter).connect(noiseGain).connect(master);
    noise.start(now);

    // the horn — three beating saws, opening then settling
    [1, 1.005, 1.5].forEach((mult, index) => {
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(104 * mult, now);
      osc.frequency.linearRampToValueAtTime(122 * mult, now + 0.8);
      osc.frequency.linearRampToValueAtTime(116 * mult, now + 2.8);
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(600, now);
      filter.frequency.linearRampToValueAtTime(1500, now + 0.7);
      filter.frequency.linearRampToValueAtTime(800, now + 2.8);
      filter.Q.value = 3;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.05 / (index + 1), now + 0.45);
      gain.gain.linearRampToValueAtTime(0.0001, now + dur);
      osc.connect(filter).connect(gain).connect(master);
      osc.start(now);
      osc.stop(now + dur + 0.1);
    });
  }, [ensureContext]);

  const stopDrone = useCallback(() => {
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (!ctx || !master) return;
    const now = ctx.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.setValueAtTime(Math.max(master.gain.value, 0.0001), now);
    master.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    droneRef.current.forEach((osc) => {
      try {
        osc.stop(now + 1.25);
      } catch {
        /* already stopped */
      }
    });
    droneRef.current = [];
    setPlaying(false);
    window.setTimeout(() => {
      void ctx.suspend();
    }, 1400);
  }, []);

  const startDrone = useCallback(() => {
    const ctx = ensureContext();
    const master = masterRef.current;
    if (!ctx || !master) return;

    if (droneRef.current.length === 0) {
      // Sa–Pa–Sa, gently detuned; a slow breath over the top
      const voices = [
        { hz: 110, gain: 0.5 },
        { hz: 164.81, gain: 0.26 },
        { hz: 220, gain: 0.18 },
      ];
      const bus = ctx.createGain();
      bus.gain.value = 0.05;
      const lowpass = ctx.createBiquadFilter();
      lowpass.type = "lowpass";
      lowpass.frequency.value = 680;
      bus.connect(lowpass).connect(master);

      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.value = 0.06;
      lfoGain.gain.value = 0.012;
      lfo.connect(lfoGain).connect(bus.gain);
      lfo.start();
      droneRef.current.push(lfo);

      voices.forEach(({ hz, gain }) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = hz;
        g.gain.value = gain;
        osc.connect(g).connect(bus);
        osc.start();
        droneRef.current.push(osc);
      });
    }

    const now = ctx.currentTime;
    void ctx.resume();
    master.gain.cancelScheduledValues(now);
    master.gain.setValueAtTime(Math.max(master.gain.value, 0.0001), now);
    master.gain.exponentialRampToValueAtTime(0.22, now + 2.4);
    setPlaying(true);

    ringBell(0.5);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => ringBell(0.36), 26000);
  }, [ensureContext, ringBell]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      droneRef.current.forEach((osc) => {
        try {
          osc.stop();
        } catch {
          /* noop */
        }
      });
      void ctxRef.current?.close();
    };
  }, []);

  const toggle = () => {
    if (playing) stopDrone();
    else startDrone();
  };

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => {
          setOpen((value) => !value);
          setReady(true);
        }}
        aria-label="Temple sound"
        aria-expanded={open}
        className={cn(
          "flex items-center justify-center border border-current/25 transition-colors duration-300 hover:border-current/60",
          label ? "gap-2.5 rounded-[2px] px-4 py-2 text-[0.85rem]" : "h-10 w-10 rounded-full",
          playing && "border-saffron/60 text-saffron",
        )}
      >
        {playing ? (
          <Volume2 className="h-4 w-4" strokeWidth={1.5} />
        ) : (
          <VolumeX className="h-4 w-4" strokeWidth={1.5} />
        )}
        {label ? "Temple sound" : null}
      </button>

      <AnimatePresence>
        {open && ready && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "absolute right-0 z-[60] w-64 border border-ivory/15 bg-charcoal p-5 text-ivory shadow-[0_20px_60px_rgba(0,0,0,0.45)]",
              placement === "up" ? "bottom-12" : "top-12",
            )}
          >
            <p className="text-[0.7rem] tracking-[0.01em] text-gold">
              Temple sound
            </p>
            <p className="mt-2 font-display text-lg leading-snug">
              A quiet drone, a bell, a conch.
            </p>
            <p className="mt-2 text-[0.72rem] font-normal leading-relaxed text-ivory/50">
              Synthesised here, in the browser. Nothing is recorded; nothing
              plays until you ask.
            </p>

            <div className="mt-4 flex flex-col gap-2">
              <button
                type="button"
                onClick={toggle}
                aria-pressed={playing}
                className={cn(
                  "flex items-center justify-between border px-3 py-2.5 text-[0.8rem] tracking-[0.01em] transition-colors duration-300",
                  playing
                    ? "border-saffron bg-saffron text-charcoal"
                    : "border-ivory/25 text-ivory/80 hover:border-ivory/60 hover:text-ivory",
                )}
              >
                {playing ? "Silence the drone" : "Begin the drone"}
                <span
                  aria-hidden
                  className="flex h-3 items-end gap-[2px]"
                >
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className={cn(
                        "w-[2px] bg-current transition-all duration-500",
                        playing ? "animate-sound-bar" : "h-[3px] opacity-40",
                      )}
                      style={{ animationDelay: `${i * 0.18}s` }}
                    />
                  ))}
                </span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => ringBell(0.6)}
                  className="flex items-center justify-center gap-2 border border-ivory/20 py-2.5 text-[0.7rem] tracking-[0.01em] text-ivory/70 transition-colors duration-300 hover:border-gold hover:text-gold"
                >
                  <Bell className="h-3.5 w-3.5" strokeWidth={1.5} />
                  Bell
                </button>
                <button
                  type="button"
                  onClick={blowShankh}
                  className="flex items-center justify-center gap-2 border border-ivory/20 py-2.5 text-[0.7rem] tracking-[0.01em] text-ivory/70 transition-colors duration-300 hover:border-gold hover:text-gold"
                >
                  <Wind className="h-3.5 w-3.5" strokeWidth={1.5} />
                  Shankh
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

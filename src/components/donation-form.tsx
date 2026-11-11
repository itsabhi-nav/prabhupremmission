"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Lock, QrCode } from "lucide-react";
import { donation, initiatives, site } from "@/content/site";
import { cn } from "@/lib/utils";

const presets = [501, 1100, 2500, 5100, 11000];

const purposes = [
  "Wherever it is needed most",
  ...initiatives.map((initiative) => initiative.title),
];

function CopyField({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex items-center justify-between gap-4 border-b border-line py-3.5">
      <div className="min-w-0">
        <p className="text-[0.54rem] uppercase tracking-[0.2em] text-charcoal/35">
          {label}
        </p>
        <p
          className={cn(
            "mt-1 truncate text-sm text-charcoal/85",
            mono && "font-medium tracking-[0.02em]",
          )}
        >
          {value}
        </p>
      </div>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy ${label}`}
        className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-charcoal/15 text-charcoal/50 transition-all duration-500 hover:border-charcoal hover:text-charcoal"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5" strokeWidth={1.5} />
        ) : (
          <Copy className="h-3.5 w-3.5" strokeWidth={1.5} />
        )}
      </button>
    </div>
  );
}

export function DonationForm() {
  const [amount, setAmount] = useState<number | "custom">(1100);
  const [custom, setCustom] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [purpose, setPurpose] = useState(purposes[0]);
  const [privateOffering, setPrivateOffering] = useState(false);
  const [error, setError] = useState("");
  const [revealed, setRevealed] = useState(false);

  const resolvedAmount =
    amount === "custom" ? Number(custom.replace(/[^\d]/g, "")) : amount;

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!resolvedAmount || resolvedAmount < 1) {
      setError("Please choose or enter an amount.");
      return;
    }
    if (name.trim().length < 2) {
      setError("Please share your name so the offering can be acknowledged.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setRevealed(true);

    window.setTimeout(() => {
      document
        .getElementById("payment-details")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 120);
  }

  return (
    <div id="gupta-daan" className="scroll-mt-28">
      <AnimatePresence mode="wait" initial={false}>
        {!revealed ? (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="border border-line bg-ivory p-6 sm:p-9 lg:p-10"
          >
            <div className="flex items-start justify-between gap-4 border-b border-line pb-5">
              <div>
                <p className="text-[0.56rem] uppercase tracking-[0.22em] text-charcoal/40">
                  Offering details
                </p>
                <h2 className="mt-2 font-display text-3xl">Make a contribution</h2>
              </div>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-cream text-saffron">
                <QrCode className="h-5 w-5" strokeWidth={1.4} />
              </span>
            </div>

            <fieldset className="mt-8">
              <legend className="text-[0.56rem] uppercase tracking-[0.22em] text-charcoal/45">
                Amount (INR)
              </legend>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {presets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => {
                      setAmount(preset);
                      setError("");
                    }}
                    className={cn(
                      "rounded-full border px-5 py-2.5 text-sm transition-all duration-400",
                      amount === preset
                        ? "border-charcoal bg-charcoal text-ivory"
                        : "border-charcoal/20 text-charcoal/70 hover:border-charcoal/50",
                    )}
                  >
                    ₹{preset.toLocaleString("en-IN")}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setAmount("custom")}
                  className={cn(
                    "rounded-full border px-5 py-2.5 text-sm transition-all duration-400",
                    amount === "custom"
                      ? "border-charcoal bg-charcoal text-ivory"
                      : "border-charcoal/20 text-charcoal/70 hover:border-charcoal/50",
                  )}
                >
                  Other
                </button>
              </div>

              <AnimatePresence initial={false}>
                {amount === "custom" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <label className="mt-5 block">
                      <span className="text-[0.56rem] uppercase tracking-[0.2em] text-charcoal/40">
                        Enter an amount
                      </span>
                      <div className="mt-1 flex items-baseline gap-2 border-b border-charcoal/25 pb-1 focus-within:border-saffron">
                        <span className="font-display text-2xl text-charcoal/50">
                          ₹
                        </span>
                        <input
                          type="text"
                          inputMode="numeric"
                          value={custom}
                          onChange={(event) => {
                            setCustom(event.target.value);
                            setError("");
                          }}
                          placeholder="2,100"
                          className="w-full bg-transparent py-1 text-2xl font-light text-charcoal outline-none placeholder:text-charcoal/25"
                          autoFocus
                        />
                      </div>
                    </label>
                  </motion.div>
                )}
              </AnimatePresence>
            </fieldset>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <label className="block">
                <span className="text-[0.56rem] uppercase tracking-[0.2em] text-charcoal/45">
                  Full name
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                    setError("");
                  }}
                  placeholder="Your name"
                  autoComplete="name"
                  className="field"
                />
              </label>

              <label className="block">
                <span className="text-[0.56rem] uppercase tracking-[0.2em] text-charcoal/45">
                  Email address
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setError("");
                  }}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="field"
                />
              </label>

              <label className="block">
                <span className="text-[0.56rem] uppercase tracking-[0.2em] text-charcoal/45">
                  Phone <span className="normal-case tracking-normal">(optional)</span>
                </span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="+91"
                  autoComplete="tel"
                  className="field"
                />
              </label>

              <label className="block">
                <span className="text-[0.56rem] uppercase tracking-[0.2em] text-charcoal/45">
                  Direct my offering to
                </span>
                <select
                  value={purpose}
                  onChange={(event) => setPurpose(event.target.value)}
                  className="field appearance-none pr-6"
                >
                  {purposes.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="mt-7 flex cursor-pointer items-start gap-3 border-t border-line pt-6">
              <span className="relative mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center">
                <input
                  type="checkbox"
                  checked={privateOffering}
                  onChange={(event) => setPrivateOffering(event.target.checked)}
                  className="peer sr-only"
                />
                <span className="absolute inset-0 rounded-[3px] border border-charcoal/30 transition-colors duration-300 peer-checked:border-charcoal peer-checked:bg-charcoal" />
                <Check
                  className="relative h-3 w-3 text-ivory opacity-0 transition-opacity duration-300 peer-checked:opacity-100"
                  strokeWidth={2}
                />
              </span>
              <span>
                <span className="block text-sm text-charcoal/80">
                  Offer this as Gupta Daan
                </span>
                <span className="mt-0.5 block text-xs font-light leading-relaxed text-charcoal/45">
                  Your name will be kept private and your offering will not be
                  listed anywhere.
                </span>
              </span>
            </label>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  role="alert"
                  className="mt-5 text-xs text-saffron"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <button
              type="submit"
              className="btn btn-solid group mt-7 w-full"
            >
              Continue to payment details
              <Lock
                className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-y-0.5"
                strokeWidth={1.5}
              />
            </button>

            <p className="mt-4 text-center text-[0.62rem] font-light leading-relaxed text-charcoal/40">
              This form does not take a payment. The mission&rsquo;s bank and UPI
              details are shown on the next step.
            </p>
          </motion.form>
        ) : (
          <motion.div
            key="revealed"
            id="payment-details"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="scroll-mt-28 border border-line bg-ivory"
          >
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line p-6 sm:p-9">
              <div>
                <p className="text-[0.56rem] uppercase tracking-[0.22em] text-saffron">
                  One more step
                </p>
                <h2 className="mt-2 font-display text-3xl">
                  Complete your offering of ₹
                  {resolvedAmount.toLocaleString("en-IN")}
                </h2>
                <p className="mt-2 text-sm font-light text-charcoal/55">
                  {privateOffering ? "Gupta Daan · " : ""}Directed to {purpose}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setRevealed(false)}
                className="text-[0.58rem] uppercase tracking-[0.18em] text-charcoal/40 underline decoration-charcoal/20 underline-offset-4 transition-colors duration-500 hover:text-charcoal"
              >
                Edit details
              </button>
            </div>

            <div className="grid gap-8 p-6 sm:p-9 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
              <div>
                <p className="text-[0.56rem] uppercase tracking-[0.22em] text-charcoal/40">
                  Scan to pay via UPI
                </p>
                <div className="mt-4 inline-block border border-line bg-white p-3">
                  <Image
                    src={donation.payment.qr}
                    alt="UPI QR code for Prabhu Prem Mission — placeholder"
                    width={220}
                    height={220}
                    className="h-[190px] w-[190px] object-contain sm:h-[220px] sm:w-[220px]"
                    unoptimized
                  />
                </div>
                <p className="mt-4 text-xs font-light leading-relaxed text-charcoal/45">
                  Works with any UPI app. The QR is a placeholder until the
                  mission&rsquo;s verified UPI ID is connected.
                </p>

                <div className="mt-7 border-t border-line pt-2">
                  <CopyField label="UPI ID" value={donation.payment.upiId} mono />
                  <CopyField label="Payee name" value={donation.payment.upiName} />
                </div>
              </div>

              <div>
                <p className="text-[0.56rem] uppercase tracking-[0.22em] text-charcoal/40">
                  Or transfer directly
                </p>
                <div className="mt-4 border-t border-line">
                  <CopyField label="Bank" value={donation.payment.bankName} />
                  <CopyField label="Account name" value={donation.payment.accountName} />
                  <CopyField
                    label="Account number"
                    value={donation.payment.accountNumber}
                    mono
                  />
                  <CopyField label="IFSC" value={donation.payment.ifsc} mono />
                  <CopyField label="Branch" value={donation.payment.branch} />
                </div>

                <div className="mt-7 bg-cream p-5">
                  <p className="text-[0.56rem] uppercase tracking-[0.22em] text-charcoal/40">
                    After you pay
                  </p>
                  <p className="mt-2 text-sm font-light leading-relaxed text-charcoal/60">
                    {donation.payment.confirmation}
                  </p>
                  <a
                    href={`mailto:${site.email}?subject=Donation%20reference`}
                    className="mt-4 inline-flex text-[0.6rem] font-medium uppercase tracking-[0.18em] text-charcoal underline decoration-charcoal/25 underline-offset-4 transition-colors duration-500 hover:text-saffron"
                  >
                    Send a payment reference
                  </a>
                </div>

                <p className="mt-4 flex items-start gap-2 text-[0.6rem] font-light leading-relaxed text-charcoal/40">
                  <Lock className="mt-0.5 h-3 w-3 shrink-0" strokeWidth={1.5} />
                  {donation.payment.note}
                </p>
              </div>
            </div>

            <div className="border-t border-line bg-charcoal p-6 text-ivory sm:p-9">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[0.56rem] uppercase tracking-[0.22em] text-gold">
                    A note on your offering
                  </p>
                  <p className="mt-2 max-w-xl text-sm font-light leading-relaxed text-ivory/60">
                    No payment is marked complete on this website. Once the
                    mission confirms your transfer, your offering will be
                    recorded and acknowledged by email.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setRevealed(false);
                    setAmount(1100);
                    setCustom("");
                    setName("");
                    setEmail("");
                    setPhone("");
                    setPurpose(purposes[0]);
                    setPrivateOffering(false);
                  }}
                  className="btn btn-outline-light shrink-0"
                >
                  Make another offering
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

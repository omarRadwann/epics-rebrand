"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Member = { email: string; since: string; memberId: string };

const STORAGE_KEY = "epics.member.v1";

export function AccountView() {
  const [member, setMember] = useState<Member | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setMember(JSON.parse(raw));
    } catch {/* noop */}
    setHydrated(true);
  }, []);

  const signIn = (email: string) => {
    const m: Member = {
      email,
      since: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase(),
      memberId: `M-${Math.floor(Math.random() * 9000 + 1000)}`,
    };
    setMember(m);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(m));
  };

  const signOut = () => {
    setMember(null);
    window.localStorage.removeItem(STORAGE_KEY);
  };

  if (!hydrated) return <div className="sr-only">Loading account…</div>;
  if (!member) return <SignedOut onSignIn={signIn} />;
  return <SignedIn member={member} onSignOut={signOut} />;
}

function SignedOut({ onSignIn }: { onSignIn: (email: string) => void }) {
  const [email, setEmail] = useState("");
  return (
    <section className="border-b border-[rgb(var(--ink-black)/0.6)] border-b-[0.5px]">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 pt-16 pb-20 grid grid-cols-12 gap-x-8 gap-y-10">
        <div className="col-span-12 md:col-span-5">
          <p className="specimen-lot opacity-60">A · ACCOUNT</p>
          <h1 className="font-serif-display text-[72px] leading-[1.02] tracking-[-0.025em] mt-3">
            The members&rsquo; ledger.
          </h1>
          <p className="font-serif-display italic text-[20px] leading-[1.3] mt-8 max-w-[400px]">
            Sign in to see your specimen history, your reorder shortlist, and the lot numbers of every package we&rsquo;ve
            shipped to you.
          </p>
        </div>
        <form
          onSubmit={(e) => { e.preventDefault(); if (email.trim()) onSignIn(email.trim()); }}
          className="col-span-12 md:col-span-6 md:col-start-7 bg-[rgb(var(--linen-mid)/0.45)] p-8 sm:p-12 self-start"
        >
          <p className="specimen-lot opacity-60">A-01 · SIGN IN</p>
          <label className="block mt-8">
            <span className="specimen-lot opacity-60">EMAIL OR PHONE</span>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="block w-full mt-2 px-0 py-2 border-0 border-b border-[rgb(var(--ink-black))] bg-transparent font-sans-text text-[17px] focus:outline-none focus:border-b-[1.5px] focus:border-[rgb(var(--saffron))] placeholder:text-[rgb(var(--charcoal-sub)/0.5)]"
            />
          </label>
          <button
            type="submit"
            className="block w-full mt-10 bg-[rgb(var(--ink-black))] text-[rgb(var(--cream-paper))] py-4 specimen-spec hover:bg-[rgb(var(--saffron))] hover:text-[rgb(var(--ink-black))] transition-colors"
          >
            SIGN IN · WE WILL SEND A CODE →
          </button>
          <p className="specimen-lot opacity-60 mt-6 leading-[1.5]">
            We do not ask for a password. We send a one-time code by SMS or email. No passwords means nothing to leak.
          </p>
        </form>
      </div>
    </section>
  );
}

function SignedIn({ member, onSignOut }: { member: Member; onSignOut: () => void }) {
  return (
    <>
      <section className="border-b border-[rgb(var(--ink-black)/0.6)] border-b-[0.5px]">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 pt-16 pb-12 grid grid-cols-12 gap-x-8 gap-y-6">
          <div className="col-span-12 md:col-span-4">
            <p className="specimen-lot opacity-60">A · ACCOUNT · {member.memberId}</p>
            <h1 className="font-serif-display text-[56px] leading-[1.02] tracking-[-0.025em] mt-3">
              Welcome back.
            </h1>
          </div>
          <div className="col-span-12 md:col-span-7 md:col-start-6 flex items-end mt-6 md:mt-0">
            <dl className="grid grid-cols-3 gap-x-6 w-full border-t border-[rgb(var(--ink-black)/0.6)] border-t-[0.5px] pt-6">
              <Stat label="Member" value={member.memberId} />
              <Stat label="Since" value={member.since} />
              <Stat label="Signed in as" value={member.email} mono />
            </dl>
          </div>
        </div>
      </section>

      <section className="border-b border-[rgb(var(--ink-black)/0.6)] border-b-[0.5px]">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 py-12 grid grid-cols-12 gap-x-8 gap-y-10">
          <PanelTile code="O-01" title="Orders" body="Every slip we&rsquo;ve packed for you, with lot numbers and delivery dates." cta="VIEW LEDGER →" />
          <PanelTile code="O-02" title="Addresses" body="The doorstep we usually deliver to. Add a second address if you split between Cairo and Zamalek." cta="MANAGE →" />
          <PanelTile code="O-03" title="Shortlist" body="Products you&rsquo;ve reordered more than twice. We&rsquo;ll WhatsApp you when a new lot ships." cta="VIEW →" />
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 py-12">
          <button
            onClick={onSignOut}
            className="specimen-lot opacity-60 hover:text-[rgb(var(--pomegranate))] hover:opacity-100 underline underline-offset-4 decoration-[0.5px]"
          >
            SIGN OUT OF {member.memberId}
          </button>
        </div>
      </section>
    </>
  );
}

function Stat({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex flex-col gap-1 min-w-0">
      <dt className="specimen-lot opacity-60">{label.toUpperCase()}</dt>
      <dd className={mono ? "specimen-spec truncate" : "font-serif-display text-[24px] leading-[1.1] tracking-[-0.005em]"}>{value}</dd>
    </div>
  );
}

function PanelTile({ code, title, body, cta }: { code: string; title: string; body: string; cta: string }) {
  return (
    <Link
      href="/account"
      className="col-span-12 md:col-span-4 bg-[rgb(var(--linen-mid)/0.45)] p-8 hover:bg-[rgb(var(--linen-mid)/0.7)] transition-colors no-underline block"
    >
      <p className="specimen-lot opacity-60">{code}</p>
      <h3 className="font-serif-display text-[32px] leading-[1.1] tracking-[-0.01em] mt-3" dangerouslySetInnerHTML={{ __html: title }} />
      <p className="font-sans-text text-[15px] leading-[1.55] mt-3 text-[rgb(var(--charcoal-sub))]" dangerouslySetInnerHTML={{ __html: body }} />
      <p className="specimen-spec mt-8">{cta}</p>
    </Link>
  );
}

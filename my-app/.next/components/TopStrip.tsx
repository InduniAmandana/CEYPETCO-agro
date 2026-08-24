"use client";

import { Clock, Mail } from "lucide-react";
import Link from "next/link";

export default function TopStrip() {
  return (
    <div className="w-full bg-cpcRed text-white text-sm">
      <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Mon – Sat&nbsp;&nbsp;<b>8:30 – 16:30</b></span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span>Email:&nbsp;
              <a className="underline underline-offset-2" href="mailto:secratariat@ceypetco.gov.lk">
                secratariat@ceypetco.gov.lk
              </a>
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3 opacity-95">
          <SocialIcon href="#" label="Facebook" />
          <SocialIcon href="#" label="LinkedIn" />
          <SocialIcon href="#" label="Twitter" />
          <SocialIcon href="#" label="YouTube" />
        </div>
      </div>
    </div>
  );
}

function SocialIcon({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="h-8 w-8 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 transition"
    >
      <span className="text-xs">{label[0]}</span>
    </Link>
  );
}

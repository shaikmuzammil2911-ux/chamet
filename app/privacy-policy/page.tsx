import React from "react";
import { Metadata } from "next";
import { GlassCard } from "@/components/ui/GlassCard";
import { COMPANY } from "@/data/company";
import { ShieldCheck, Lock, Eye, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | ManaVerse Technologies Pvt. Ltd.",
  description:
    "Privacy Policy for ManaVerse Technologies Pvt. Ltd. and the Chamet platform, detailing data collection, processing, and user protection standards.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-purple/20 border border-brand-purple/40 text-purple-200 text-xs font-bold mb-3 backdrop-blur-md">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Legal & Compliance</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm text-purple-200/80 mt-2">
          Effective Date: January 1, 2026 • Last Updated: 2026
        </p>
      </div>

      <GlassCard glowColor="purple" className="p-6 sm:p-10 space-y-8 text-sm sm:text-base leading-relaxed text-purple-100/90">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-brand-gold" />
            1. Introduction & Scope
          </h2>
          <p>
            ManaVerse Technologies Pvt. Ltd. (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), operating the brand identity Chamet, is committed to safeguarding the privacy and personal data of all users, broadcasters, creators, and visitors across our platforms.
          </p>
          <p>
            This Privacy Policy explains how we collect, use, disclose, and protect your information when you access our live streaming applications, interactive voice rooms, gaming spaces, and related websites.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Eye className="w-5 h-5 text-brand-pink" />
            2. Information We Collect
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-purple-200/90">
            <li>
              <strong>Account Information:</strong> Profile credentials, username, contact phone number, and optional avatar photographs.
            </li>
            <li>
              <strong>Host Verification & Payout Details:</strong> Government identity verification data (where required for host verification) and banking/payment credentials required for timely creator remuneration.
            </li>
            <li>
              <strong>Interactive Media Data:</strong> Live video and audio streams broadcast by hosts, chat interactions, and virtual gift exchanges.
            </li>
            <li>
              <strong>Technical & Device Data:</strong> IP addresses, operating system version, browser type, and diagnostic logs to ensure streaming latency optimization and prevent unauthorized access.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">
            3. Purpose of Processing & Use of Data
          </h2>
          <p>We process your data strictly to:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-purple-200/90">
            <li>Deliver low-latency live streaming and party room audio services.</li>
            <li>Calculate, verify, and disburse host reward earnings punctually.</li>
            <li>Enforce platform safety, prevent fraud, and moderate abusive or prohibited content.</li>
            <li>Provide 24/7 customer service and host assistance via WhatsApp and direct telephone.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">
            4. Host Safety & Moderation Policies
          </h2>
          <p>
            The safety of our hosts—especially women hosts and independent creators—is paramount. We deploy real-time AI computer vision moderation alongside 24/7 human review teams to identify and block instances of harassment, nudity, intimidation, or hate speech immediately.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">
            5. Data Protection & International Transfers
          </h2>
          <p>
            Your information is stored using industry-standard AES-256 encryption at rest and TLS 1.3 encryption in transit. As an international organization with registered offices in London, UK and Bengaluru, India, cross-border data transfers comply with international Standard Contractual Clauses (SCCs).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">
            6. Contacting Our Data Protection Officer
          </h2>
          <p>
            If you have inquiries regarding your personal data or wish to exercise your rights of rectification, erasure, or data portability, please reach out via phone at <strong className="text-brand-gold">{COMPANY.contact.phone}</strong> or our registered office at Velina Colony Street, Near Fashion Showroom, UK.
          </p>
        </section>
      </GlassCard>
    </div>
  );
}


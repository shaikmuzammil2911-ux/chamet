import React from "react";
import { Metadata } from "next";
import { GlassCard } from "@/components/ui/GlassCard";
import { COMPANY } from "@/data/company";
import { FileCheck, AlertTriangle, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions | ManaVerse Technologies Pvt. Ltd.",
  description:
    "Terms & Conditions governing the use of services, live streaming, host agreements, and digital items provided by ManaVerse Technologies Pvt. Ltd.",
};

export default function TermsPage() {
  return (
    <div className="pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-purple/20 border border-brand-purple/40 text-purple-200 text-xs font-bold mb-3 backdrop-blur-md">
          <FileCheck className="w-3.5 h-3.5 text-brand-gold" />
          <span>User & Host Agreement</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Terms & Conditions
        </h1>
        <p className="text-xs sm:text-sm text-purple-200/80 mt-2">
          Effective Date: January 1, 2026 • ManaVerse Technologies Pvt. Ltd.
        </p>
      </div>

      <GlassCard glowColor="purple" className="p-6 sm:p-10 space-y-8 text-sm sm:text-base leading-relaxed text-purple-100/90">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-gold" />
            1. Agreement to Terms
          </h2>
          <p>
            By accessing or utilizing any website, mobile software, live streaming service, audio party room, or game produced by ManaVerse Technologies Pvt. Ltd. (Chamet), you agree to be bound by these Terms and Conditions. If you do not agree, do not access the services.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">
            2. Age Requirement & Eligibility
          </h2>
          <p>
            You must be at least 18 years of age (or the age of legal majority in your jurisdiction) to register an account, broadcast as a live host, purchase virtual items, or withdraw creator earnings. Accounts found belonging to minors will be terminated immediately.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-brand-pink" />
            3. Community Guidelines & Prohibited Conduct
          </h2>
          <p>All users and hosts agree NOT to engage in:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-purple-200/90">
            <li>Nudity, sexual solicitations, or pornographic broadcasting.</li>
            <li>Harassment, stalking, abusive language, or discrimination.</li>
            <li>Financial fraud, stolen payment cards, or unauthorized chargebacks.</li>
            <li>Automated bot traffic, reverse engineering, or exploiting system bugs.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">
            4. Host Opportunities & Payout Policies
          </h2>
          <p>
            ManaVerse provides platforms through which hosts and creators can earn income based on audience engagement, gift appreciation, and interactive sessions. While we strive to provide reliable and stable payout infrastructure, earnings depend on individual creator activity and talent, and we do not guarantee specific financial results or predetermined income.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">
            5. Intellectual Property
          </h2>
          <p>
            All trademarks, logos (including the Chamet badge and ManaVerse name), graphics, audio assets, and source code are the proprietary intellectual property of ManaVerse Technologies Pvt. Ltd.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">
            6. Governing Law & Dispute Resolution
          </h2>
          <p>
            These terms are governed in accordance with applicable laws. Inquiries and legal notices may be directed to our registered offices in London, UK or Bengaluru, India, or by calling <strong className="text-brand-gold">{COMPANY.contact.phone}</strong>.
          </p>
        </section>
      </GlassCard>
    </div>
  );
}

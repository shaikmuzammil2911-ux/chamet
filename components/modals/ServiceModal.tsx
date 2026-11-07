"use client";

import React from "react";
import Link from "next/link";
import { ServiceItem } from "@/data/services";
import { ModalBackdrop } from "./ModalBackdrop";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, ArrowRight, Sparkles, ExternalLink } from "lucide-react";

interface ServiceModalProps {
  service: ServiceItem | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenInquiry?: () => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  service,
  isOpen,
  onClose,
  onOpenInquiry,
}) => {
  if (!service) return null;

  return (
    <ModalBackdrop
      isOpen={isOpen}
      onClose={onClose}
      title={service.title}
      badge={service.badge}
      maxWidth="3xl"
    >
      <div className="space-y-6">
        {/* Tagline & Overview */}
        <div>
          <h4 className="text-lg font-semibold text-brand-gold mb-2 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-gold" />
            {service.tagline}
          </h4>
          <p className="text-purple-100/90 leading-relaxed text-sm sm:text-base">
            {service.fullDesc}
          </p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-center">
          {service.stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-lg sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-brand-gold">
                {stat.value}
              </span>
              <span className="text-[11px] sm:text-xs text-purple-300/70 font-medium mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Features & Benefits Two-Column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Key Features */}
          <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/20">
            <h5 className="text-sm font-bold uppercase tracking-wider text-purple-200 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-pink" />
              Core Capabilities
            </h5>
            <ul className="space-y-2.5">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-purple-100/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white font-medium">{feature.title}: </strong>
                    <span>{feature.description}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Benefits */}
          <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/20">
            <h5 className="text-sm font-bold uppercase tracking-wider text-purple-200 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-gold" />
              Host & User Benefits
            </h5>
            <ul className="space-y-2.5">
              {service.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-purple-100/80">
                  <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white font-medium">{benefit.title}: </strong>
                    <span>{benefit.description}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/10">
          <Link
            href={`/services/${service.slug}`}
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-purple-200 hover:text-white underline underline-offset-4 transition-colors order-2 sm:order-1"
          >
            <span>View dedicated page for {service.title}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <div className="flex items-center gap-2 w-full sm:w-auto order-1 sm:order-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="flex-1 sm:flex-initial"
            >
              Close
            </Button>
            {onOpenInquiry ? (
              <Button
                variant="gold"
                size="sm"
                onClick={() => {
                  onClose();
                  onOpenInquiry();
                }}
                withArrow
                className="flex-1 sm:flex-initial"
              >
                Inquire Now
              </Button>
            ) : (
              <Button
                variant="gold"
                size="sm"
                href="/contact"
                onClick={onClose}
                withArrow
                className="flex-1 sm:flex-initial"
              >
                Inquire Now
              </Button>
            )}
          </div>
        </div>
      </div>
    </ModalBackdrop>
  );
};


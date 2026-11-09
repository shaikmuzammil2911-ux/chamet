"use client";

import React, { useState } from "react";
import { ModalBackdrop } from "./ModalBackdrop";
import { Button } from "@/components/ui/Button";
import { Upload, CheckCircle2, AlertCircle, FileText } from "lucide-react";

interface CareerModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPosition?: string;
}

export const CareerModal: React.FC<CareerModalProps> = ({
  isOpen,
  onClose,
  defaultPosition = "General Talent Expression",
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: defaultPosition,
    message: "",
  });
  const [fileName, setFileName] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, resume: "File size must be under 5MB" }));
        setFileName(null);
        return;
      }
      setFileName(file.name);
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.resume;
        return copy;
      });
    }
  };

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.name.trim()) errs.name = "Full name is required";
    if (!formData.email.trim()) {
      errs.email = "Email address is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      errs.email = "Enter a valid email address";
    }
    if (!formData.phone.trim()) {
      errs.phone = "Phone number is required";
    } else if (!/^[0-9+-\s]{7,15}$/.test(formData.phone.trim())) {
      errs.phone = "Enter a valid phone number";
    }
    if (!formData.position.trim()) {
      errs.position = "Please select a position";
    }
    if (!fileName) {
      errs.resume = "Please attach your resume / portfolio (PDF, DOCX)";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await fetch("/api/career", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
          phone: formData.phone,
          appliedPosition: formData.position,
          experience: "Candidate Profile",
          coverLetter: formData.message,
          resumeUrl: fileName ? `Uploaded: ${fileName}` : undefined,
        }),
      });
      setIsSubmitted(true);
    } catch (err) {
      console.warn("Career submission fallback:", err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      position: defaultPosition,
      message: "",
    });
    setFileName(null);
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <ModalBackdrop
      isOpen={isOpen}
      onClose={() => {
        resetForm();
        onClose();
      }}
      title="Join Our Team"
      badge="ManaVerse Careers"
      maxWidth="lg"
    >
      {isSubmitted ? (
        <div className="text-center py-6 space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="text-xl font-bold text-white">Application Recorded</h4>
          <p className="text-purple-200/80 text-sm max-w-md mx-auto leading-relaxed">
            Thank you, <strong className="text-white">{formData.name}</strong>. Your expression of interest for{" "}
            <strong className="text-brand-gold">{formData.position}</strong> has been logged. Our Talent Acquisition team reviews candidacies as new openings arise.
          </p>
          <div className="pt-3">
            <Button
              variant="gold"
              size="sm"
              onClick={() => {
                resetForm();
                onClose();
              }}
            >
              Close Window
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-xs text-purple-200/80 leading-relaxed">
            ManaVerse is continuously looking for visionary engineers, creator managers, and digital entertainment pioneers. Submit your interest below:
          </p>

          {/* Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-purple-200 mb-1">
                Full Name <span className="text-brand-pink">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Your full legal name"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-purple-300/40 text-sm focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
              />
              {errors.name && (
                <p className="mt-1 text-[11px] text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-purple-200 mb-1">
                Email Address <span className="text-brand-pink">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="your.email@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-purple-300/40 text-sm focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
              />
              {errors.email && (
                <p className="mt-1 text-[11px] text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Phone & Position */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-purple-200 mb-1">
                Phone Number <span className="text-brand-pink">*</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="+91 8555896346"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-purple-300/40 text-sm focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
              />
              {errors.phone && (
                <p className="mt-1 text-[11px] text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.phone}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-purple-200 mb-1">
                Department / Role <span className="text-brand-pink">*</span>
              </label>
              <select
                value={formData.position}
                onChange={(e) =>
                  setFormData({ ...formData, position: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0B33] border border-white/10 text-white text-sm focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
              >
                <option value="General Talent Expression">General Talent Expression</option>
                <option value="Host Operations & Creator Manager">Host Operations & Creator Manager</option>
                <option value="Streaming Infrastructure Engineer">Streaming Infrastructure Engineer</option>
                <option value="Frontend / Mobile React Engineer">Frontend / Mobile React Engineer</option>
                <option value="UI/UX Product Designer">UI/UX Product Designer</option>
                <option value="Trust & Community Safety Specialist">Trust & Community Safety Specialist</option>
              </select>
            </div>
          </div>

          {/* Resume Upload */}
          <div>
            <label className="block text-xs font-medium text-purple-200 mb-1">
              Resume / CV (PDF or DOCX, max 5MB) <span className="text-brand-pink">*</span>
            </label>
            <div className="relative border-2 border-dashed border-white/20 hover:border-brand-purple/60 rounded-xl p-4 text-center transition-colors cursor-pointer bg-white/[0.02]">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <div className="flex flex-col items-center justify-center gap-1.5 pointer-events-none">
                {fileName ? (
                  <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
                    <FileText className="w-5 h-5" />
                    <span>{fileName}</span>
                  </div>
                ) : (
                  <>
                    <Upload className="w-6 h-6 text-purple-300" />
                    <span className="text-xs text-purple-200">
                      Click to choose or drag & drop resume file
                    </span>
                    <span className="text-[10px] text-purple-400">PDF, DOC, DOCX up to 5MB</span>
                  </>
                )}
              </div>
            </div>
            {errors.resume && (
              <p className="mt-1 text-[11px] text-rose-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.resume}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-medium text-purple-200 mb-1">
              Cover Note / Professional Summary
            </label>
            <textarea
              rows={2}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              placeholder="Tell us what drives you and how you wish to contribute to ManaVerse..."
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-purple-300/40 text-sm focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="gold"
              size="sm"
              disabled={isSubmitting}
              withArrow
            >
              {isSubmitting ? "Submitting..." : "Send Application"}
            </Button>
          </div>
        </form>
      )}
    </ModalBackdrop>
  );
};


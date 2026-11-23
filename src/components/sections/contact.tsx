"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, MapPin, Send, Loader2, CheckCircle } from "lucide-react";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { SiLeetcode, SiGeeksforgeeks } from "react-icons/si";
import { useTheme } from "@/components/theme-provider";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name.";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Please enter a message.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        }),
      });
    } catch (err) {
      console.warn("Contact API sync note:", err);
    }

    const subject = encodeURIComponent(
      `Portfolio Inquiry from ${formData.name.trim()}`
    );
    const body = encodeURIComponent(
      `Hi Prem,\n\nName: ${formData.name.trim()}\nEmail: ${formData.email.trim()}\n\nMessage:\n${formData.message.trim()}`
    );

    setTimeout(() => {
      window.location.href = `mailto:kumarmehta7370@gmail.com?subject=${subject}&body=${body}`;
      setLoading(false);
      setSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    }, 500);
  };

  const socialLinks = [
    { icon: FaGithub, href: "https://github.com/premkr7370", label: "GitHub", lightColor: "#333333", darkColor: "#E6EDF3" },
    { icon: FaLinkedinIn, href: "https://www.linkedin.com/in/prem-kumar-079100244/", label: "LinkedIn", lightColor: "#0A66C2", darkColor: "#0A66C2" },
    { icon: SiLeetcode, href: "https://leetcode.com/u/averageCoder7370/", label: "LeetCode", lightColor: "#FFA116", darkColor: "#FFA116" },
    { icon: SiGeeksforgeeks, href: "https://www.geeksforgeeks.org/profile/premkrma", label: "GFG", lightColor: "#2F8D46", darkColor: "#2F8D46" },
  ];

  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section id="contact" className="section-padding relative scroll-mt-28">
      {/* Background radial glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[200px] opacity-[0.08]"
        style={{
          background:
            "radial-gradient(circle, #7B2FF7 0%, #BDF2D5 50%, transparent 80%)",
        }}
      />

      <div className="section-container relative" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <span
            className="text-purple text-[14px] font-semibold uppercase tracking-[0.2em] block mb-4"
          >
            Get in touch
          </span>
          <h2 className="mb-6">
            Let&apos;s Build{" "}
            <span className="gradient-text">Something Amazing</span>
          </h2>
          <div className="w-[80px] h-[3px] bg-gradient-to-r from-purple to-mint rounded-full mx-auto" />
        </motion.div>

        {/* Equalized 2-column Grid with items-stretch */}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch max-w-5xl mx-auto gap-9 lg:gap-12">
          {/* Left Column - Contact Information — NO PHONE */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="neon-border rounded-[30px] p-7 sm:p-10 md:p-12 bg-dark-card border border-dark-border shadow-md flex flex-col justify-between h-full"
          >
            <div>
              <h3 className="text-[24px] sm:text-[26px] font-bold text-dark-text mb-4">
                Let&apos;s Connect & Collaborate
              </h3>
              <p className="text-dark-text-secondary text-[15.5px] sm:text-[16.5px] leading-[1.8] mb-9">
                I&apos;m always enthusiastic about discussing new opportunities,
                collaborative projects, tech stacks, or engineering scalable
                solutions. Drop a line and let&apos;s talk!
              </p>

              {/* Contact Details — Email & Location only */}
              <div className="flex flex-col gap-4.5 mb-9">
                {/* Email */}
                <motion.a
                  href="mailto:kumarmehta7370@gmail.com"
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4.5 p-4.5 sm:p-5.5 rounded-2xl bg-dark-bg border border-dark-border hover:border-purple/40 shadow-xs transition-all duration-300 group"
                >
                  <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-purple/10 group-hover:bg-purple/20 flex items-center justify-center text-purple transition-all duration-300 shrink-0 p-3">
                    <Mail size={24} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[12px] text-dark-text-muted uppercase tracking-wider font-semibold mb-1">
                      Email
                    </p>
                    <p className="text-[15.5px] sm:text-[16.5px] font-semibold text-dark-text group-hover:text-purple transition-colors break-all">
                      kumarmehta7370@gmail.com
                    </p>
                  </div>
                </motion.a>

                {/* Location */}
                <div className="flex items-center gap-4.5 p-4.5 sm:p-5.5 rounded-2xl bg-dark-bg border border-dark-border shadow-xs group">
                  <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-purple/10 flex items-center justify-center text-purple shrink-0 p-3">
                    <MapPin size={24} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[12px] text-dark-text-muted uppercase tracking-wider font-semibold mb-1">
                      Location
                    </p>
                    <p className="text-[15.5px] sm:text-[16.5px] font-semibold text-dark-text">
                      Bangalore, India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-7 border-t border-dark-border/60 mt-auto">
              <p className="text-[12.5px] font-semibold uppercase tracking-wider text-dark-text-muted mb-4">
                Find Me On
              </p>
              <div className="flex flex-wrap gap-3.5">
                {socialLinks.map((social, i) => {
                  const hoverColor = isDark ? social.darkColor : social.lightColor;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 15 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.4 + i * 0.08 }}
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 sm:w-13 sm:h-13 rounded-xl bg-dark-bg border border-dark-border flex items-center justify-center text-dark-text-muted hover:text-purple shadow-xs transition-all duration-300"
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.color = hoverColor;
                        (e.currentTarget as HTMLElement).style.borderColor = `${hoverColor}50`;
                        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 15px ${hoverColor}25`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.color = "";
                        (e.currentTarget as HTMLElement).style.borderColor = "";
                        (e.currentTarget as HTMLElement).style.boxShadow = "";
                      }}
                      aria-label={social.label}
                    >
                      <social.icon size={20} />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="neon-border rounded-[30px] p-7 sm:p-10 md:p-12 bg-dark-card border border-dark-border shadow-md relative flex flex-col justify-between h-full"
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col justify-between h-full gap-6"
            >
              <div className="flex flex-col gap-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-[14px] font-semibold text-dark-text mb-2.5"
                  >
                    Your Name <span className="text-purple">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: undefined });
                    }}
                    className={`input-field w-full ${errors.name ? "border-error focus:border-error" : ""}`}
                    placeholder="John Doe"
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && <p className="text-xs text-error mt-2 font-medium">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-[14px] font-semibold text-dark-text mb-2.5"
                  >
                    Email Address <span className="text-purple">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }}
                    className={`input-field w-full ${errors.email ? "border-error focus:border-error" : ""}`}
                    placeholder="john@example.com"
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && <p className="text-xs text-error mt-2 font-medium">{errors.email}</p>}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-[14px] font-semibold text-dark-text mb-2.5"
                  >
                    Message <span className="text-purple">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: undefined });
                    }}
                    className={`input-field w-full resize-none ${errors.message ? "border-error focus:border-error" : ""}`}
                    placeholder="Tell me about your project, ideas, or opportunities..."
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && <p className="text-xs text-error mt-2 font-medium">{errors.message}</p>}
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary w-full justify-center shadow-md font-semibold h-[54px] sm:h-[56px] mt-3"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Preparing Mail Client...</span>
                  </>
                ) : success ? (
                  <>
                    <CheckCircle size={18} />
                    <span>Mail Client Opened!</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

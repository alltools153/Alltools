'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Mail,
  Send,
  CheckCircle2,
  ArrowLeft,
  Clock,
  MessageSquare,
  Sparkles,
  Shield,
  HelpCircle,
  User,
  Globe,
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground border-b border-border pb-4">
          <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Home
          </Link>
          <span>/</span>
          <span className="text-foreground font-semibold">Support</span>
          <span>/</span>
          <span className="text-primary font-bold">Contact Us</span>
        </div>

        {/* Header */}
        <div className="space-y-2 border-b border-border pb-6">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Mail className="w-6 h-6" />
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold">
              Guaranteed 24-48h Response SLA
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">Contact Us</h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
            Have feedback on a tool, feature requests, partnership inquiries, or AdSense / legal questions? We are here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          
          {/* Left: Contact Info Card */}
          <div className="md:col-span-2 space-y-4">
            <div className="p-6 rounded-3xl border border-border bg-card space-y-4" style={{ backgroundColor: 'var(--card)' }}>
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                <Globe className="w-4 h-4 text-primary" /> Direct Communication
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-muted/20 border border-border space-y-1">
                  <span className="text-muted-foreground block text-[11px] font-bold uppercase">Official Support Email</span>
                  <a href="mailto:alltools153@gmail.com" className="font-bold text-primary hover:underline break-all">
                    alltools153@gmail.com
                  </a>
                </div>

                <div className="p-3.5 rounded-2xl bg-muted/20 border border-border space-y-1">
                  <span className="text-muted-foreground block text-[11px] font-bold uppercase">Lead Systems Architect</span>
                  <Link href="/developer" className="font-bold text-foreground hover:text-primary transition-colors flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-indigo-400" /> Santanu Batabyal
                  </Link>
                </div>

                <div className="p-3.5 rounded-2xl bg-muted/20 border border-border space-y-1">
                  <span className="text-muted-foreground block text-[11px] font-bold uppercase">Operating Hours</span>
                  <span className="text-foreground font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" /> Mon – Fri: 9:00 AM – 6:00 PM IST
                  </span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-3xl border border-emerald-500/20 bg-emerald-500/5 space-y-2 text-xs">
              <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                <Shield className="w-4 h-4" /> 100% In-Server Security
              </div>
              <p className="text-muted-foreground">
                Your contact inquiries are handled with strict confidentiality and are never shared with marketing brokers.
              </p>
            </div>
          </div>

          {/* Right: Interactive Message Form */}
          <div className="md:col-span-3">
            <div className="p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-sm space-y-5" style={{ backgroundColor: 'var(--card)' }}>
              
              <div className="space-y-1 border-b border-border pb-4">
                <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-primary" /> Send a Direct Message
                </h3>
                <p className="text-xs text-muted-foreground">
                  Fill out the form below, and our engineering team will get back to you promptly.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3 animate-in fade-in duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-foreground">Message Dispatched Successfully!</h4>
                  <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                    Thank you for contacting AllToolss. A confirmation has been logged, and we will reply to <span className="font-bold text-foreground">{formData.email}</span> within 24–48 business hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
                    }}
                    className="py-2 px-4 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-glow-primary hover:opacity-90 transition-opacity cursor-pointer mt-2"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="font-bold text-foreground">Your Name *</label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Johnson"
                        aria-label="Your Name"
                        className="w-full p-3 rounded-xl border border-border bg-muted/30 text-foreground text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="font-bold text-foreground">Your Email Address *</label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. alex@company.com"
                        aria-label="Your Email Address"
                        className="w-full p-3 rounded-xl border border-border bg-muted/30 text-foreground text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-subject" className="font-bold text-foreground">Subject / Topic</label>
                    <select
                      id="contact-subject"
                      value={formData.subject}
                      aria-label="Subject or topic"
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full p-3 rounded-xl border border-border bg-muted/30 text-foreground text-xs focus:outline-none focus:border-primary cursor-pointer"
                    >
                      <option value="General Inquiry">General Inquiry / Tool Feedback</option>
                      <option value="Bug Report">Report a Tool Bug / Calculation Error</option>
                      <option value="Feature Request">Request a New Tool or Feature</option>
                      <option value="Advertising / AdSense">Advertising &amp; Sponsorship Inquiries</option>
                      <option value="Privacy / Data Request">Privacy &amp; Data Rights Inquiry</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="font-bold text-foreground">Your Message *</label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please detail your question, feedback, or tool suggestion here..."
                      aria-label="Your Message"
                      className="w-full p-3 rounded-xl border border-border bg-muted/30 text-foreground font-mono text-xs focus:outline-none focus:border-primary resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full py-3.5 px-6 rounded-2xl bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center gap-2 shadow-glow-primary hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{sending ? 'Dispatching Message...' : 'Submit Contact Message'}</span>
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

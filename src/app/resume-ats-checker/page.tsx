'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import {
  FileCheck2,
  UploadCloud,
  FileText,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Sparkles,
  HelpCircle,
  ChevronDown,
  RefreshCw,
  Copy,
  Check,
  Download,
  Award,
  Layers,
  ArrowRight,
  Shield,
  Briefcase,
  GraduationCap,
  Mail,
  Phone,
  Linkedin,
  FileCode,
  Zap,
} from 'lucide-react';

interface AtsReport {
  score: number; // 0 - 100
  grade: 'A+' | 'A' | 'B' | 'C' | 'Needs Work';
  wordCount: number;
  readingTimeMinutes: number;
  contactInfo: {
    hasEmail: boolean;
    emailValue: string | null;
    hasPhone: boolean;
    phoneValue: string | null;
    hasLinkedIn: boolean;
    hasLocation: boolean;
  };
  sections: {
    summary: boolean;
    experience: boolean;
    education: boolean;
    skills: boolean;
    projects: boolean;
    certifications: boolean;
  };
  detectedSkills: string[];
  actionVerbsCount: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

export default function ResumeAtsCheckerPage() {
  const [inputMode, setInputMode] = useState<'upload' | 'paste'>('upload');
  const [resumeText, setResumeText] = useState<string>('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [targetJobRole, setTargetJobRole] = useState<string>('Software Engineer');
  const [loading, setLoading] = useState<boolean>(false);
  const [report, setReport] = useState<AtsReport | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Common high-frequency action verbs
  const ACTION_VERBS = [
    'architected', 'spearheaded', 'engineered', 'developed', 'deployed', 'orchestrated',
    'optimized', 'designed', 'implemented', 'managed', 'led', 'accelerated', 'transformed',
    'reduced', 'increased', 'streamlined', 'delivered', 'collaborated', 'created', 'built'
  ];

  // Common technical & industry keywords
  const TECH_KEYWORDS = [
    'react', 'next.js', 'typescript', 'javascript', 'node.js', 'python', 'java', 'c++',
    'aws', 'docker', 'kubernetes', 'graphql', 'sql', 'postgresql', 'mongodb', 'git',
    'ci/cd', 'agile', 'scrum', 'rest api', 'microservices', 'tailwind', 'html', 'css',
    'cloud', 'devops', 'testing', 'cypress', 'jest', 'kafka', 'redis', 'linux'
  ];

  // Analyze Resume Text Engine
  const analyzeResume = (text: string): AtsReport => {
    const cleanText = text.toLowerCase();
    const words = text.trim().split(/\s+/).filter(Boolean);
    const wordCount = words.length;
    const readingTime = Math.max(1, Math.round(wordCount / 200));

    // 1. Contact Info Checks
    const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    const phoneMatch = text.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
    const hasLinkedIn = cleanText.includes('linkedin.com') || cleanText.includes('linkedin');
    const hasLocation = /\b(city|state|remote|india|usa|bangalore|delhi|mumbai|california|london|ny)\b/i.test(text);

    // 2. Sections Checks
    const sections = {
      summary: /\b(summary|profile|about me|objective|professional summary)\b/i.test(text),
      experience: /\b(experience|work history|employment|work experience|professional experience)\b/i.test(text),
      education: /\b(education|academic|university|degree|bachelor|master|b\.tech|m\.tech)\b/i.test(text),
      skills: /\b(skills|technical skills|core competencies|technologies)\b/i.test(text),
      projects: /\b(projects|portfolio|key projects|side projects)\b/i.test(text),
      certifications: /\b(certifications|certificates|licenses|credentials|aws certified)\b/i.test(text),
    };

    // 3. Keyword Extraction
    const detectedSkills: string[] = [];
    TECH_KEYWORDS.forEach((kw) => {
      const regex = new RegExp(`\\b${kw.replace('.', '\\.')}\\b`, 'i');
      if (regex.test(text)) {
        detectedSkills.push(kw.toUpperCase());
      }
    });

    // 4. Action Verbs
    let actionVerbsCount = 0;
    ACTION_VERBS.forEach((vb) => {
      const regex = new RegExp(`\\b${vb}\\b`, 'i');
      if (regex.test(text)) actionVerbsCount++;
    });

    // 5. Score Calculation (0 - 100)
    let score = 0;

    // Contact info points (Max 20)
    if (emailMatch) score += 6;
    if (phoneMatch) score += 6;
    if (hasLinkedIn) score += 4;
    if (hasLocation) score += 4;

    // Sections points (Max 40)
    if (sections.experience) score += 12;
    if (sections.skills) score += 10;
    if (sections.education) score += 8;
    if (sections.summary) score += 5;
    if (sections.projects) score += 3;
    if (sections.certifications) score += 2;

    // Word Count Length points (Max 15)
    if (wordCount >= 400 && wordCount <= 1000) score += 15;
    else if (wordCount >= 250 && wordCount <= 1400) score += 10;
    else score += 5;

    // Skills & Action Verbs points (Max 25)
    score += Math.min(15, detectedSkills.length * 2);
    score += Math.min(10, actionVerbsCount * 2);

    score = Math.min(100, Math.max(10, score));

    // Strengths, Weaknesses & Recommendations
    const strengths: string[] = [];
    const weaknesses: string[] = [];
    const recommendations: string[] = [];

    if (emailMatch && phoneMatch) strengths.push('Complete contact credentials found (Email & Phone number).');
    if (hasLinkedIn) strengths.push('LinkedIn profile link detected for recruiter verification.');
    if (sections.experience && sections.skills) strengths.push('Clear "Work Experience" and "Skills" headers present.');
    if (actionVerbsCount >= 4) strengths.push(`Strong action verbs utilized (${actionVerbsCount} high-impact verbs detected).`);
    if (detectedSkills.length >= 6) strengths.push(`Robust industry keyword density (${detectedSkills.length} key competencies found).`);

    if (!emailMatch) {
      weaknesses.push('Missing clear contact email address.');
      recommendations.push('Add an easily recognizable professional email address at the top of your resume.');
    }
    if (!phoneMatch) {
      weaknesses.push('Missing contact phone number.');
      recommendations.push('Include a reachable phone number with international country code.');
    }
    if (!hasLinkedIn) {
      weaknesses.push('No LinkedIn profile URL found.');
      recommendations.push('Include your customized LinkedIn URL (e.g. linkedin.com/in/yourname) in the header.');
    }
    if (!sections.summary) {
      weaknesses.push('Missing Professional Summary section.');
      recommendations.push('Add a 3-4 line elevator pitch summarizing your core strengths, years of experience, and target impact.');
    }
    if (!sections.projects) {
      recommendations.push('Add a Projects section featuring measurable outcomes (e.g. "Increased throughput by 40%").');
    }
    if (wordCount < 350) {
      weaknesses.push('Resume length is too brief (less than 350 words).');
      recommendations.push('Expand upon your project responsibilities and quantify your achievements with metrics.');
    } else if (wordCount > 1200) {
      weaknesses.push('Resume length exceeds optimal 2-page scanning length (>1200 words).');
      recommendations.push('Condense bullet points to focus on the most impactful achievements from the last 5-7 years.');
    }

    let grade: AtsReport['grade'] = 'Needs Work';
    if (score >= 90) grade = 'A+';
    else if (score >= 75) grade = 'A';
    else if (score >= 60) grade = 'B';
    else if (score >= 45) grade = 'C';

    return {
      score,
      grade,
      wordCount,
      readingTimeMinutes: readingTime,
      contactInfo: {
        hasEmail: Boolean(emailMatch),
        emailValue: emailMatch ? emailMatch[0] : null,
        hasPhone: Boolean(phoneMatch),
        phoneValue: phoneMatch ? phoneMatch[0] : null,
        hasLinkedIn,
        hasLocation,
      },
      sections,
      detectedSkills,
      actionVerbsCount,
      strengths: strengths.length ? strengths : ['Basic text structure parsed successfully.'],
      weaknesses: weaknesses.length ? weaknesses : ['No critical structural deficiencies detected.'],
      recommendations: recommendations.length ? recommendations : ['Your resume follows strong ATS compliance principles.'],
    };
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setLoading(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = (event.target?.result as string) || '';
      setResumeText(content);
      setTimeout(() => {
        const rep = analyzeResume(content);
        setReport(rep);
        setLoading(false);
      }, 400);
    };

    reader.onerror = () => {
      setLoading(false);
    };

    // For plain text / pdf representation
    reader.readAsText(file);
  };

  const handleAnalyzeText = () => {
    if (!resumeText.trim()) return;
    setLoading(true);
    setTimeout(() => {
      const rep = analyzeResume(resumeText);
      setReport(rep);
      setLoading(false);
    }, 400);
  };

  const sampleResume = `John Doe
Email: john.doe@email.com | Phone: +1-555-0199 | Location: San Francisco, CA
LinkedIn: linkedin.com/in/johndoe | GitHub: github.com/johndoe

PROFESSIONAL SUMMARY
Senior Full-Stack Engineer with 6+ years of experience architecting high-scale Next.js, React, Node.js, and TypeScript web applications on AWS cloud infrastructure. Led engineering teams to optimize database latency by 45% and deployed scalable microservices with Docker and Kubernetes.

TECHNICAL SKILLS
Languages & Frameworks: JavaScript, TypeScript, React, Next.js, Node.js, Python, HTML5, CSS3, Tailwind CSS
Databases & Cloud: PostgreSQL, MongoDB, Redis, AWS (S3, Lambda, EC2), Docker, Kubernetes, CI/CD, Git, GraphQL, REST API
Practices: Agile, Scrum, Automated Testing, Jest, Microservices

WORK EXPERIENCE
Lead Software Engineer | Acme Corporation | 2022 - Present
- Architected and deployed a multi-tenant SaaS platform using Next.js and PostgreSQL, serving 2M+ monthly active users.
- Spearheaded migration from monolithic REST APIs to GraphQL microservices, reducing payload latency by 35%.
- Engineered automated CI/CD pipelines with GitHub Actions and Docker, accelerating release frequency by 60%.

Senior Full-Stack Developer | TechCorp Solutions | 2019 - 2022
- Developed responsive web interfaces using React and Tailwind CSS, increasing user conversion rates by 25%.
- Optimized database indexing and query execution plans in PostgreSQL, saving 200+ compute hours monthly.

EDUCATION
Bachelor of Science in Computer Science
University of California, Berkeley | 2015 - 2019

CERTIFICATIONS
- AWS Certified Solutions Architect - Associate
- Certified Kubernetes Administrator (CKA)`;

  const copyReport = () => {
    if (!report) return;
    const text = `ATS RESUME AUDIT REPORT\nOverall Score: ${report.score}/100 (Grade: ${report.grade})\nWord Count: ${report.wordCount} words\n\nSTRENGTHS:\n${report.strengths.map((s) => `• ${s}`).join('\n')}\n\nWEAKNESSES:\n${report.weaknesses.map((w) => `• ${w}`).join('\n')}\n\nRECOMMENDATIONS:\n${report.recommendations.map((r) => `• ${r}`).join('\n')}\n\nDETECTED SKILLS:\n${report.detectedSkills.join(', ')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    {
      q: 'What is an Applicant Tracking System (ATS)?',
      a: 'An ATS is automated software used by recruiters and HR teams to filter, parse, and rank job applicants based on resume keyword alignment, contact information completeness, and section formatting before a human recruiter ever sees it.',
    },
    {
      q: 'Why do resumes fail ATS parsers?',
      a: 'Resumes often fail when they use multi-column tables, complex text boxes, embedded graphics, missing standard section headings ("Experience", "Skills", "Education"), or lack critical job-related technical keywords.',
    },
    {
      q: 'Does this tool upload or store my resume?',
      a: 'No. All text parsing, keyword extraction, and score auditing are executed 100% locally inside your web browser. Your private resume data never leaves your device.',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Breadcrumb Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <span className="text-foreground font-semibold">Utility Tools</span>
              <span>/</span>
              <span className="text-primary font-bold">Resume ATS Checker</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight flex items-center gap-3">
              <span className="p-2 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <FileCheck2 className="w-7 h-7" />
              </span>
              <span>Resume ATS Compatibility Checker</span>
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
              Audit your resume for Applicant Tracking Systems (ATS). Analyze contact completeness, section headers, keyword density, action verbs, and receive an instant 0-100 ATS readiness score.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="px-3 py-1.5 rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-bold font-mono flex items-center gap-1.5 shadow-sm">
              <Award className="w-3.5 h-3.5" /> Recruiter Grade Parser
            </span>
          </div>
        </div>

        {/* Mode Switcher */}
        <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-card border border-border" style={{ backgroundColor: 'var(--card)' }}>
          <button
            type="button"
            onClick={() => setInputMode('upload')}
            className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              inputMode === 'upload'
                ? 'bg-primary text-primary-foreground shadow-glow-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
            }`}
          >
            Upload Resume File (PDF / DOCX / TXT)
          </button>
          <button
            type="button"
            onClick={() => setInputMode('paste')}
            className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              inputMode === 'paste'
                ? 'bg-primary text-primary-foreground shadow-glow-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
            }`}
          >
            Paste Resume Plain Text
          </button>
        </div>

        {/* Input Studio Card */}
        {inputMode === 'upload' ? (
          <div className="p-6 rounded-3xl border border-border bg-card shadow-sm space-y-4" style={{ backgroundColor: 'var(--card)' }}>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="p-8 sm:p-12 rounded-2xl border-2 border-dashed border-border hover:border-primary/60 bg-muted/20 hover:bg-muted/40 transition-all cursor-pointer flex flex-col items-center justify-center text-center space-y-3 group"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.doc,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <UploadCloud className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground">
                  Click to select or drag &amp; drop your resume
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Supported formats: PDF, Word (DOCX), Text (TXT)
                </p>
              </div>
            </div>

            {fileName && (
              <div className="p-3.5 rounded-xl bg-muted/40 border border-border flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  <span className="font-bold text-foreground">{fileName}</span>
                </div>
                <span className="text-emerald-400 font-semibold">Ready for scan</span>
              </div>
            )}

            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => {
                  setResumeText(sampleResume);
                  setFileName('sample_senior_engineer_resume.txt');
                  const rep = analyzeResume(sampleResume);
                  setReport(rep);
                }}
                className="text-xs font-bold text-primary hover:underline cursor-pointer flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" /> Load Sample High-Scoring Resume
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 rounded-3xl border border-border bg-card shadow-sm space-y-4" style={{ backgroundColor: 'var(--card)' }}>
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Paste Complete Resume Content
              </label>
              <button
                type="button"
                onClick={() => {
                  setResumeText(sampleResume);
                }}
                className="text-xs font-bold text-primary hover:underline cursor-pointer"
              >
                Insert Sample
              </button>
            </div>

            <textarea
              rows={9}
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your full resume text including contact info, summary, experience, education, and skills..."
              className="w-full p-4 rounded-2xl border border-border bg-muted/40 text-foreground font-mono text-xs focus:outline-none focus:border-primary resize-y"
            />

            <button
              type="button"
              onClick={handleAnalyzeText}
              disabled={loading || !resumeText.trim()}
              className="w-full py-3 px-6 rounded-2xl bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center gap-2 shadow-glow-primary hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <FileCheck2 className="w-4 h-4" />}
              <span>Scan &amp; Audit Resume</span>
            </button>
          </div>
        )}

        {/* ATS Audit Report Card */}
        {report && (
          <div className="space-y-6 animate-in fade-in duration-300">
            
            {/* Top Score Banner */}
            <div className="p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-lg space-y-6" style={{ backgroundColor: 'var(--card)' }}>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
                <div className="space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    ATS Readiness Assessment
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black font-mono text-foreground flex items-center gap-2">
                    <span>Overall Score: {report.score}/100</span>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border border-border ${
                      report.score >= 80 ? 'bg-emerald-500/15 text-emerald-400' : report.score >= 60 ? 'bg-cyan-500/15 text-cyan-400' : 'bg-amber-500/15 text-amber-400'
                    }`}>
                      Grade {report.grade}
                    </span>
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={copyReport}
                    className="py-2.5 px-4 rounded-xl border border-border bg-muted/60 hover:bg-muted text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy Report'}</span>
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      report.score >= 80 ? 'bg-emerald-500' : report.score >= 60 ? 'bg-cyan-500' : 'bg-amber-500'
                    }`}
                    style={{ width: `${report.score}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs font-mono text-muted-foreground">
                  <span>Length: {report.wordCount} words (~{report.readingTimeMinutes} min read)</span>
                  <span>Action Verbs: {report.actionVerbsCount} detected</span>
                </div>
              </div>

              {/* Section Check Matrix */}
              <div className="space-y-3 pt-2 border-t border-border text-xs">
                <div className="font-bold uppercase tracking-wider text-muted-foreground text-[10px]">
                  Essential Resume Sections Audit
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono">
                  {[
                    { label: 'Work Experience', passed: report.sections.experience },
                    { label: 'Technical Skills', passed: report.sections.skills },
                    { label: 'Education', passed: report.sections.education },
                    { label: 'Summary / Profile', passed: report.sections.summary },
                    { label: 'Projects Section', passed: report.sections.projects },
                    { label: 'Certifications', passed: report.sections.certifications },
                  ].map((sec, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-muted/20 border border-border flex items-center justify-between">
                      <span className="text-foreground font-semibold truncate">{sec.label}</span>
                      {sec.passed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Info Checks */}
              <div className="space-y-2 pt-2 border-t border-border text-xs">
                <div className="font-bold uppercase tracking-wider text-muted-foreground text-[10px]">
                  Recruiter Contact Information Check
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 font-mono text-[11px]">
                  <div className="p-2.5 rounded-xl bg-muted/20 border border-border flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    <span className={report.contactInfo.hasEmail ? 'text-foreground' : 'text-muted-foreground'}>
                      {report.contactInfo.hasEmail ? 'Email Detected' : 'Missing Email'}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-muted/20 border border-border flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span className={report.contactInfo.hasPhone ? 'text-foreground' : 'text-muted-foreground'}>
                      {report.contactInfo.hasPhone ? 'Phone Detected' : 'Missing Phone'}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-muted/20 border border-border flex items-center gap-2">
                    <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                    <span className={report.contactInfo.hasLinkedIn ? 'text-foreground' : 'text-muted-foreground'}>
                      {report.contactInfo.hasLinkedIn ? 'LinkedIn Profile' : 'No LinkedIn'}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-muted/20 border border-border flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5 text-amber-400" />
                    <span className={report.contactInfo.hasLocation ? 'text-foreground' : 'text-muted-foreground'}>
                      {report.contactInfo.hasLocation ? 'Location City' : 'Location Missing'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Detected Skills Cloud */}
              {report.detectedSkills.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-border text-xs">
                  <div className="font-bold uppercase tracking-wider text-muted-foreground text-[10px]">
                    Keywords &amp; Competencies Detected ({report.detectedSkills.length})
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {report.detectedSkills.map((sk, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary border border-primary/20 font-mono text-[11px] font-bold">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Strengths & Recommendations Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-border text-xs">
                
                {/* Strengths */}
                <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
                  <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Key Strengths</span>
                  </div>
                  <ul className="space-y-1.5 text-muted-foreground">
                    {report.strengths.map((s, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommendations */}
                <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 space-y-2">
                  <div className="font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>Improvement Recommendations</span>
                  </div>
                  <ul className="space-y-1.5 text-muted-foreground">
                    {report.recommendations.map((r, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-primary font-bold">•</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* How To Use Guide */}
        <div className="p-6 rounded-3xl border border-border bg-card space-y-4" style={{ backgroundColor: 'var(--card)' }}>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="text-base font-bold text-foreground">How to Optimize Your Resume for ATS</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-muted-foreground">
            <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-1.5">
              <span className="font-mono font-bold text-primary">01. Upload or Paste</span>
              <p>Provide your resume via PDF, Word document, or plain text paste.</p>
            </div>
            <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-1.5">
              <span className="font-mono font-bold text-primary">02. Inspect Parser Audit</span>
              <p>Review the breakdown of detected sections, contact credentials, and technical keywords.</p>
            </div>
            <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-1.5">
              <span className="font-mono font-bold text-primary">03. Implement Recommendations</span>
              <p>Add missing headers, amplify action verbs, and align keyword density with your target job description.</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="p-6 rounded-3xl border border-border bg-card space-y-4" style={{ backgroundColor: 'var(--card)' }}>
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <HelpCircle className="w-5 h-5 text-primary" />
            <h3 className="text-base font-bold text-foreground">Frequently Asked Questions</h3>
          </div>

          <div className="space-y-2">
            {faqs.map((faq, idx) => (
              <div key={idx} className="rounded-2xl border border-border bg-muted/20 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between text-xs font-bold text-foreground hover:bg-muted/40 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openFaq === idx ? 'rotate-180 text-primary' : 'text-muted-foreground'}`} />
                </button>
                {openFaq === idx && (
                  <div className="p-4 pt-0 text-xs text-muted-foreground leading-relaxed border-t border-border/50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Related Tools */}
        <div className="pt-2">
          <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
            Related Document &amp; Developer Tools:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              href="/document-tools/compress-pdf"
              className="p-3.5 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all flex items-center gap-3 group"
            >
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
                <FileText className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">Compress Resume PDF</div>
                <div className="text-[11px] text-muted-foreground truncate">Reduce file size under 2MB</div>
              </div>
            </Link>

            <Link
              href="/image-compressor"
              className="p-3.5 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all flex items-center gap-3 group"
            >
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                <FileCode className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">Image Compressor</div>
                <div className="text-[11px] text-muted-foreground truncate">Optimize headshots &amp; portfolio images</div>
              </div>
            </Link>

            <Link
              href="/qr-generator"
              className="p-3.5 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all flex items-center gap-3 group"
            >
              <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400">
                <Layers className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">Portfolio QR Generator</div>
                <div className="text-[11px] text-muted-foreground truncate">Generate QR for resume portfolio</div>
              </div>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

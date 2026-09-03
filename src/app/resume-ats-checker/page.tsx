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
  ChevronUp,
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
  Trash2,
  Target,
  BarChart3,
  Eye,
  CheckCheck,
  Globe,
  User,
  Hash,
} from 'lucide-react';
import {
  AtsReport,
  analyzeResumeText,
  TARGET_ROLE_KEYWORDS,
} from '@/lib/resumeAts';
import ToolSeoFooter from '@/components/seo/ToolSeoFooter';

export default function ResumeAtsCheckerPage() {
  const [inputMode, setInputMode] = useState<'upload' | 'paste'>('upload');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<string | null>(null);
  const [resumeText, setResumeText] = useState<string>('');
  const [targetJobRole, setTargetJobRole] = useState<string>('Software Engineer');
  const [jobDescription, setJobDescription] = useState<string>('');
  const [showJdInput, setShowJdInput] = useState<boolean>(false);
  const [showExtractedText, setShowExtractedText] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [report, setReport] = useState<AtsReport | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const sampleSeniorResume = `John Doe
Email: john.doe@email.com | Phone: +1 (555) 234-5678 | Location: San Francisco, CA
LinkedIn: linkedin.com/in/johndoe | Portfolio: johndoe.dev

PROFESSIONAL SUMMARY
Senior Full-Stack Engineer with 7+ years of experience architecting high-scale Next.js, React, Node.js, and TypeScript web applications on AWS cloud infrastructure. Led engineering teams to optimize database latency by 45% and deployed scalable microservices with Docker and Kubernetes for 2M+ active users.

TECHNICAL SKILLS
Languages & Frameworks: JavaScript, TypeScript, React, Next.js, Node.js, Python, HTML5, CSS3, Tailwind CSS, GraphQL, REST API
Databases & Cloud: PostgreSQL, MongoDB, Redis, AWS (S3, Lambda, EC2), Docker, Kubernetes, CI/CD, Git, Linux
Practices & Architecture: System Design, Agile, Scrum, Automated Testing, Jest, Cypress, Microservices

WORK EXPERIENCE
Lead Software Engineer | Acme Corporation | 2022 - Present
- Architected and deployed a multi-tenant SaaS platform using Next.js and PostgreSQL, serving 2M+ monthly active users with 99.99% uptime.
- Spearheaded migration from monolithic REST APIs to GraphQL microservices, reducing payload latency by 35% across 15 services.
- Engineered automated CI/CD pipelines with modern CI/CD and Docker, accelerating release frequency by 60%.
- Mentored a team of 6 junior and mid-level software engineers on clean architecture, unit testing, and design patterns.

Senior Full-Stack Developer | TechCorp Solutions | 2019 - 2022
- Developed responsive web interfaces using React and Tailwind CSS, increasing user conversion rates by 25%.
- Optimized database indexing and query execution plans in PostgreSQL, saving 200+ compute hours and $15,000 monthly in AWS costs.
- Integrated Stripe payment processing and OAuth2 authentication for enterprise customers, generating $1.8M in ARR.

EDUCATION
Bachelor of Science in Computer Science
University of California, Berkeley | 2015 - 2019 | GPA: 3.8

KEY PROJECTS
- CloudFlow Orchestrator: Open-source container deployment tool with 1,500+ OSS stars built with Go, Docker, and React.
- DevPulse Analytics: Real-time web vitals telemetry platform handling 50k events/sec built with TypeScript, Kafka, and Redis.

CERTIFICATIONS
- AWS Certified Solutions Architect - Associate
- Certified Kubernetes Administrator (CKA)`;

  const sampleFrontendResume = `Alex Morgan
Email: alex.morgan@email.com | Phone: +1 (555) 987-6543 | Location: New York, NY
LinkedIn: linkedin.com/in/alexmorgan | Portfolio: alexmorgan.dev

PROFESSIONAL SUMMARY
Creative and performance-driven Frontend Developer with 5+ years of experience crafting responsive web applications using React, Next.js, TypeScript, and Tailwind CSS. Specialized in UI/UX architecture, accessibility (WCAG 2.1), and web performance optimization.

TECHNICAL SKILLS
Core: React, Next.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, SASS, Redux Toolkit, Webpack, Vite
Testing & Tools: Jest, Cypress, React Testing Library, Git, Figma, REST API, GraphQL, Responsive Design, Web Vitals

WORK EXPERIENCE
Senior Frontend Developer | PixelCraft Studio | 2021 - Present
- Spearheaded redesign of customer-facing dashboard using Next.js and Tailwind CSS, boosting Lighthouse performance score from 62 to 98.
- Engineered reusable UI component library adopting strict accessibility standards, adopted by 8 product teams.
- Optimized bundle size by 40% utilizing dynamic imports and tree-shaking, resulting in 1.4s faster initial page load.

Frontend Engineer | WebWave Digital | 2019 - 2021
- Developed interactive SPA applications with React and TypeScript for 100k+ daily users.
- Collaborated closely with UI/UX designers in Figma to transform high-fidelity prototypes into pixel-perfect components.

EDUCATION
Bachelor of Science in Information Technology
New York University | 2015 - 2019

PROJECTS
- DesignSys UI: Modern Tailwind CSS component system downloaded 25,000+ times on npm.`;

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setFileName(file.name);
    setFileSize(formatFileSize(file.size));
    setErrorMessage(null);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFileName(null);
    setFileSize(null);
    setResumeText('');
    setReport(null);
    setErrorMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Main Scan and Audit Trigger
  const handleScanAndAudit = async () => {
    setLoading(true);
    setErrorMessage(null);

    try {
      if (inputMode === 'upload') {
        if (!selectedFile && !resumeText.trim()) {
          setErrorMessage('Please select a resume file (.pdf, .docx, .doc, .txt) or switch to Paste mode.');
          setLoading(false);
          return;
        }

        if (selectedFile) {
          const formData = new FormData();
          formData.append('file', selectedFile);
          formData.append('targetJobRole', targetJobRole);
          if (jobDescription.trim()) {
            formData.append('jobDescription', jobDescription);
          }

          const res = await fetch('/api/resume-ats', {
            method: 'POST',
            body: formData,
          });

          const data = await res.json();

          if (!res.ok || data.error) {
            // If server error, fallback to client-side parsing if text was already available or txt
            if (selectedFile.name.endsWith('.txt')) {
              const textContent = await selectedFile.text();
              setResumeText(textContent);
              const fallbackRep = analyzeResumeText(textContent, targetJobRole, jobDescription);
              setReport(fallbackRep);
              setLoading(false);
              return;
            }
            throw new Error(data.error || 'Failed to parse resume file. Please check file format.');
          }

          if (data.extractedText) {
            setResumeText(data.extractedText);
          }
          setReport(data.report);
        } else if (resumeText.trim()) {
          // If file was previously parsed into text
          const rep = analyzeResumeText(resumeText, targetJobRole, jobDescription);
          setReport(rep);
        }
      } else {
        // Paste mode
        if (!resumeText.trim() || resumeText.trim().length < 25) {
          setErrorMessage('Please enter at least 25 characters of resume content to run an ATS audit.');
          setLoading(false);
          return;
        }

        // Fast client-side analyze with server sync
        const rep = analyzeResumeText(resumeText, targetJobRole, jobDescription);
        setReport(rep);
      }
    } catch (err: any) {
      console.error('Scan & Audit error:', err);
      setErrorMessage(err.message || 'An error occurred while scanning and auditing the resume.');
    } finally {
      setLoading(false);
    }
  };

  const copyReport = () => {
    if (!report) return;
    const text = `=========================================
ATS RESUME AUDIT REPORT
=========================================
Target Role: ${report.targetRole}
Overall ATS Score: ${report.score}/100 (Grade: ${report.grade})
Role Match: ${report.roleMatchPercentage}%
Word Count: ${report.wordCount} words (~${report.readingTimeMinutes} min read)
Action Verbs: ${report.actionVerbsCount} detected
Quantifiable Metric Points: ${report.quantifiedMetricsCount} detected

-----------------------------------------
SUBSCORE BREAKDOWN:
-----------------------------------------
• Contact Info: ${report.subscores.contactScore}/15
• Essential Sections: ${report.subscores.sectionsScore}/25
• Readability & Word Length: ${report.subscores.readabilityScore}/15
• Action Verbs & Power Words: ${report.subscores.actionVerbsScore}/15
• Quantifiable Achievements: ${report.subscores.metricsScore}/15
• Target Role Keywords: ${report.subscores.keywordsScore}/15

-----------------------------------------
DETECTED KEYWORDS & SKILLS (${report.detectedSkills.length}):
-----------------------------------------
${report.detectedSkills.join(', ')}

-----------------------------------------
MISSING ROLE KEYWORDS:
-----------------------------------------
${report.missingRoleKeywords.length > 0 ? report.missingRoleKeywords.join(', ') : 'None! Great keyword alignment.'}

-----------------------------------------
KEY STRENGTHS:
-----------------------------------------
${report.strengths.map((s) => `• ${s}`).join('\n')}

-----------------------------------------
CRITICAL WEAKNESSES:
-----------------------------------------
${report.weaknesses.map((w) => `• ${w}`).join('\n')}

-----------------------------------------
ACTIONABLE RECOMMENDATIONS:
-----------------------------------------
${report.recommendations.map((r) => `• ${r}`).join('\n')}
=========================================`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadReport = () => {
    if (!report) return;
    const text = `ATS RESUME AUDIT REPORT
Generated by AllToolss AI Resume ATS Checker
Date: ${new Date().toLocaleDateString()}
Target Role: ${report.targetRole}
Overall Score: ${report.score}/100 (Grade: ${report.grade})

OVERVIEW:
- Role Alignment: ${report.roleMatchPercentage}%
- Word Count: ${report.wordCount} words
- Power Action Verbs: ${report.actionVerbsCount}
- Quantifiable Impact Statements: ${report.quantifiedMetricsCount}

SUBSCORES:
- Contact Info: ${report.subscores.contactScore}/15
- Essential Sections: ${report.subscores.sectionsScore}/25
- Readability & Word Length: ${report.subscores.readabilityScore}/15
- Action Verbs: ${report.subscores.actionVerbsScore}/15
- Quantifiable Metrics: ${report.subscores.metricsScore}/15
- Keywords & Role Alignment: ${report.subscores.keywordsScore}/15

DETECTED COMPETENCIES:
${report.detectedSkills.join(', ')}

MISSING RECOMMENDED KEYWORDS:
${report.missingRoleKeywords.join(', ')}

STRENGTHS:
${report.strengths.map((s) => `• ${s}`).join('\n')}

WEAKNESSES:
${report.weaknesses.map((w) => `• ${w}`).join('\n')}

RECOMMENDATIONS:
${report.recommendations.map((r) => `• ${r}`).join('\n')}
`;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ATS_Audit_Report_${report.targetRole.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const faqs = [
    {
      q: 'What is an Applicant Tracking System (ATS)?',
      a: 'An ATS is enterprise software used by recruiters, Fortune 500 companies, and HR teams to parse, categorize, and rank resumes before a human recruiter reviews them. Resumes that lack essential keywords, clean formatting, or clear contact data are often filtered out automatically.',
    },
    {
      q: 'Why do PDF and Word resumes often fail ATS parsers?',
      a: 'Resumes fail when they include multi-column tables, text boxes, images, complex graphics, missing standard section headings ("Work Experience", "Skills", "Education"), or lack industry keywords matching the target job description.',
    },
    {
      q: 'What is a good ATS Resume Score?',
      a: 'An ATS score of 80% or higher is considered excellent. Scores between 70% and 79% are good but could use keyword or metric improvements. Scores below 60% indicate critical structural or formatting deficiencies that require revision.',
    },
    {
      q: 'How does the "Scan and Audit Resume" feature work?',
      a: 'Our recruiter-grade ATS engine extracts textual content from your PDF or DOCX file, analyzes contact credentials, identifies standard section headers, measures action verb density, verifies quantifiable impact metrics (%, $, KPIs), and checks target role keyword alignment to provide an instant 0-100 score and actionable checklist.',
    },
    {
      q: 'Is my resume data stored or shared?',
      a: 'No. Your resume is processed securely in-memory for instant audit reporting and is never permanently stored, indexed, or shared with third parties.',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Breadcrumb & Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <span className="text-foreground font-semibold">AI Tools</span>
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
              Upload your PDF, Word document, or paste plain text. Audit contact credentials, section headers, keyword alignment, quantified impact, and get an instant 0-100 ATS compatibility score.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="px-3 py-1.5 rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-bold font-mono flex items-center gap-1.5 shadow-sm">
              <Award className="w-3.5 h-3.5" /> Recruiter Grade Parser
            </span>
          </div>
        </div>

        {/* Target Job Role & Matching Configuration */}
        <div className="p-5 rounded-3xl border border-border bg-card shadow-sm space-y-4" style={{ backgroundColor: 'var(--card)' }}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              <label className="text-xs font-bold uppercase tracking-wider text-foreground">
                Target Job Role for ATS Keyword Alignment
              </label>
            </div>
            <span className="text-[11px] font-mono text-muted-foreground">
              Select role to test recruiter keyword matches
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <select
              value={targetJobRole}
              onChange={(e) => setTargetJobRole(e.target.value)}
              className="w-full p-3 rounded-2xl border border-border bg-muted/30 text-foreground font-semibold text-xs focus:outline-none focus:border-primary cursor-pointer"
            >
              {Object.keys(TARGET_ROLE_KEYWORDS).map((role) => (
                <option key={role} value={role} className="bg-card text-foreground">
                  {role}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => setShowJdInput(!showJdInput)}
              className="py-3 px-4 rounded-2xl border border-border bg-muted/20 hover:bg-muted/40 text-xs font-bold flex items-center justify-between transition-colors text-foreground cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5 text-primary" />
                <span>{showJdInput ? 'Hide Job Description (JD)' : 'Compare with Job Description (Optional)'}</span>
              </span>
              {showJdInput ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
            </button>
          </div>

          {showJdInput && (
            <div className="pt-2 border-t border-border space-y-2 animate-in fade-in duration-200">
              <label className="text-[11px] font-bold text-muted-foreground">
                Paste Target Job Description (JD) to calculate match percentage &amp; find missing JD keywords:
              </label>
              <textarea
                rows={4}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the requirements, qualifications, and responsibilities from the job posting..."
                className="w-full p-3 rounded-xl border border-border bg-muted/40 text-foreground font-mono text-xs focus:outline-none focus:border-primary resize-y"
              />
            </div>
          )}
        </div>

        {/* Mode Switcher */}
        <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-card border border-border" style={{ backgroundColor: 'var(--card)' }}>
          <button
            type="button"
            onClick={() => {
              setInputMode('upload');
              setErrorMessage(null);
            }}
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
            onClick={() => {
              setInputMode('paste');
              setErrorMessage(null);
            }}
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
          <div className="p-6 rounded-3xl border border-border bg-card shadow-sm space-y-5" style={{ backgroundColor: 'var(--card)' }}>
            
            {!selectedFile && !fileName ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="p-8 sm:p-12 rounded-2xl border-2 border-dashed border-border hover:border-primary/60 bg-muted/20 hover:bg-muted/40 transition-all cursor-pointer flex flex-col items-center justify-center text-center space-y-3 group"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx,.doc,.txt"
                  onChange={handleFileSelect}
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
                    Supported formats: PDF (.pdf), Word (.docx, .doc), Plain Text (.txt)
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-5 rounded-2xl bg-muted/30 border border-border space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-foreground flex items-center gap-2">
                        <span>{fileName}</span>
                        {fileSize && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground">
                            {fileSize}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Ready for ATS Scanning
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="py-2 px-3 rounded-xl border border-border bg-card hover:bg-muted text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Change File
                    </button>
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="p-2 rounded-xl border border-border bg-card hover:bg-destructive/20 hover:text-destructive text-muted-foreground transition-colors cursor-pointer"
                      title="Remove file"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.docx,.doc,.txt"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Error banner if any */}
            {errorMessage && (
              <div className="p-3.5 rounded-2xl bg-destructive/10 border border-destructive/30 text-destructive text-xs font-medium flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Scan and Audit Resume Button */}
            <button
              type="button"
              onClick={handleScanAndAudit}
              disabled={loading || (!selectedFile && !resumeText.trim())}
              className="w-full py-3.5 px-6 rounded-2xl bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 shadow-glow-primary hover:opacity-95 transition-all cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Extracting Text &amp; Auditing ATS Compatibility...</span>
                </>
              ) : (
                <>
                  <FileCheck2 className="w-5 h-5" />
                  <span>Scan and Audit Resume</span>
                </>
              )}
            </button>

            {/* Sample loaders */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-border/50 text-xs">
              <span className="text-muted-foreground">Don&apos;t have a file ready?</span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setResumeText(sampleSeniorResume);
                    setFileName('sample_senior_engineer_resume.txt');
                    setSelectedFile(null);
                    const rep = analyzeResumeText(sampleSeniorResume, 'Software Engineer');
                    setReport(rep);
                  }}
                  className="font-bold text-primary hover:underline cursor-pointer flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Sample Senior Engineer
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => {
                    setResumeText(sampleFrontendResume);
                    setFileName('sample_frontend_developer_resume.txt');
                    setSelectedFile(null);
                    setTargetJobRole('Frontend Developer');
                    const rep = analyzeResumeText(sampleFrontendResume, 'Frontend Developer');
                    setReport(rep);
                  }}
                  className="font-bold text-primary hover:underline cursor-pointer flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Sample Frontend Dev
                </button>
              </div>
            </div>

          </div>
        ) : (
          <div className="p-6 rounded-3xl border border-border bg-card shadow-sm space-y-4" style={{ backgroundColor: 'var(--card)' }}>
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Paste Complete Resume Plain Text
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setResumeText(sampleSeniorResume);
                    setTargetJobRole('Software Engineer');
                  }}
                  className="text-xs font-bold text-primary hover:underline cursor-pointer flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Insert Senior Sample
                </button>
                <span className="text-muted-foreground text-xs">•</span>
                <button
                  type="button"
                  onClick={() => {
                    setResumeText(sampleFrontendResume);
                    setTargetJobRole('Frontend Developer');
                  }}
                  className="text-xs font-bold text-primary hover:underline cursor-pointer flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Insert Frontend Sample
                </button>
              </div>
            </div>

            <textarea
              rows={10}
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your full resume text including candidate name, contact info, professional summary, work experience, education, and technical skills..."
              className="w-full p-4 rounded-2xl border border-border bg-muted/40 text-foreground font-mono text-xs focus:outline-none focus:border-primary resize-y"
            />

            <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
              <span>{resumeText.trim().split(/\s+/).filter(Boolean).length} words</span>
              <span>{resumeText.length} characters</span>
            </div>

            {/* Error banner */}
            {errorMessage && (
              <div className="p-3.5 rounded-2xl bg-destructive/10 border border-destructive/30 text-destructive text-xs font-medium flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Scan and Audit Resume Button */}
            <button
              type="button"
              onClick={handleScanAndAudit}
              disabled={loading || !resumeText.trim()}
              className="w-full py-3.5 px-6 rounded-2xl bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 shadow-glow-primary hover:opacity-95 transition-all cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Scanning &amp; Auditing Resume ATS Compatibility...</span>
                </>
              ) : (
                <>
                  <FileCheck2 className="w-5 h-5" />
                  <span>Scan and Audit Resume</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* ATS Audit Report Card */}
        {report && (
          <div className="space-y-6 animate-in fade-in duration-300">
            
            {/* Top Score Banner */}
            <div className="p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-lg space-y-6" style={{ backgroundColor: 'var(--card)' }}>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    <Award className="w-3.5 h-3.5 text-primary" />
                    <span>ATS Readiness Assessment • Target: {report.targetRole}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black font-mono text-foreground flex items-center gap-3">
                    <span>Score: {report.score}/100</span>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                      report.score >= 85
                        ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                        : report.score >= 70
                        ? 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30'
                        : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                    }`}>
                      Grade {report.grade}
                    </span>
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    {report.score >= 85
                      ? '🎉 Outstanding! Your resume demonstrates high recruiter-grade ATS compliance.'
                      : report.score >= 70
                      ? '👍 Good foundation. Optimize missing keywords and metrics to increase interview chances.'
                      : '⚠️ Requires attention. Fix missing sections and keywords to avoid ATS auto-rejection.'}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handleScanAndAudit}
                    className="py-2.5 px-3.5 rounded-xl border border-primary/30 bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Re-Scan</span>
                  </button>
                  <button
                    type="button"
                    onClick={copyReport}
                    className="py-2.5 px-3.5 rounded-xl border border-border bg-muted/60 hover:bg-muted text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy Report'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={downloadReport}
                    className="py-2.5 px-3.5 rounded-xl border border-border bg-muted/60 hover:bg-muted text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Report</span>
                  </button>
                </div>
              </div>

              {/* Progress Bar & Quick Stats */}
              <div className="space-y-2">
                <div className="h-3.5 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full transition-all duration-700 rounded-full ${
                      report.score >= 85 ? 'bg-emerald-500 shadow-glow-emerald' : report.score >= 70 ? 'bg-cyan-500' : 'bg-amber-500'
                    }`}
                    style={{ width: `${report.score}%` }}
                  />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs font-mono">
                  <div className="p-2.5 rounded-xl bg-muted/20 border border-border">
                    <span className="text-muted-foreground block text-[10px]">Word Count</span>
                    <span className="font-bold text-foreground">{report.wordCount} words (~{report.readingTimeMinutes} min)</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-muted/20 border border-border">
                    <span className="text-muted-foreground block text-[10px]">Role Alignment</span>
                    <span className="font-bold text-primary">{report.roleMatchPercentage}% Match</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-muted/20 border border-border">
                    <span className="text-muted-foreground block text-[10px]">Action Verbs</span>
                    <span className="font-bold text-emerald-400">{report.actionVerbsCount} detected</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-muted/20 border border-border">
                    <span className="text-muted-foreground block text-[10px]">Quantified Impact</span>
                    <span className="font-bold text-cyan-400">{report.quantifiedMetricsCount} metrics</span>
                  </div>
                </div>
              </div>

              {/* Subscores Grid */}
              <div className="space-y-3 pt-2 border-t border-border text-xs">
                <div className="font-bold uppercase tracking-wider text-muted-foreground text-[10px] flex items-center gap-1.5">
                  <BarChart3 className="w-3.5 h-3.5 text-primary" />
                  <span>Granular ATS Subscores Breakdown</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  <div className="p-3 rounded-2xl bg-muted/20 border border-border space-y-1">
                    <div className="flex justify-between text-[11px] font-semibold">
                      <span className="text-muted-foreground">Contact Credentials</span>
                      <span className="font-mono font-bold text-foreground">{report.subscores.contactScore}/15</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${(report.subscores.contactScore / 15) * 100}%` }} />
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-muted/20 border border-border space-y-1">
                    <div className="flex justify-between text-[11px] font-semibold">
                      <span className="text-muted-foreground">Essential Sections</span>
                      <span className="font-mono font-bold text-foreground">{report.subscores.sectionsScore}/25</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(report.subscores.sectionsScore / 25) * 100}%` }} />
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-muted/20 border border-border space-y-1">
                    <div className="flex justify-between text-[11px] font-semibold">
                      <span className="text-muted-foreground">Readability &amp; Length</span>
                      <span className="font-mono font-bold text-foreground">{report.subscores.readabilityScore}/15</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${(report.subscores.readabilityScore / 15) * 100}%` }} />
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-muted/20 border border-border space-y-1">
                    <div className="flex justify-between text-[11px] font-semibold">
                      <span className="text-muted-foreground">Power Action Verbs</span>
                      <span className="font-mono font-bold text-foreground">{report.subscores.actionVerbsScore}/15</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: `${(report.subscores.actionVerbsScore / 15) * 100}%` }} />
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-muted/20 border border-border space-y-1">
                    <div className="flex justify-between text-[11px] font-semibold">
                      <span className="text-muted-foreground">Quantified Impact (%, $)</span>
                      <span className="font-mono font-bold text-foreground">{report.subscores.metricsScore}/15</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-violet-500 rounded-full" style={{ width: `${(report.subscores.metricsScore / 15) * 100}%` }} />
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-muted/20 border border-border space-y-1">
                    <div className="flex justify-between text-[11px] font-semibold">
                      <span className="text-muted-foreground">Target Role Keywords</span>
                      <span className="font-mono font-bold text-foreground">{report.subscores.keywordsScore}/15</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${(report.subscores.keywordsScore / 15) * 100}%` }} />
                    </div>
                  </div>
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
                    { label: 'Certifications', passed: report.sections.certifications || report.sections.awards },
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
                  Recruiter Contact Information Verification
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 font-mono text-[11px]">
                  <div className="p-2.5 rounded-xl bg-muted/20 border border-border flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    <span className={report.contactInfo.hasEmail ? 'text-foreground truncate' : 'text-muted-foreground'}>
                      {report.contactInfo.hasEmail ? (report.contactInfo.emailValue || 'Email Detected') : 'Missing Email'}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-muted/20 border border-border flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span className={report.contactInfo.hasPhone ? 'text-foreground truncate' : 'text-muted-foreground'}>
                      {report.contactInfo.hasPhone ? (report.contactInfo.phoneValue || 'Phone Detected') : 'Missing Phone'}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-muted/20 border border-border flex items-center gap-2">
                    <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                    <span className={report.contactInfo.hasLinkedIn ? 'text-foreground truncate' : 'text-muted-foreground'}>
                      {report.contactInfo.hasLinkedIn ? 'LinkedIn Profile' : 'No LinkedIn'}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-muted/20 border border-border flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5 text-amber-400" />
                    <span className={report.contactInfo.hasLocation ? 'text-foreground truncate' : 'text-muted-foreground'}>
                      {report.contactInfo.hasLocation ? 'Location City' : 'Location Missing'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Missing Recommended Keywords Warning */}
              {report.missingRoleKeywords.length > 0 && (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 space-y-2 text-xs">
                  <div className="font-bold text-amber-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Missing High-Priority Keywords for {report.targetRole}</span>
                  </div>
                  <p className="text-muted-foreground">
                    Adding these recruiter-searched terms can significantly improve your ATS ranking and keyword pass rate:
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {report.missingRoleKeywords.map((kw, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-300 border border-amber-500/30 font-mono text-[11px] font-bold">
                        + {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Detected Skills Cloud */}
              {report.detectedSkills.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-border text-xs">
                  <div className="font-bold uppercase tracking-wider text-muted-foreground text-[10px]">
                    Matched Competencies &amp; Technical Keywords ({report.detectedSkills.length})
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

              {/* Job Description Comparison (If enabled) */}
              {report.jobDescriptionMatch && (
                <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/25 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-indigo-400 flex items-center gap-1.5">
                      <Target className="w-4 h-4" />
                      <span>Job Description Match Rate: {report.jobDescriptionMatch.matchRate}%</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <span className="text-emerald-400 font-bold block mb-1">Matched JD Keywords:</span>
                      <div className="flex flex-wrap gap-1">
                        {report.jobDescriptionMatch.matchedKeywords.slice(0, 10).map((kw, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 font-mono text-[10px]">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-amber-400 font-bold block mb-1">Missing JD Keywords:</span>
                      <div className="flex flex-wrap gap-1">
                        {report.jobDescriptionMatch.missingKeywords.slice(0, 10).map((kw, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 font-mono text-[10px]">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
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
                    <span>Actionable Recommendations</span>
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

              {/* Extracted Text Inspector Toggle */}
              {resumeText && (
                <div className="pt-2 border-t border-border">
                  <button
                    type="button"
                    onClick={() => setShowExtractedText(!showExtractedText)}
                    className="text-xs font-bold text-muted-foreground hover:text-foreground flex items-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-primary" />
                    <span>{showExtractedText ? 'Hide Extracted Resume Text' : 'View Extracted Resume Text (Verify ATS Parser Output)'}</span>
                    {showExtractedText ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {showExtractedText && (
                    <div className="mt-3 p-4 rounded-2xl bg-muted/40 border border-border space-y-2 animate-in fade-in duration-200">
                      <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground">
                        <span>PARSER OUTPUT ({resumeText.length} characters)</span>
                        <span>Verify formatting &amp; section order</span>
                      </div>
                      <pre className="text-xs font-mono text-foreground overflow-x-auto whitespace-pre-wrap max-h-64 p-2 bg-card rounded-xl border border-border">
                        {resumeText}
                      </pre>
                    </div>
                  )}
                </div>
              )}

            </div>

          </div>
        )}

        {/* How To Use Guide */}
        <div className="p-6 rounded-3xl border border-border bg-card space-y-4" style={{ backgroundColor: 'var(--card)' }}>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="text-base font-bold text-foreground">How to Maximize Your Resume ATS Score</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-muted-foreground">
            <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-1.5">
              <span className="font-mono font-bold text-primary">01. Upload or Paste</span>
              <p>Upload your PDF or Word resume, or paste plain text. Select your target job role.</p>
            </div>
            <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-1.5">
              <span className="font-mono font-bold text-primary">02. Click Scan &amp; Audit</span>
              <p>Click &ldquo;Scan and Audit Resume&rdquo; to execute the recruiter-grade ATS scoring engine.</p>
            </div>
            <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-1.5">
              <span className="font-mono font-bold text-primary">03. Optimize &amp; Land Interviews</span>
              <p>Incorporate the missing keywords and metrics recommendations to achieve an A+ ATS readiness score.</p>
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
              href="/tools/compress-pdf"
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
              href="/tools/image-compressor"
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
              href="/tools/qr-generator"
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

        {/* Master SEO Blueprint & Structured Data Schema Footer */}
        <ToolSeoFooter toolSlug="resume-ats-checker" />
      </div>
    </div>
  );
}

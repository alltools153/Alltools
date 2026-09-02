export interface ContactInfoAudit {
  hasEmail: boolean;
  emailValue: string | null;
  hasPhone: boolean;
  phoneValue: string | null;
  hasLinkedIn: boolean;
  linkedInValue: string | null;
  hasGitHubOrPortfolio: boolean;
  portfolioValue: string | null;
  hasLocation: boolean;
  locationValue: string | null;
  candidateName: string | null;
}

export interface SectionsAudit {
  summary: boolean;
  experience: boolean;
  education: boolean;
  skills: boolean;
  projects: boolean;
  certifications: boolean;
  awards: boolean;
}

export interface AtsReport {
  score: number; // 0 - 100
  grade: 'A+' | 'A' | 'B' | 'C' | 'Needs Work';
  subscores: {
    contactScore: number;      // max 15
    sectionsScore: number;     // max 25
    readabilityScore: number;  // max 15
    actionVerbsScore: number;  // max 15
    metricsScore: number;      // max 15
    keywordsScore: number;     // max 15
  };
  wordCount: number;
  readingTimeMinutes: number;
  bulletPointsCount: number;
  quantifiedMetricsCount: number;
  quantifiedSamples: string[];
  contactInfo: ContactInfoAudit;
  sections: SectionsAudit;
  targetRole: string;
  detectedSkills: string[];
  missingRoleKeywords: string[];
  roleMatchPercentage: number;
  detectedActionVerbs: string[];
  actionVerbsCount: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  jobDescriptionMatch?: {
    matchRate: number;
    matchedKeywords: string[];
    missingKeywords: string[];
  };
}

export const TARGET_ROLE_KEYWORDS: Record<string, string[]> = {
  'Software Engineer': [
    'python', 'java', 'c++', 'javascript', 'typescript', 'git', 'ci/cd', 'rest api',
    'sql', 'docker', 'agile', 'data structures', 'algorithms', 'system design',
    'unit testing', 'microservices', 'linux', 'debugging', 'code review', 'aws'
  ],
  'Full-Stack Developer': [
    'react', 'next.js', 'typescript', 'javascript', 'node.js', 'express', 'postgresql',
    'mongodb', 'graphql', 'rest api', 'tailwind', 'docker', 'aws', 'git', 'ci/cd',
    'state management', 'redux', 'prisma', 'html5', 'css3', 'responsive design'
  ],
  'Frontend Developer': [
    'react', 'next.js', 'vue', 'angular', 'typescript', 'javascript', 'html5', 'css3',
    'tailwind css', 'sass', 'redux', 'webpack', 'vite', 'responsive design',
    'web performance', 'accessibility', 'ui/ux', 'jest', 'cypress', 'rest api'
  ],
  'Backend Developer': [
    'node.js', 'python', 'java', 'golang', 'c#', 'spring boot', 'django', 'fastapi',
    'postgresql', 'mysql', 'mongodb', 'redis', 'kafka', 'microservices', 'rest api',
    'graphql', 'docker', 'kubernetes', 'aws', 'grpc', 'ci/cd', 'database design'
  ],
  'DevOps & Cloud Engineer': [
    'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'terraform', 'ansible', 'ci/cd',
    'jenkins', 'github actions', 'linux', 'bash', 'prometheus', 'grafana', 'helm',
    'cloudformation', 'microservices', 'iac', 'security', 'monitoring'
  ],
  'Data Scientist & AI Engineer': [
    'python', 'r', 'sql', 'pandas', 'numpy', 'scikit-learn', 'tensorflow', 'pytorch',
    'machine learning', 'deep learning', 'nlp', 'llm', 'generative ai', 'tableau',
    'power bi', 'bigquery', 'data visualization', 'statistics', 'data pipeline', 'spark'
  ],
  'Product Manager': [
    'product management', 'product strategy', 'roadmap', 'agile', 'scrum',
    'user stories', 'wireframing', 'kpis', 'a/b testing', 'data analytics',
    'stakeholder management', 'market research', 'jira', 'figma', 'user research',
    'go-to-market', 'prioritization', 'mvp'
  ],
  'Cybersecurity Analyst': [
    'vulnerability assessment', 'penetration testing', 'siem', 'soc', 'incident response',
    'firewall', 'wireshark', 'nmap', 'owasp', 'iso 27001', 'nist', 'threat modeling',
    'python', 'linux', 'compliance', 'network security', 'iam', 'encryption'
  ],
  'UI/UX Designer': [
    'figma', 'sketch', 'adobe xd', 'wireframing', 'prototyping', 'user research',
    'usability testing', 'design systems', 'information architecture', 'ui design',
    'ux design', 'interaction design', 'css', 'design thinking', 'user persona', 'responsive'
  ],
  'Mobile App Developer': [
    'react native', 'flutter', 'swift', 'kotlin', 'ios', 'android', 'dart', 'xcode',
    'android studio', 'rest api', 'mobile ui', 'firebase', 'app store', 'play store',
    'push notifications', 'offline storage', 'redux'
  ],
  'General Tech / Custom': [
    'javascript', 'typescript', 'python', 'java', 'react', 'node.js', 'sql', 'git',
    'aws', 'docker', 'ci/cd', 'agile', 'rest api', 'problem solving', 'communication',
    'collaboration', 'linux', 'project management'
  ]
};

export const ACTION_VERBS = [
  'architected', 'spearheaded', 'engineered', 'developed', 'deployed', 'orchestrated',
  'optimized', 'designed', 'implemented', 'managed', 'led', 'accelerated', 'transformed',
  'reduced', 'increased', 'streamlined', 'delivered', 'collaborated', 'created', 'built',
  'automated', 'executed', 'resolved', 'enhanced', 'integrated', 'championed', 'formulated',
  'established', 'boosted', 'generated', 'mentored', 'directed', 'pioneered', 'centralized',
  'revamped', 'scaled', 'refactored', 'authored', 'modernized', 'negotiated', 'oversaw'
];

export const ALL_SKILLS_CATALOG = Array.from(
  new Set(Object.values(TARGET_ROLE_KEYWORDS).flat())
);

/**
 * Recruiter-grade ATS Analysis Engine
 */
export function analyzeResumeText(
  text: string,
  targetRole: string = 'Software Engineer',
  jobDescription?: string
): AtsReport {
  const cleanText = text.toLowerCase();
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const words = text.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const readingTimeMinutes = Math.max(1, Math.round(wordCount / 200));

  // 1. Candidate Name Detection (First 1-3 lines usually hold name)
  let candidateName: string | null = null;
  if (lines.length > 0) {
    for (let i = 0; i < Math.min(3, lines.length); i++) {
      const line = lines[i];
      if (
        !line.includes('@') &&
        !line.includes('http') &&
        !line.includes('www') &&
        !/resume|curriculum|phone|email|linkedin/i.test(line) &&
        line.split(' ').length >= 2 &&
        line.split(' ').length <= 4 &&
        line.length < 50
      ) {
        candidateName = line;
        break;
      }
    }
  }

  // 2. Contact Info Parsing
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const phoneMatch = text.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}/);
  const linkedInMatch = text.match(/linkedin\.com\/in\/[a-zA-Z0-9_-]+/i) || (cleanText.includes('linkedin') ? ['linkedin profile'] : null);
  const portfolioMatch = text.match(/github\.com\/[a-zA-Z0-9_-]+/i) || text.match(/https?:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}[^\s]*/);
  const locationMatch = text.match(/\b(san francisco|new york|california|london|bangalore|delhi|mumbai|hyderabad|pune|seattle|austin|toronto|berlin|remote|usa|india|uk|singapore|chicago|boston)\b/i);

  const contactInfo: ContactInfoAudit = {
    hasEmail: Boolean(emailMatch),
    emailValue: emailMatch ? emailMatch[0] : null,
    hasPhone: Boolean(phoneMatch),
    phoneValue: phoneMatch ? phoneMatch[0] : null,
    hasLinkedIn: Boolean(linkedInMatch),
    linkedInValue: linkedInMatch ? linkedInMatch[0] : null,
    hasGitHubOrPortfolio: Boolean(portfolioMatch),
    portfolioValue: portfolioMatch ? portfolioMatch[0] : null,
    hasLocation: Boolean(locationMatch),
    locationValue: locationMatch ? locationMatch[0] : null,
    candidateName,
  };

  // 3. Sections Check
  const sections: SectionsAudit = {
    summary: /\b(summary|profile|about\s+me|objective|professional\s+summary|executive\s+summary|career\s+profile)\b/i.test(text),
    experience: /\b(experience|work\s+history|employment|work\s+experience|professional\s+experience|career\s+history)\b/i.test(text),
    education: /\b(education|academic|university|degree|bachelor|master|b\.tech|m\.tech|b\.sc|m\.sc|phd|diploma|college|gpa)\b/i.test(text),
    skills: /\b(skills|technical\s+skills|core\s+competencies|technologies|tools|proficiencies|expertise)\b/i.test(text),
    projects: /\b(projects|portfolio|key\s+projects|side\s+projects|personal\s+projects|open\s+source)\b/i.test(text),
    certifications: /\b(certifications?|certificates?|licenses?|credentials|accreditations|certified|cka|aws\s+certified)\b/i.test(text),
    awards: /\b(awards?|honors?|achievements?|recognition|publications?|patents?)\b/i.test(text),
  };

  // 4. Bullet Points & Quantifiable Metrics (e.g., 40%, $500k, 2M+ users)
  const bulletLines = lines.filter((l) => /^[•\-\*\u2022\u2023\u25E6\u2043\u2219]|\b\d+\.\s+/.test(l));
  const bulletPointsCount = Math.max(bulletLines.length, Math.floor(lines.length * 0.3));

  const metricRegex = /\b(\d+(?:\.\d+)?%|\$\s*\d+(?:,\d+)*(?:\.\d+)?(?:k|m|b)?|\b\d+\s*(?:x|times|hours|users|clients|projects|ms|seconds|percent|engineers|team members))\b/gi;
  const metricsFound: string[] = [];
  lines.forEach((l) => {
    const match = l.match(metricRegex);
    if (match && match.length > 0) {
      metricsFound.push(l.trim());
    }
  });
  const quantifiedMetricsCount = metricsFound.length;
  const quantifiedSamples = metricsFound.slice(0, 4);

  // 5. Detected Action Verbs
  const detectedActionVerbs: string[] = [];
  ACTION_VERBS.forEach((vb) => {
    const regex = new RegExp(`\\b${vb}\\b`, 'i');
    if (regex.test(text)) {
      detectedActionVerbs.push(vb.toLowerCase());
    }
  });

  // 6. Keywords & Role Alignment
  const targetKeywords = TARGET_ROLE_KEYWORDS[targetRole] || TARGET_ROLE_KEYWORDS['Software Engineer'];
  const detectedSkills: string[] = [];
  const missingRoleKeywords: string[] = [];

  // Match all catalog skills
  ALL_SKILLS_CATALOG.forEach((skill) => {
    const regex = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    if (regex.test(text)) {
      if (!detectedSkills.includes(skill.toUpperCase())) {
        detectedSkills.push(skill.toUpperCase());
      }
    }
  });

  // Check specific target role keywords
  let roleMatchCount = 0;
  targetKeywords.forEach((kw) => {
    const regex = new RegExp(`\\b${kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    if (regex.test(text)) {
      roleMatchCount++;
    } else {
      missingRoleKeywords.push(kw.toUpperCase());
    }
  });

  const roleMatchPercentage = Math.round((roleMatchCount / Math.max(1, targetKeywords.length)) * 100);

  // 7. Optional Job Description Matcher
  let jobDescriptionMatch: AtsReport['jobDescriptionMatch'] = undefined;
  if (jobDescription && jobDescription.trim().length > 20) {
    const jdWords = jobDescription.toLowerCase().match(/\b[a-z]{3,}\b/g) || [];
    const stopWords = new Set([
      'and', 'the', 'for', 'with', 'you', 'will', 'that', 'have', 'are', 'this', 'our',
      'from', 'your', 'about', 'who', 'what', 'their', 'work', 'join', 'team', 'company',
      'role', 'job', 'position', 'experience', 'years', 'looking', 'ability', 'strong'
    ]);
    const jdKeywords = Array.from(new Set(jdWords.filter((w) => !stopWords.has(w) && w.length >= 3))).slice(0, 30);
    const matchedJdKw: string[] = [];
    const missingJdKw: string[] = [];

    jdKeywords.forEach((kw) => {
      const regex = new RegExp(`\\b${kw}\\b`, 'i');
      if (regex.test(text)) {
        matchedJdKw.push(kw);
      } else {
        missingJdKw.push(kw);
      }
    });

    const jdMatchRate = Math.round((matchedJdKw.length / Math.max(1, jdKeywords.length)) * 100);
    jobDescriptionMatch = {
      matchRate: jdMatchRate,
      matchedKeywords: matchedJdKw,
      missingKeywords: missingJdKw.slice(0, 15),
    };
  }

  // 8. Subscores & Total Calculation (0 - 100)
  // Subscore 1: Contact Info (Max 15)
  let contactScore = 0;
  if (contactInfo.hasEmail) contactScore += 5;
  if (contactInfo.hasPhone) contactScore += 4;
  if (contactInfo.hasLinkedIn) contactScore += 3;
  if (contactInfo.hasLocation) contactScore += 2;
  if (contactInfo.hasGitHubOrPortfolio) contactScore += 1;
  contactScore = Math.min(15, contactScore);

  // Subscore 2: Sections & Structure (Max 25)
  let sectionsScore = 0;
  if (sections.experience) sectionsScore += 8;
  if (sections.skills) sectionsScore += 6;
  if (sections.education) sectionsScore += 5;
  if (sections.summary) sectionsScore += 3;
  if (sections.projects) sectionsScore += 2;
  if (sections.certifications || sections.awards) sectionsScore += 1;
  sectionsScore = Math.min(25, sectionsScore);

  // Subscore 3: Readability & Length (Max 15)
  let readabilityScore = 0;
  if (wordCount >= 400 && wordCount <= 1100) readabilityScore += 10;
  else if (wordCount >= 250 && wordCount <= 1500) readabilityScore += 6;
  else readabilityScore += 3;
  if (bulletPointsCount >= 4) readabilityScore += 5;
  else if (bulletPointsCount >= 2) readabilityScore += 3;
  readabilityScore = Math.min(15, readabilityScore);

  // Subscore 4: Action Verbs & Power Words (Max 15)
  let actionVerbsScore = 0;
  if (detectedActionVerbs.length >= 8) actionVerbsScore = 15;
  else if (detectedActionVerbs.length >= 5) actionVerbsScore = 12;
  else if (detectedActionVerbs.length >= 3) actionVerbsScore = 8;
  else actionVerbsScore = Math.max(3, detectedActionVerbs.length * 2);

  // Subscore 5: Quantifiable Metrics (Max 15)
  let metricsScore = 0;
  if (quantifiedMetricsCount >= 4) metricsScore = 15;
  else if (quantifiedMetricsCount >= 2) metricsScore = 10;
  else if (quantifiedMetricsCount === 1) metricsScore = 6;
  else metricsScore = 2;

  // Subscore 6: Keyword Density & Role Match (Max 15)
  let keywordsScore = 0;
  if (roleMatchPercentage >= 70) keywordsScore = 15;
  else if (roleMatchPercentage >= 50) keywordsScore = 12;
  else if (roleMatchPercentage >= 30) keywordsScore = 8;
  else keywordsScore = Math.max(3, Math.round(roleMatchPercentage * 0.15));

  let totalScore = contactScore + sectionsScore + readabilityScore + actionVerbsScore + metricsScore + keywordsScore;
  totalScore = Math.min(100, Math.max(12, totalScore));

  let grade: AtsReport['grade'] = 'Needs Work';
  if (totalScore >= 90) grade = 'A+';
  else if (totalScore >= 80) grade = 'A';
  else if (totalScore >= 68) grade = 'B';
  else if (totalScore >= 50) grade = 'C';

  // 9. Strengths, Weaknesses, Recommendations
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const recommendations: string[] = [];

  if (contactInfo.hasEmail && contactInfo.hasPhone) {
    strengths.push('Complete core contact credentials detected (Professional Email & Phone).');
  }
  if (contactInfo.hasLinkedIn) {
    strengths.push('LinkedIn profile link detected for recruiter validation and social proof.');
  }
  if (sections.experience && sections.skills && sections.education) {
    strengths.push('Core ATS sections identified: Work Experience, Technical Skills, and Education.');
  }
  if (detectedActionVerbs.length >= 5) {
    strengths.push(`High impact power verbs utilized (${detectedActionVerbs.length} distinct action verbs detected).`);
  }
  if (quantifiedMetricsCount >= 2) {
    strengths.push(`Quantifiable achievements found (${quantifiedMetricsCount} metric-driven statements with %, $, or KPI numbers).`);
  }
  if (roleMatchPercentage >= 60) {
    strengths.push(`Strong alignment with target role (${roleMatchPercentage}% match for ${targetRole}).`);
  }

  if (!contactInfo.hasEmail) {
    weaknesses.push('Missing contact email address in standard format.');
    recommendations.push('Add an easily readable email address (e.g. name@domain.com) in the top header.');
  }
  if (!contactInfo.hasPhone) {
    weaknesses.push('Missing contact phone number.');
    recommendations.push('Include a reachable phone number with international area code.');
  }
  if (!contactInfo.hasLinkedIn) {
    weaknesses.push('No LinkedIn profile URL found in the resume.');
    recommendations.push('Add your custom LinkedIn URL (e.g. linkedin.com/in/yourname) in the header.');
  }
  if (!sections.summary) {
    weaknesses.push('Missing Professional Summary or Executive Profile section.');
    recommendations.push('Add a 3-4 line summary highlighting your total years of experience, core tech stack, and top accomplishments.');
  }
  if (!sections.projects) {
    weaknesses.push('No dedicated Projects / Key Initiatives section found.');
    recommendations.push('Include 2-3 notable projects with technologies used and quantified results.');
  }
  if (quantifiedMetricsCount < 2) {
    weaknesses.push('Low density of quantifiable metrics (numbers, percentages, revenue impact).');
    recommendations.push('Quantify your bullet points using the Google X-Y-Z formula: "Accomplished [X], as measured by [Y], by doing [Z]".');
  }
  if (detectedActionVerbs.length < 4) {
    weaknesses.push('Limited action verbs detected; passive phrasing weakens ATS ranking.');
    recommendations.push('Begin every bullet point with strong power verbs like "Architected", "Spearheaded", "Engineered", "Streamlined", or "Scaled".');
  }
  if (wordCount < 350) {
    weaknesses.push(`Resume word count is low (${wordCount} words; recommended 450 - 1000 words).`);
    recommendations.push('Expand upon your project responsibilities and technical contributions to achieve optimal ATS depth.');
  } else if (wordCount > 1300) {
    weaknesses.push(`Resume length is high (${wordCount} words; exceeds recommended 2-page limit).`);
    recommendations.push('Condense older work history and remove non-essential bullet points to keep your resume concise.');
  }
  if (missingRoleKeywords.length > 0) {
    recommendations.push(`Integrate missing high-priority ${targetRole} keywords: ${missingRoleKeywords.slice(0, 6).join(', ')}.`);
  }

  return {
    score: totalScore,
    grade,
    subscores: {
      contactScore,
      sectionsScore,
      readabilityScore,
      actionVerbsScore,
      metricsScore,
      keywordsScore,
    },
    wordCount,
    readingTimeMinutes,
    bulletPointsCount,
    quantifiedMetricsCount,
    quantifiedSamples,
    contactInfo,
    sections,
    targetRole,
    detectedSkills,
    missingRoleKeywords: missingRoleKeywords.slice(0, 12),
    roleMatchPercentage,
    detectedActionVerbs,
    actionVerbsCount: detectedActionVerbs.length,
    strengths: strengths.length ? strengths : ['Standard plain text structure processed successfully.'],
    weaknesses: weaknesses.length ? weaknesses : ['No critical structural deficiencies detected.'],
    recommendations: recommendations.length ? recommendations : ['Your resume follows strong ATS compliance standards.'],
    jobDescriptionMatch,
  };
}

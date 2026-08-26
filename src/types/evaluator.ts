export interface EvaluationPillar {
  id: string;
  name: string;
  weight: number; // e.g. 0.30 for 30%
  description: string;
  iconName: string;
  criteria: string[];
}

export interface ToolProfile {
  id: string;
  name: string;
  tagline: string;
  vendor: string;
  type: 'Commercial' | 'Open Source' | 'Hybrid';
  badgeColor: string;
  scores: Record<string, number>; // Keyed by pillar id (1-10)
  keyStrengths: string[];
  limitations: string[];
  deploymentModels: string[];
  supportedProtocols: string[];
  bestSuitedFor: string;
}

export interface OwaspApiItem {
  id: string; // e.g. "API1:2023"
  title: string;
  shortName: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  description: string;
  attackScenario: string;
  testPayload: string;
  expectedStatus: string;
  remediation: string;
  remediationCode?: {
    language: string;
    snippet: string;
    description: string;
  };
  auditChecklist: string[];
}

export interface BurpTestingTopic {
  id: string;
  title: string;
  category: 'manual-pro' | 'automated-enterprise' | 'extension-bapp';
  targetVulnerability: string;
  extensionRequired?: string;
  summary: string;
  stepByStep: string[];
  proTips: string[];
  configurationSnippet?: {
    title: string;
    language: string;
    code: string;
  };
}

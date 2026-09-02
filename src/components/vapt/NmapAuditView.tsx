'use client';

import React from 'react';
import { ScanTheme } from '@/types/scanner';
import { NetworkAuditView } from '@/components/NetworkAuditView';

export interface NmapAuditViewProps {
  theme: ScanTheme;
  initialTarget?: string;
  onBackToTerminal: () => void;
}

export const NmapAuditView: React.FC<NmapAuditViewProps> = ({
  theme,
  initialTarget = 'https://example.com',
  onBackToTerminal,
}) => {
  return (
    <NetworkAuditView
      theme={theme as any}
      initialTarget={initialTarget}
      onBack={onBackToTerminal}
    />
  );
};

'use client';

import React, { StrictMode } from 'react';

interface StrictModeProviderProps {
  children: React.ReactNode;
}

export default function StrictModeProvider({ children }: StrictModeProviderProps) {
  return <StrictMode>{children}</StrictMode>;
}
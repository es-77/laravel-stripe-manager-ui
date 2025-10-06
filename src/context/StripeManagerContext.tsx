import React, { createContext, useContext, ReactNode } from 'react';
import { StripeManagerApi } from '../services/api';

interface StripeManagerContextType {
  api: StripeManagerApi;
  baseUrl: string;
  token?: string;
}

const StripeManagerContext = createContext<StripeManagerContextType | undefined>(undefined);

interface StripeManagerProviderProps {
  baseUrl: string;
  token?: string;
  children: ReactNode;
}

export const StripeManagerProvider: React.FC<StripeManagerProviderProps> = ({
  baseUrl,
  token,
  children,
}) => {
  const api = new StripeManagerApi(baseUrl, token);

  const value: StripeManagerContextType = {
    api,
    baseUrl,
    token,
  };

  return (
    <StripeManagerContext.Provider value={value}>
      {children}
    </StripeManagerContext.Provider>
  );
};

export const useStripeManagerContext = (): StripeManagerContextType => {
  const context = useContext(StripeManagerContext);
  if (context === undefined) {
    throw new Error('useStripeManagerContext must be used within a StripeManagerProvider');
  }
  return context;
};

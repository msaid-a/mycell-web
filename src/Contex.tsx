import React from 'react'

export interface AppContextInterface {
    type: string;
    opertator: string;
    nama: string;
    harga: number;
  }

  
export const AppCtx = React.createContext<AppContextInterface[] | null>(null);

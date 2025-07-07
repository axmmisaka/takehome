import { createContext, useContext } from 'react';

interface ClauseContextType {
    getCounter: (depth: number) => number;
    incrementCounter: (depth: number) => number;
    resetAllCounters: () => void;
}

export const ClauseContext = createContext<ClauseContextType | undefined>(undefined);

export const useClauseNumber = () => {
    const context = useContext(ClauseContext);
    if (context === undefined) {
        throw new Error('useClauseNumber must be used within a ClauseNumberProvider');
    }
    return context;
};
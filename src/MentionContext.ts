import { createContext, useContext } from 'react';

export interface MentionValues {
    [id: string]: string;
}

export interface MentionContextType {
    mentionValues: MentionValues;
    updateMentionValue: (id: string, newValue: string) => void;
}

export const MentionContext = createContext<MentionContextType | undefined>(undefined);

export const useMentions = () => {
    const context = useContext(MentionContext);
    if (context === undefined) {
        throw new Error('useMentions must be used within a MentionProvider');
    }
    return context;
};
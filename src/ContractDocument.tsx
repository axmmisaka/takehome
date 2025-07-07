import { isMentionNode, isTextNode, type AnyNode, type DocumentData, type Marks } from './types';
import { NodeRenderer } from './NodeRenderer';
import { useCallback, useEffect, useRef, useState } from 'react';
import { MentionContext, type MentionValues } from './MentionContext';
import { ClauseContext } from './ClauseContext';


export const ContractDocument = (
    { document }: {
        document: DocumentData
    }
) => {
    const [mentionValues, setMentionValues] = useState<MentionValues>({});
    // A bug I realised without this is that if I edit sample.ts before refresh the numbers are incorrect.
    // I pass in this version every time document changes so that ClauseContext gets destroyed completely.
    const [version, setVersion] = useState(0);
    useEffect(() => {
        setVersion(prevKey => prevKey + 1);
    }, [document]);

    const updateMentionValue = (id: string, newValue: string) => {
        setMentionValues(prev => ({
            ...prev,
            [id]: newValue,
        }));
    };

    useEffect(() => {
        const initialValues: MentionValues = {};
        const collectMentions = (nodes: AnyNode[]) => {
            nodes.forEach(node => {
                if (isMentionNode(node)) {
                    initialValues[node.id] = node.value;
                }
                if (!isTextNode(node) && node.children) {
                    collectMentions(node.children);
                }
            });
        };
        collectMentions(document);
        setMentionValues(initialValues);
    }, [document]);

    const globalClauseCounters = useRef<{ [depth: number]: number }>({});
    const getCounter = useCallback((depth: number): number => {
        return globalClauseCounters.current[depth] || 0;
    }, []);
    // ref doesn't re-render. Use this to force re-render.
    const [, setUpdate] = useState(false);
    const incrementCounter = useCallback((depth: number): number => {
        const currentCount = globalClauseCounters.current[depth] || 0;
        const newCount = currentCount + 1;
        globalClauseCounters.current[depth] = newCount;
        setUpdate(prev => !prev);
        return newCount;
    }, []);
    const resetAllCounters = useCallback(() => {
        globalClauseCounters.current = {};
        setUpdate(prev => !prev);
    }, []);

    useEffect(() => {
        resetAllCounters();
    }, [document, resetAllCounters]);

    const marks: Marks = {
        bold: false,
        italic: false,
        underline: false,
    }
    return (
        <MentionContext.Provider value={{ mentionValues, updateMentionValue }}>
            <ClauseContext.Provider key={version} value={{ getCounter, incrementCounter, resetAllCounters }}>
                <>
                    {
                        document.map(
                            (child, idx) => <NodeRenderer key={idx} node={child} inheritedMark={marks} clauseDepth={1} />
                        )
                    }
                </>
            </ClauseContext.Provider>
        </MentionContext.Provider>
    );
}

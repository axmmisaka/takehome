import { isClauseNode, isMentionNode, isTextNode, type AnyNode, type ClauseNode, type DocumentData, type Marks } from './types';
import { NodeRenderer } from './NodeRenderer';
import { useEffect, useState } from 'react';
import { MentionContext, type MentionValues } from './MentionContext';


export const ContractDocument = (
    { document }: {
        document: DocumentData
    }
) => {
    const [mentionValues, setMentionValues] = useState<MentionValues>({});
    const updateMentionValue = (id: string, newValue: string) => {
        setMentionValues(prev => ({
            ...prev,
            [id]: newValue,
        }));
    };
    // A bit anti TS pattern but best for abstraction; this maps a node (doubtful!) to [number, number];
    // where the first number is depth and second number is global number.
    // In ClauseRenderer there's a function to choose how we want to render it. 
    // We use WeakMap to allow good GC performance.
    const [clauseToNumberingMap, setClauseToNumberingMap] = useState<WeakMap<ClauseNode, [number, number]>>(new WeakMap());

    useEffect(() => {
        const initialMentionValues: MentionValues = {};

        const clauseNumberMap = new WeakMap<ClauseNode, [number, number]>();
        const depthCounters: { [depth: number]: number } = {};

        // DFS
        const traverse = (nodes: AnyNode[], currentDepth: number) => {
            nodes.forEach(node => {
                if (isMentionNode(node)) {
                    initialMentionValues[node.id] = node.value;
                }
                if (isClauseNode(node)) {
                    depthCounters[currentDepth] = (depthCounters[currentDepth] ?? 0) + 1;
                    const number = depthCounters[currentDepth];
                    clauseNumberMap.set(node, [currentDepth, number]);
                }

                if (!isTextNode(node) && node.children) {
                    const nextDepth = isClauseNode(node) ? currentDepth + 1 : currentDepth;
                    traverse(node.children, nextDepth);
                }
            });
        };

        traverse(document, 1);

        // Update both states
        setMentionValues(initialMentionValues);
        setClauseToNumberingMap(clauseNumberMap);
    }, [document]);

    const marks: Marks = {
        bold: false,
        italic: false,
        underline: false,
    }
    return (
        <MentionContext.Provider value={{ mentionValues, updateMentionValue }}>
            <>
                {
                    document.map(
                        (child, idx) => <NodeRenderer key={idx} node={child} inheritedMark={marks} clauseToNumberingMap={clauseToNumberingMap} />
                    )
                }
            </>
        </MentionContext.Provider>
    );
}

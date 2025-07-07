import React, { type JSX } from 'react';
import { isBlockNode, isClauseNode, isMentionNode, isTextNode, type AnyNode, type Marks } from './types';
import { MentionRenderer } from './MentionRenderer';
import { ClauseRenderer } from './ClauseRenderer';

export const NodeRenderer = (
    { node, inheritedMark, clauseDepth }: {
        node: AnyNode;
        inheritedMark: Marks;
        clauseDepth: number;
    }
) => {
    const myMarks: Marks = { ...inheritedMark, ...node };
    const myStyle: React.CSSProperties = {
        fontWeight: myMarks.bold ? "bold" : "normal",
        fontStyle: myMarks.italic ? "italic" : "normal",
        textDecoration: myMarks.underline ? "underline" : "none",
    };
    if (isTextNode(node)) {
        return <span style={myStyle}>{node.text}</span>
    }

    // Unfortunately TS doesn't have type-narrowing on switch
    if (isClauseNode(node)) {
        return <ClauseRenderer node={node} inheritedMark={myMarks} clauseDepth={clauseDepth} />
    }
    if (isMentionNode(node)) {
        return <MentionRenderer node={node} inheritedMark={myMarks} />
    }
    if (isBlockNode(node)) {
        return (
            <>
                {
                    node.children.map(
                        (child, idx) => (
                            <NodeRenderer key={idx} node={child} inheritedMark={myMarks} clauseDepth={clauseDepth} />
                        )
                    )
                }
            </>
        );
    }

    // Type should be a valid HTML tag at this point.
    const ElemTag = node.type as keyof JSX.IntrinsicElements;
    return (
        <ElemTag style={{ ...myStyle }}>
            {
                node.children.map(
                    (child, idx) => (
                        <NodeRenderer key={idx} node={child} inheritedMark={myMarks} clauseDepth={clauseDepth} />
                    )
                )
            }
        </ElemTag>
    )
}
import Box from "@mui/material/Box";
import type { ClauseNode, Marks } from "./types";
import { NodeRenderer } from "./NodeRenderer";
import { useClauseNumber } from "./ClauseContext";
import { useEffect, useRef, useState } from "react";

const numberToAlpha = (num: number): string => {
  if (num <= 0) {
    throw new Error("Input number must be a positive integer.");
  }

  let result = '';
  let currentNum = num;

  while (currentNum > 0) {
    const remainder = (currentNum - 1) % 26;
    result = String.fromCharCode(97 + remainder) + result;
    currentNum = Math.floor((currentNum - 1) / 26);
  }

  return result;
}

export const ClauseRenderer = (
    { node, inheritedMark, clauseDepth }:
        {
            node: ClauseNode;
            inheritedMark: Marks;
            clauseDepth: number;
        }
) => {
    const myMarks: Marks = { ...inheritedMark, ...node };

    const { incrementCounter } = useClauseNumber();
    const isInitialized = useRef(false);
    const [clauseIndex, setClauseIndex] = useState<number | null>(null);

    useEffect(() => {
        if (!isInitialized.current) {
            const newIndex = incrementCounter(clauseDepth);
            setClauseIndex(newIndex);
            isInitialized.current = true;
        }
    }, [clauseDepth, incrementCounter]);


    const currentCountText = clauseDepth % 2 === 1 ? `${clauseIndex}. ` : `(${numberToAlpha(clauseIndex ?? 1)}) `;

    return (
        <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
            <span style={{ flexShrink: 0 }}>
                {currentCountText}
            </span>
            <Box sx={{ flexGrow: 1 }}>
                {
                    node.children.map(
                        (child, idx) => <NodeRenderer key={idx} node={child} inheritedMark={myMarks} clauseDepth={clauseDepth + 1} />
                    )
                }
            </Box>
        </Box>
    )
}
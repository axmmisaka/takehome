import Box from "@mui/material/Box";
import type { ClauseNode, Marks } from "./types";
import { NodeRenderer } from "./NodeRenderer";

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

const clauseDepthAndIndexToString = (depth: number, index: number): string => {
    const cycleDepth = ((depth - 1) % 4) + 1;
    switch (cycleDepth) {
        case 1:
            return `${index}.`;
        case 2:
            return `(${numberToAlpha(index)})`;
        case 3:
            return `(${index})`;
        case 4:
            return `${numberToAlpha(index).toUpperCase()}.`;
        default:
            // This is unreachable code.
            return `${index}.`
    }
}

export const ClauseRenderer = (
    { node, inheritedMark, clauseToNumberingMap }:
        {
            node: ClauseNode;
            inheritedMark: Marks;
            clauseToNumberingMap: WeakMap<ClauseNode, [number, number]>;
        }
) => {
    const myMarks: Marks = { ...inheritedMark, ...node };

    const [depth, index] = clauseToNumberingMap.get(node) ?? [0, 0];

    return (
        <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
            <span style={{ flexShrink: 0 }}>
                {`${clauseDepthAndIndexToString(depth, index)} `}
            </span>
            <Box sx={{ flexGrow: 1 }}>
                {
                    node.children.map(
                        (child, idx) => <NodeRenderer key={idx} node={child} inheritedMark={myMarks} clauseToNumberingMap={clauseToNumberingMap} />
                    )
                }
            </Box>
        </Box>
    )
}
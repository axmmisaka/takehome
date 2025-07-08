import Box from "@mui/material/Box";
import type { Marks, MentionNode } from "./types"
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useMentions } from "./MentionContext";

export const MentionRenderer = ({ node, inheritedMark }: {
    node: MentionNode,
    inheritedMark: Marks
}) => {

    const { mentionValues, updateMentionValue } = useMentions();

    const currentMarks: Marks = { ...inheritedMark, ...node };

    const style: React.CSSProperties = {
        fontWeight: currentMarks.bold ? "bold" : "normal",
        fontStyle: currentMarks.italic ? "italic" : "normal",
        textDecoration: currentMarks.underline ? "underline" : "none",
    };

    const displayedValue = mentionValues[node.id] ?? node.value;
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(displayedValue);

    const handleDisplayClick = () => {
        setIsEditing(true);
        setEditValue(displayedValue);
    };

    const handleSave = () => {
        if (editValue !== displayedValue) {
            updateMentionValue(node.id, editValue);
        }
        setIsEditing(false);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditValue(event.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSave();
            event.currentTarget.blur();
        }
    };

    return (
        <>
            {isEditing ? (
                <TextField
                    value={editValue}
                    onChange={handleInputChange}
                    onBlur={handleSave}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    variant="standard"
                    sx={{
                        backgroundColor: node.color,
                        borderRadius: '4px',
                        padding: '2px 6px',
                        color: 'black',
                        cursor: 'pointer',
                        display: 'inline-block',
                        ...style
                    }}
                />
            ) : (
                <Box
                    component="span"
                    sx={{
                        backgroundColor: node.color,
                        borderRadius: '4px',
                        padding: '2px 6px',
                        color: 'black',
                        cursor: 'pointer',
                        display: 'inline-block',
                        ...style
                    }}
                    onClick={handleDisplayClick}
                >
                    {displayedValue}
                </Box>
            )}
        </>
    );
};
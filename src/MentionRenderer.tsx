import Box from "@mui/material/Box";
import type { Marks, MentionNode } from "./types"
import TextField from "@mui/material/TextField";
import { useState, useRef, useEffect, useCallback } from "react";
import { useMentions } from "./MentionContext";
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format, parse, isValid } from 'date-fns';
import Popover from '@mui/material/Popover';

const DATE_FORMAT = 'MMMM dd, yyyy';

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

    const displayedValue = mentionValues[node.id] || node.value;
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(displayedValue);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const textFieldRef = useRef<HTMLInputElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);

    const handleDisplayClick = () => {
        setIsEditing(true);
        setEditValue(displayedValue);
    };

    const handleSave = useCallback(() => {
        if (editValue !== displayedValue) {
            updateMentionValue(node.id, editValue);
        }
        setIsEditing(false);
        setAnchorEl(null);
    }, [displayedValue, editValue, node.id, updateMentionValue]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditValue(event.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSave();
            event.currentTarget.blur();
        } else if (event.key === 'Escape') {
            setAnchorEl(null);
        }
    };

    const handleDateChange = (newDate: Date | null) => {
        if (newDate && isValid(newDate)) {
            setEditValue(format(newDate, DATE_FORMAT));
            setAnchorEl(null);
        }
    };

    const getDateValue = () => {
        try {
            const parsed = parse(editValue, DATE_FORMAT, new Date());
            return isValid(parsed) ? parsed : null;
        } catch {
            return null;
        }
    };

    const handleTextFieldFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        if (node.variableType === 'Date') {
            setAnchorEl(event.currentTarget);
        }
    };

    useEffect(() => {
        if (!isEditing) return;

        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            const isTextFieldClick = textFieldRef.current?.contains(target);
            const isPopoverClick = popoverRef.current?.contains(target);

            const isBackdropClick = (target as HTMLElement).classList?.contains('MuiBackdrop-root');

            if (!isTextFieldClick && !isPopoverClick) {
                handleSave();
            } else if (isBackdropClick) {
                setAnchorEl(null);
                setTimeout(() => textFieldRef.current?.focus(), 0);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isEditing, editValue, displayedValue, handleSave]);

    const isDateType = node.variableType === 'Date';
    const open = Boolean(anchorEl) && isDateType;

    return (
        <>
            {isEditing ? (
                <>
                    <TextField
                        ref={textFieldRef}
                        value={editValue}
                        onChange={handleInputChange}
                        onFocus={handleTextFieldFocus}
                        onBlur={() => { }}
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
                    {isDateType && (
                        <Popover
                            ref={popoverRef}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={() => {
                                setAnchorEl(null);
                                setTimeout(() => {
                                    textFieldRef.current?.focus();
                                }, 0);
                            }}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            disableAutoFocus
                            disableEnforceFocus
                            disableRestoreFocus
                        >
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <StaticDatePicker
                                    displayStaticWrapperAs="desktop"
                                    value={getDateValue()}
                                    onChange={handleDateChange}
                                />
                            </LocalizationProvider>
                        </Popover>
                    )}
                </>
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
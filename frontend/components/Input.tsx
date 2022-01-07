import React, { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import styles from '../styles/Input.module.scss';
import { Flex } from './Flex';

interface Props {
    placeholder?: string;
    defaultValue?: string;
    onSubmit?: (value: string) => void;
    onChange?: (value: string) => void;
    onBlur?: (value: string) => void;
    label?: string;
    textArea?: boolean
    className?: string;
    clearOnSubmit?: boolean;
    focusOnMount?: boolean;
}
export const Input: React.FC<Props> = ({ placeholder, defaultValue, onSubmit, onChange, label, textArea, className, clearOnSubmit, onBlur, focusOnMount }) => {
    const [value, setValue] = useState(defaultValue || '');
    const inputRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    
    // Focusing input on mount if focusOnMount=true
    useEffect(() => {
        if(focusOnMount) {
            inputRef.current?.focus();
            textareaRef.current?.focus();
        }
    }, [focusOnMount]);

    useEffect(() => {
        setValue(defaultValue || '');
    }, [defaultValue]);

    const handleChange = useMemo(() => (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setValue(value);
        if(onChange) onChange(value);
    }, [onChange]);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(value === '') return;
        if(onSubmit) {
            onSubmit(value);
            if(clearOnSubmit) {
                setValue('');
            }
        }
    }
    const handleBlur = () => {
        if(onBlur) {
            onBlur(value);
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <Flex flexDirection={'column'}>
                {label && (
                    <label 
                        htmlFor={label.toLowerCase()} 
                        className={styles.label}
                    >
                        {label}
                    </label>
                )}
                {!textArea ? (
                    <input 
                        value={value}
                        onChange={handleChange}
                        placeholder={placeholder}
                        className={styles.input + ' ' + (className ? className : '')}
                        id={label?.toLowerCase()}
                        onBlur={handleBlur}
                        ref={inputRef}
                    />
                ) : (
                    <textarea 
                        value={value}
                        onChange={handleChange}
                        placeholder={placeholder}
                        className={styles.input + ' ' + styles.textarea + ' ' + (className ? className : '')}
                        id={label?.toLowerCase()}
                        onBlur={handleBlur}
                        ref={textareaRef}
                    />
                )}
            </Flex>
        </form>
    )
}
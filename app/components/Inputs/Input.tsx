'use client'

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
    id,
    label,
    type,
    disabled,
    required,
    register,
    errors
}) => {
    return ( 
        <div className="w-full relative">
            <input 
                autoComplete="off"
                id={id}
                disabled={disabled}
                {...register(id, {required})}
                placeholder=""
                type={type}
                className={`
                    peer
                    w-full
                    p-4
                    pt-6
                    outline-none
                    bg-white
                    font-light
                    border-2
                    rounded-md
                    transition
                    border-solid
                    disabled:opacity-70
                    disabled:cursor-not-allowed
                    ${errors[id] ? 'border-red-400':'border-pink-200'}
                    ${errors[id] ? 'focus:border-red-400':'focus:border-pink-300'}
                    `}/>
            <label 
                className="
                    absolute 
                    cursor-text
                    text-md
                    duration-150
                    transform
                    -translate-y-3
                    top-5
                    z-10
                    origin-[0]
                    left-4
                    peer-placeholder-shown:scale-100
                    peer-placeholder-shown:translate-y-0
                    peer-focus:scale-75
                    peer-focus:-translate-y-4" 
                htmlFor={id}>{label}</label>
        </div>
     );
}
 
export default Input;
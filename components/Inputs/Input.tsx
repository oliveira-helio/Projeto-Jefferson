"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { ChangeEventHandler } from "react";

interface InputProps {
	id: string;
	label: string;
	type?: string;
	disabled?: boolean;
	required?: boolean;
	register: UseFormRegister<FieldValues> ;
	errors: FieldErrors;
	onChange?: ChangeEventHandler<HTMLInputElement> | ((e: React.ChangeEvent<HTMLInputElement>) => void)
	custom?: string,
	min?: number,
	value?: string,
	accept?: string,
}

const Input: React.FC<InputProps> = ({
	id,
	label,
	type,
	disabled,
	required,
	register,
	errors,
	custom,
	min, 
	value,
	onChange,
	accept,
}) => {
	
	return (
		<div className="w-full relative">
			<input
				autoComplete="off"
				id={id}
				disabled={disabled}
				{...register(id, {
					required,
					...(type === "email" && {
					  pattern: {
						 value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
						 message: "Insira um e-mail válido no formato exemplo@exemplo.com ou similar",
					  },
					}),
					...(type === "password" && {
						pattern: {
						  value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,-_])[A-Za-z\d@$!%*?&]{8,20}$/,
						  message: "Senha inválida",
						},
					 }),
				 })}
				placeholder=""
				type={type}
				min={min}
				value={value}
				onChange={onChange}
				accept={accept}
				className={`
                    transition
                    disabled:opacity-70
                    disabled:cursor-not-allowed
					${custom ? custom : ""}
                    ${errors[id] ? "border-red-400" : "border-pink-300"}
                    ${errors[id]
						? "focus:border-red-400"
						: "focus:border-pink-200"
					}
                    `}
			/>
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
				htmlFor={id}
			>
				{label}
			</label>
			{errors[id] && (
				<span className="text-red-500 text-sm">
					{errors[id].message?.toString()}
				</span>
			)}
		</div>
	);
};

export default Input;

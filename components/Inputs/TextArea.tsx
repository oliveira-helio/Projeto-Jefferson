"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { ChangeEventHandler } from "react";

interface TextAreaProps {
	id: string;
	label: string;
	disabled?: boolean;
	required?: boolean;
	register: UseFormRegister<FieldValues> ;
	errors: FieldErrors;
	onChange?: ChangeEventHandler<HTMLInputElement>;
	custom?: string,
}

const TextArea: React.FC<TextAreaProps> = ({
	id,
	label,
	disabled,
	required,
	register,
	errors,
	custom,
}) => {
	
	return (
		<div className="w-full relative">
			<textarea
				autoComplete="off"
				id={id}
				disabled={disabled}
				{...register(id, { required })}
				placeholder=""
				className={`
                    transition
                    disabled:opacity-70
                    disabled:cursor-not-allowed
					${custom ? custom : ""}
                    ${errors[id] ? "border-red-400" : "border-pink-200"}
                    ${errors[id]
						? "focus:border-red-400"
						: "focus:border-pink-300"
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

export default TextArea;

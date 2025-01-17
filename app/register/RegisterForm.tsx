"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Button from "../components/MicroComponents/Button";
import Input from "../components/Inputs/Input";
import { AiOutlineGoogle } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import CheckCircleOutlineSharpIcon from "@mui/icons-material/CheckCircleOutlineSharp";
import apiAdress from "@/utils/api";

const RegisterForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<FieldValues>({
		defaultValues: { name: "", email: "", password: "" },
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);
		try { 
			fetch(`${apiAdress}/register`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});
		} catch (error) {
			console.log("Erro ao realizar o cadastro:", error);
		};
		setIsLoading(false);
		console.log(data);
		window.location.href = "/"
	};

	const googleAuth = () => {
		window.location.href = `http://localhost:5000/auth/google`;
	 };
	 
	const facebookAuth = () => {
		window.location.href = "/auth/facebook"
	};

	// Watch the password field
	const password = watch("password");

	useEffect(() => {
		console.log("Password changed:", password);
	}, [password]);

	// Regras de validação da senha
	const rules = [
		{
			test: (value: string) => value.length >= 8 && value.length <= 25,
			message: "Possuir entre 8 e 25 caractéres",
		},
		{
			test: (value: string) => /[A-Z]/.test(value) && /[a-z]/.test(value),
			message: "Possuir letras maiúsculas e minúsculas",
		},
		{
			test: (value: string) => /\d/.test(value),
			message: "Possuir pelo menos 1 número",
		},
		{
			test: (value: string) => /[.,!@#$&\-_£¢]/.test(value),
			message: "Possuir pelo menos 1 caractére especial (.,!@#$&-_£¢)",
		},
	];

	return (
		<>
		<div className="flex flex-col md:flex-row gap-4 justify-evenly items-center w-full px-4">

			<Button
				outline
				label="Acesse com Google"
				icon={AiOutlineGoogle}
				onClick={googleAuth}
				custom="w-[50%] text-4xl"
				customsize={28}
				/>
			<Button
				outline
				label="Acesse com Facebook"
				icon={FaFacebookF}
				onClick={() => (facebookAuth)}
				custom="w-[50%] text-4xl"
				customsize={28}
				/>
				</div>

			<p className="font-medium text-xl">ou</p>

			<h1 className="self-center text-pink-500 font-bold text-3xl z-10 w-fit">
				Registre-se
			</h1>

			<Input
				id="name"
				label="Nome"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
				type="text"
			/>
			<Input
				id="email"
				label="E-mail"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
				type="email"
			/>
			<Input
				id="password"
				label="Senha"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
				type="password"
			/>

			<div className="text-left text-pink-500 flex flex-col justify-start items-start w-full text-sm">
				<p className="font-medium">Sua senha deve:</p>
				{rules.map((rule, index) => (
					<p
						key={index}
						className={`flex items-center ${rule.test(password) ? "text-pink-500" : "text-red-600"
							}`}
					>
						<CheckCircleOutlineSharpIcon fontSize="inherit" />
						{rule.message}
					</p>
				))}
			</div>

			<Button
				label={isLoading ? "Carregando" : "Enviar"}
				onClick={handleSubmit(onSubmit)}
				custom="w-[65%] text-3xl"
			/>
			<p>
				Já possui uma conta?{" "}
				<Link href={"/login"} className="font-semibold text-pink-500 underline">
					Fazer Login
				</Link>
			</p>
		</>
	);
};

export default RegisterForm;

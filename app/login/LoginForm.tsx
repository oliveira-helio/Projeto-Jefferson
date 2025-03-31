"use client";

import { useState, useContext } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { AuthContext } from "@/Contexts/AuthContext"; // Importando o contexto
import { AiOutlineGoogle } from "react-icons/ai";
import Link from "next/link";
import { useCart } from "@/Hooks/useCart";
import { useRouter } from "next/navigation";
import Input from "../../components/Inputs/Input";
import Button from "../../components/MicroComponents/Button";
import apiAdress from "@/utils/api";

type logInResponse = {
  status: number;
  data: data | string;
};

type data = {
  accessToken: string,
  message: string,
  user:{
    birthDate?: string,
    cpf?: string,
    email: string,
    gender?: string,
    id: number,
    isAdmin?: boolean,
    name: string,
    phone?: string,
    profilePicture?: string,
    provider?: string,
    surname: string
  }
}


const LoginForm = () => {
  const router = useRouter();
  const { login } = useContext(AuthContext); // Obtendo o método login do AuthContext
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { email: "", password: "" },
  });
  const [isLoading, setIsLoading] = useState(false);
  const { syncLocalCartToBackend } = useCart();

  const handleGoogleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID; // ID do cliente do Google
    const redirectUri = "http://localhost:3000/user/auth/google"; // Callback do Google para o seu frontend
    const scope = "openid email profile"; // Dados que você quer acessar
    const responseType = "token"; // Ou "code" se for usar um backend depois
  
    const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&scope=${scope}`;
  
    window.location.href = authUrl; // Redireciona o usuário para o Google
  };
  

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      const logInResponse = await login(data); // Aguarda o token
      if ((logInResponse as logInResponse).status >= 200 && (logInResponse as logInResponse).status < 300) {
        router.push("/login/update-cart"); // Redireciona para a página de sincronização
      } else if ((logInResponse as logInResponse).status < 200 || (logInResponse as logInResponse).status >= 300) {
        toast.error("Falha ao realizar o login", { id: "login-error-toast-1" });
      } 
    } catch (error) {
      toast.error("Erro ao fazer login");
      console.error("Erro ao realizar o login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1 className="self-center text-pink-500 font-bold text-3xl z-10 w-fit">
        Acesse sua conta
      </h1>

      <Input
        id="email"
        label="E-mail"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="e-mail"
        custom="
                    peer
					w-full
                    p-4
                    pt-6
                    outline-none
                    bg-white
                    font-light
                    border-2
                    rounded-md
                    border-solid
                "
      />
      <Input
        id="password"
        label="Senha"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
        custom="
                    peer
					w-full
                    p-4
                    pt-6
                    outline-none
                    bg-white
                    font-light
                    border-2
                    rounded-md
                    border-solid
                "
      />
      <Button
        label={isLoading ? "Carregando" : "Acessar"}
        onClick={handleSubmit(onSubmit)}
        custom="w-[65%] text-3xl"
      />
      <p>
        Não possui uma conta?{" "}
        <Link
          href={"/register"}
          className="font-semibold text-pink-500 underline"
        >
          Cadastre-se
        </Link>
      </p>

      <p className="font-medium text-xl">ou</p>

      <Button
        outline
        label="Acesse com Google"
        icon={AiOutlineGoogle}
        onClick={handleGoogleLogin}
        custom="w-[65%] text-4xl"
        customsize={28}
      />
    </>
  );
};

export default LoginForm;

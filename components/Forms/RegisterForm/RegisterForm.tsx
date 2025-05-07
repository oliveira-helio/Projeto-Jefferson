"use client";

import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Button from "../MicroComponents/Default/Button";
import Input from "../Inputs/Input";
import { AiOutlineGoogle } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import CheckCircleOutlineSharpIcon from "@mui/icons-material/CheckCircleOutlineSharp";
import CancelIcon from "@mui/icons-material/Cancel";
import apiAdress from '@/utils/variables/api';
import { useAuth } from "@/hooks/UseAuth/useAuth";
import { useRouter } from "next/navigation";

type Response = {
  status: number;
  data: data | string;
};

type data = {
  accessToken: string,
  message: string,
  user: {
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

const RegisterForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [existingUser, setExistingUser] = useState(false);
  const { registerUser } = useAuth(); // Obtendo o método registerUser do AuthContext
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      const response = await registerUser(data);
      if ((response as Response).status >= 200 && (response as Response).status < 300) {
        setIsLoading(false);
        window.location.href = "/";
      } else if ((response as Response).status === 400) {
        setExistingUser(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Erro ao realizar o cadastro:", error);
    } finally {
      setIsLoading(false);
    };
  };

  const googleAuth = () => {
    window.location.href = `${apiAdress}/auth/google`;
  };

  const facebookAuth = () => {
    window.location.href = `${apiAdress}/auth/facebook`;
  };

  // Watch the password field
  const [password, setPassword] = useState("");

  // Password validation rules
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
      test: (value: string) => /[.!@#$&_£¢-]/.test(value),
      message: "Possuir pelo menos 1 caractére especial (.!@#$&-_£¢)",
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

      <form className="flex flex-col gap-4 justify-center items-center w-full">
        <Input
          id="name"
          label="Nome"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          type="text"
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
          id="email"
          label="E-mail"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          type="email"
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
          onChange={(e) => setPassword(e.target.value)}
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

        <div className="text-left text-pink-500 flex flex-col justify-start items-start w-full text-sm">
          <div className="text-left text-sm w-full">
            <p className="font-medium text-gray-700">Sua senha deve:</p>
            {rules.map((rule, index) => {
              const isValid = rule.test(password);
              return (
                <p
                  key={index}
                  className={`flex items-center gap-2 transition-all duration-300 ${isValid ? "text-green-500" : "text-red-500"
                    }`}
                >
                  {isValid ? (
                    <CheckCircleOutlineSharpIcon fontSize="inherit" />
                  ) : (
                    <CancelIcon fontSize="inherit" />
                  )}
                  {rule.message}
                </p>
              );
            })}
          </div>
        </div>

        <Button
          label={isLoading ? "Carregando" : "Enviar"}
          onClick={handleSubmit(onSubmit)}
          custom="w-[65%] text-3xl"
        />
      </form>
      <p>
        Já possui uma conta?{" "}
        <Link href={"/login"} className="font-semibold text-pink-500 underline">
          Fazer Login
        </Link>
      </p>
      {existingUser && (
        <div className="flex flex-col fixed z-40 gap-4 justify-center items-center w-fit p-6 rounded-lg shadow-lg bg-pink-200 min-h-[25%]">
          <h1 className="self-center text-pink-500 font-bold text-3xl z-10 w-fit">
            E-mail já cadastrado
          </h1>
          <p className="text-red-500 text-base">
            Já existe uma conta cadastrada com este e-mail.
          </p>
          <Button
            label="Fazer Login"
            onClick={() => {
              setExistingUser(false)
              router.push("/login")
            }
            }
            custom="w-[65%] text-3xl"
            customsize={28}
          />
        </div>
      )}
      {existingUser && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setExistingUser(false)}
        ></div>
      )}
    </>
  );
};

export default RegisterForm;

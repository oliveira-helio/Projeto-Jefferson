'use client'

import { useState, useContext } from "react";
import Input from "../../components/Inputs/Input"; 
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Button from "../../components/MicroComponents/Button";
import { AiOutlineGoogle } from "react-icons/ai";
import Link from "next/link";
import { AuthContext } from "@/Contexts/AuthContext"; // Importando o contexto
import toast from "react-hot-toast";
import { useCart } from "@/Hooks/useCart";
import { useRouter } from "next/navigation";

const LoginForm = () => {
    const router = useRouter()
    const { login } = useContext(AuthContext); // Obtendo o método login do AuthContext
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: { email: "", password: "" }
    });
    const [isLoading, setIsLoading] = useState(false);
    const {fetchCart} = useCart()

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);
        try {
            await login(data); 
            toast.success("Login bem-sucedido",{ id: "login-toast-1" });
            await fetchCart();
            console.log('logado');
            router.push('/')
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
            <Button label={isLoading ? "Carregando" : "Acessar"} onClick={handleSubmit(onSubmit)}
            custom="w-[65%] text-3xl"/>
            <p>Não possui uma conta? <Link href={'/register'} className="font-semibold text-pink-500 underline">Cadastre-se</Link></p>

            <p className="font-medium text-xl">ou</p>

            <Button
                outline
                label="Acesse com Google"
                icon={AiOutlineGoogle}
                onClick={() => {}}
                custom="w-[65%] text-4xl"
                customsize={28}/>
        </>
    );
};

export default LoginForm;

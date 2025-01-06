'use client'

import { useState } from "react";
import Input from "../components/Inputs/Input"; 
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Button from "../components/MicroComponents/Button";
import { AiOutlineGoogle } from "react-icons/ai";
import Link from "next/link";

const RegisterForm = () => {

    const [isLoading, setIsLoading] = useState(false)
    const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({defaultValues: {name: "", email: "", password: ""}})
    const onSubmit:SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        console.log(data);
        
    }

    return ( 
        <>  
            <Button
            outline
            label="Acesse com Google"
            icon={AiOutlineGoogle}
            onClick={()=>{}}
            custom="w-[65%] text-4xl"
            customsize={28}/>

            {/* <hr className="bg-slate-300 w-full h-px"></hr> */}
            <p className="font-medium text-xl">ou</p>
            {/* <hr className="bg-slate-300 w-full h-px"></hr> */}

            <h1 className="self-center text-pink-500 font-bold text-3xl z-10 w-fit">
                    Registre-se
            </h1> 
            
            <Input 
                id="nome"
                label="Nome"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input 
                id="e-mail"
                label="E-mail"
                type="email"
                disabled={isLoading}
                register={register}
                errors={errors}
                // TODO validar formatos de senhas e emails
                required
                {...register('email', {
                    required: 'Email is required',
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Formato de e-mail inválido',
                    },
                })}
            />
            <Input 
                id="senha"
                label="Senha"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                type="password"
            />
            <Button label={isLoading ? "Carregando" : "Enviar"} onClick={handleSubmit(onSubmit)}
            custom="w-[65%] text-3xl"/>
            <p>Já possui uma conta? <Link href={'/login'} className="font-semibold text-pink-500 underline">Fazer Login</Link></p>
        </>
     );
}
 
export default RegisterForm;
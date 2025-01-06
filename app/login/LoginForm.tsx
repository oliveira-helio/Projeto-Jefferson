'use client'

import { useState } from "react";
import Input from "../components/Inputs/Input"; 
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Button from "../components/MicroComponents/Button";
import { AiOutlineGoogle } from "react-icons/ai";
import Link from "next/link";

const LoginForm = () => {

    const [isLoading, setIsLoading] = useState(false)
    const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({defaultValues: {email: "", password: ""}})
    const onSubmit:SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        console.log(data);
        
    }

    return ( 
        <>  
            <h1 className="self-center text-pink-500 font-bold text-3xl z-10 w-fit">
                    Acesse sua conta
            </h1> 

            <Input 
                id="e-mail"
                label="E-mail"
                disabled={isLoading}
                register={register}
                errors={errors}
                // TODO validar formatos de senhas e emails
                required
                type="e-mail"
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
            <Button label={isLoading ? "Carregando" : "Acessar"} onClick={handleSubmit(onSubmit)}
            custom="w-[65%] text-3xl"/>
            <p>Não possui uma conta? <Link href={'/register'} className="font-semibold text-pink-500 underline">Cadastre-se</Link></p>

            {/* <hr className="bg-slate-300 w-full h-px"></hr> */}
            <p className="font-medium text-xl">ou</p>
            {/* <hr className="bg-slate-300 w-full h-px"></hr> */}

            <Button
            outline
            label="Acesse com Google"
            icon={AiOutlineGoogle}
            onClick={()=>{}}
            custom="w-[65%] text-4xl"
            customsize={28}/>
        </>
     );
}
 
export default LoginForm;
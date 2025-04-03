'use client';

import apiAdress from "@/utils/api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const UserAuth = () => {
    const router = useRouter();
    
    useEffect(() => {
        if (typeof window === "undefined") return;
            const fetchSession = async () => {
            try {
                const response = await fetch(`${apiAdress}/token/refresh`, {
                    credentials: "include" // Necessário para enviar cookies cross-site
                });

                if (!response.ok) throw new Error("Erro ao obter sessão");
                
                const data = await response.json();
                localStorage.setItem("accessToken", data.accessToken);
                localStorage.setItem("user", JSON.stringify(data.user));
                router.push("/login/update-cart"); // Redireciona para a home
            } catch (error) {
                console.error("Erro ao autenticar usuário", error);
                router.push("/login"); // Se falhar, volta para registro
            }
        };
    
        fetchSession();
    }, [router]);
    
    

return null;
}

export default UserAuth;
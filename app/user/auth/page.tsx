'use client';

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const UserAuth = () => {
    const router = useRouter();
    
    useEffect(() => {
        if (typeof window === "undefined") return;
        const fetchSession = async () => {
            try {
                const response = await fetch("https://api.backend.pincelepoesia.com/token/refresh", {
                    credentials: "include" // Necessário para enviar cookies cross-site
                });
    
                if (!response.ok) throw new Error("Erro ao obter sessão");

                const data = await response.json();
                localStorage.setItem("accessToken", data.accessToken);
                localStorage.setItem("user", JSON.stringify(data.user));
    
                router.push("/"); // Redireciona para a home
            } catch (error) {
                console.error("Erro ao autenticar usuário", error);
                router.push("/register"); // Se falhar, volta para registro
            }
        };
    
        fetchSession();
    }, [router]);
    
    

return null;
}

export default UserAuth;
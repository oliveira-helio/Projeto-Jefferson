'use client';
import apiAdress from "@/utils/api";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const UserAuth = () => {
    const router = useRouter();
    
    useEffect(() => {
        if (typeof window === "undefined") return;

        const fetchSession = async () => {
            try {
                const response = await axios.post(`${apiAdress}/token/refresh`, {}, { withCredentials: true });
                const data = response.data;
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem("user", JSON.stringify(data.user));
    
                router.push("/login/update-cart"); // Redireciona para a home
            } catch (error) {
                console.error("Erro ao autenticar usuário", error);
                // router.push("/register"); // Se falhar, volta para registro
            }
        };
    
        fetchSession();
    }, [router]);
    
    

return null;
}

export default UserAuth;
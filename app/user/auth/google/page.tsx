"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const GoogleAuthPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get("code");
    let state = urlParams.get("state");
		let error = urlParams.get("error");

    if (error) {
      console.error("Erro ao autenticar:", error);
      return;
    }

      console.log("🔹 Code:", code);
    	console.log("🔹 State:", state);


      
      // Enviar o código para o backend para trocar por um token
    //   fetch("https://seusite.com/api/auth/google", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ code }),
    //   })
    //   .then(res => res.json())
    //   .then(data => {
    //     console.log("🔹 Resposta do backend:", data);
    //     // Armazene o token no localStorage ou context API
    //   })
    //   .catch(err => console.error("Erro ao autenticar:", err));
    
  }, [searchParams, router]);

//   const { setUser, setAccessToken } = useAuth();

//   useEffect(() => {
//     const authenticate = async () => {
//       try {
//         const response = await axios.get(`${apiAdress}/api/auth/me`, { withCredentials: true });
        
//         if (response.status === 200) {
//           setUser(response.data.user);
//           setAccessToken(response.data.accessToken);
//           toast.success("Login realizado com sucesso!");
//           router.push("/"); // Redireciona para a home
//         } else {
//           throw new Error("Erro ao autenticar.");
//         }
//       } catch (error) {
//         toast.error("Erro ao autenticar.");
//         router.push("/login"); // Redireciona para login caso falhe
//       }
//     };

//     authenticate();
//   }, [router, setUser, setAccessToken]);

  return <p>Autenticando...</p>;
};

export default GoogleAuthPage;

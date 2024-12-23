"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Order } from "@/utils/interfaces"; // Interface dos tipos de dados
import apiAdress from "@/utils/api";

// TODO revisar tudo!!!

export default function UserPage() {
  const router = useRouter();

  // Estado para o login
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  // Estado para os pedidos
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Função de login
  const login = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiAdress}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (data.success) {
        setUser(data.user);
        setIsLoggedIn(true);
      } else {
        alert("Credenciais inválidas.");
      }
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      alert("Ocorreu um erro ao tentar fazer login.");
    } finally {
      setLoading(false);
    }
  };

  // Função para carregar os pedidos
  const loadOrders = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const response = await fetch(`${apiAdress}/orders?userId=${user.id}`);
      const data = await response.json();
      setOrders(data.orders);
    } catch (error) {
      console.error("Erro ao carregar pedidos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Carregar pedidos após login
  useEffect(() => {
    if (isLoggedIn) {
      loadOrders();
    }
  }, [isLoggedIn, user]);

  // Formatação de pedidos
  const renderOrderStatus = (status: string) => {
    switch (status) {
      case "pending":
        return <span className="text-yellow-500">Pendente</span>;
      case "shipped":
        return <span className="text-blue-500">Enviado</span>;
      case "delivered":
        return <span className="text-green-500">Entregue</span>;
      default:
        return <span className="text-gray-500">Desconhecido</span>;
    }
  };

  // Renderização de avaliações
  const handleRating = (orderId: number, rating: number) => {
    // Função para enviar avaliação para o backend
    fetch(`${apiAdress}/orders/${orderId}/rate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rating }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Avaliação enviada com sucesso!");
          loadOrders(); // Atualiza os pedidos após avaliação
        }
      })
      .catch((error) => {
        console.error("Erro ao enviar avaliação:", error);
        alert("Ocorreu um erro ao enviar a avaliação.");
      });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-xl mx-auto">
      {/* Login Form */}
      {!isLoggedIn ? (
        <div>
          <h2 className="text-3xl text-pink-500 font-bold mb-4">Login</h2>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full p-2 mt-2 border border-gray-300 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm text-gray-700">
              Senha
            </label>
            <input
              id="password"
              type="password"
              className="w-full p-2 mt-2 border border-gray-300 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            onClick={login}
            className="w-full bg-pink-500 text-white py-2 rounded-md"
            disabled={loading}
          >
            {loading ? "Carregando..." : "Entrar"}
          </button>
        </div>
      ) : (
        // User Dashboard
        <div>
          <h2 className="text-3xl text-pink-500 font-bold mb-4">
            Bem-vindo, {user?.name}
          </h2>

          <div className="mb-6">
            <h3 className="text-xl text-gray-700 font-semibold">
              Meus Pedidos
            </h3>
            <ul className="space-y-4 mt-4">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <li
                    key={order.id}
                    className="border p-4 rounded-md shadow-sm"
                  >
                    <div className="flex justify-between items-center">
                      <div className="text-gray-700">
                        <p>
                          <strong>Pedido #{order.id}</strong>
                        </p>
                        <p>Status: {renderOrderStatus(order.status)}</p>
                      </div>

                      {/* Avaliação */}
                      {order.status === "delivered" && (
                        <div className="flex items-center">
                          <button
                            onClick={() => handleRating(order.id, 5)}
                            className="bg-yellow-500 text-white p-2 rounded-md mr-2"
                          >
                            ⭐ Avaliar
                          </button>
                        </div>
                      )}
                    </div>
                  </li>
                ))
              ) : (
                <div className="text-gray-500">Você ainda não fez pedidos.</div>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/login', { email, password });
      const { token } = response.data;

      // Salva o token no localStorage ou cookie
      if (typeof window !== "undefined" && token) {
        localStorage.setItem('admToken', token);
      };

      // Redireciona para o dashboard
      toast.success('Login realizado com sucesso!');
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao realizar login. Verifique suas credenciais.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-4">Login - Dashboard</h1>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">
            E-mail
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium">
            Senha
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

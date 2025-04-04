'use client'
import React, { createContext } from 'react';
import axios from 'axios';
import apiAdress from '@/utils/api';
import { FieldValues } from 'react-hook-form';
import toast from 'react-hot-toast';

interface ProductContextData {
  searchProduct: (Data: FieldValues) => Promise<any>;
  productRegister: (Data: FieldValues) => Promise<void>;
  productEdit: (Data: FieldValues) => Promise<void>;
  productDelete: (Data: FieldValues) => Promise<void>;
}

export const ProductContext = createContext<ProductContextData>({} as ProductContextData);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const searchProduct = async (data: FieldValues) => {
    console.log('data',data);
    
    try {
      const response = await axios.get(`${apiAdress}/product`, {
        params: data,
        withCredentials: true, 
      });
      
      console.log('response:',response.data);
      
      return response.data; // Retorna os dados do produto
    } catch (error) {
      console.log("Erro ao buscar o produto:", error);
      toast.error("Produto não encontrado");
      throw error;
    }
  };

  const productRegister = async (data: FieldValues) => {
    
    const formData = new FormData();

    // Adiciona os campos normais
    Object.keys(data).forEach((key) => {
        formData.append(key, String(data[key])); // Converte para string para evitar problemas
    });

    // Adiciona as imagens
    data.images.forEach((image: any) => {
      if (image.file instanceof File) {
        formData.append("images", image.file); // Envia as imagens sob a mesma chave
        formData.append("is_generic", String(image.is_generic)); // Envia is_generic separadamente
      }
    });

    try {
      const response = await axios.post(`${apiAdress}/product/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      toast.success("Produto cadastrado com sucesso!");
      return response.data;
    } catch (error) {
      console.error("Erro ao cadastrar o produto:", error);
      toast.error("Erro ao cadastrar o produto. Tente novamente.");
      throw error;
    }
  };

  const productEdit = async (data: FieldValues) => {
    const formData = new FormData();

    // Adiciona os campos normais
    Object.keys(data).forEach((key) => {
        formData.append(key, String(data[key])); // Converte para string para evitar problemas
    });

    // Adiciona as imagens
    data.images.forEach((image: any) => {
      if (image.file instanceof File) {
        formData.append("images", image.file); // Envia as imagens sob a mesma chave
        formData.append("is_generic", String(image.is_generic)); // Envia is_generic separadamente
      }
    });

    try {
      const response = await axios.put(`${apiAdress}/product/edit`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      toast.success("Produto alterado com sucesso!");
      return response.data;
    } catch (error) {
      console.error('Erro ao alterar o produto:', error);
      toast.error("Erro ao alterar o produto. Tente novamente.");
      throw error;
    }
  };

  const productDelete = async (data: FieldValues) => {
    try {
      const response = await axios.delete(`${apiAdress}/product/delete`, { data, withCredentials: true, });
      toast.success("Produto excluído com sucesso!");
      return response.data;
    } catch (error) {
      console.error('Erro ao excluir o produto:', error);
      toast.error("Erro ao excluir o produto. Tente novamente.");
      throw error;
    }
  };

  return (
    <ProductContext.Provider value={{ searchProduct, productRegister, productEdit, productDelete }}>
      {children}
    </ProductContext.Provider>
  );
};
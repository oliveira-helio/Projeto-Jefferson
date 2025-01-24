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
        params: data, // Passa os dados como parâmetros de URL
      });
      
      
      return response.data; // Retorna os dados do produto
    } catch (error) {
      console.log("Erro ao buscar o produto:", error);
      toast.error("Erro ao buscar o produto. Tente novamente.");
      throw error;
    }
  };

  const productRegister = async (data: FieldValues) => {
    console.log("tentou registrar produto")
    try {
      const response = await axios.post(`${apiAdress}/products/register`, data);
      toast.success("Produto cadastrado com sucesso!");
      return response.data;
    } catch (error) {
      console.error("Erro ao cadastrar o produto:", error);
      toast.error("Erro ao cadastrar o produto. Tente novamente.");
      throw error;
    }
  };

  const productEdit = async (data: FieldValues) => {
    try {
      const response = await axios.put(`${apiAdress}/products/edit`, data);
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
      const response = await axios.delete(`${apiAdress}/product/delete`, { data });
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
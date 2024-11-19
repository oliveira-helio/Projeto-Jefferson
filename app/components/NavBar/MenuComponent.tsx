"use client";
import React, { useEffect, useState } from "react";
import Container from "../Container";
import apiAdress from "@/utils/api";

const MenuContainer = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${apiAdress}/categories`);
        const data = await response.json();

        // Converte o objeto de categorias em um array para fácil iteração
        const formattedCategories = Object.entries(data.categories).map(
          ([categoryName, subcategories]) => ({
            category: categoryName,
            subcategories: Object.entries(subcategories).map(
              ([subCategoryName, productTypes]) => ({
                subCategory: subCategoryName,
                productTypes,
              })
            ),
          })
        );

        setCategories(formattedCategories); // Atualiza o estado com as categorias formatadas
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Container>
      <div className="w-full pl-6">
        <nav>
          <ul className="list-none flex flex-col md:flex-row max-md:hidden">
            {categories.map((category) => (
              <li key={category.category} className="relative p-4 group">
                <a
                  className="rounded-full text-[#a3115f] py-1.5 px-4 block text-xl font-semibold group-hover:bg-black group-hover:text-[#e65ba5]"
                  href="#"
                >
                  {category.category}
                </a>

                <div className="hidden absolute bg-[#f8def2] shadow-[0 4px 8px rgba(0, 0, 0, 0.1)] z-50 min-w-[150px] group-hover:block">
                  {category.subcategories.map((subCategory) => (
                    <div key={subCategory.subCategory}>
                      <a
                        className="block p-2 text-lg font-semibold text-[#e65ba5] hover:underline hover:decoration-[#e65ba5]"
                        href="#"
                      >
                        {" "}
                        {/*  TODO  Customizar as subcategorias */}
                        {subCategory.subCategory}
                      </a>
                      {subCategory.productTypes.map((productType) => (
                        <a
                          key={productType}
                          className="block p-2 text-base font-medium text-[#e65ba5] hover:text-black hover:underline hover:decoration-[#e65ba5]"
                          href="#"
                        >
                          {productType}
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </Container>
  );
};

export default MenuContainer;

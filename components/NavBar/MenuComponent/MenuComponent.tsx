"use client";
import React, { Suspense, useEffect, useState } from "react";
import Container from "../../Container";
import apiAdress from '@/utils/api'
import { useMediaQuery } from 'react-responsive';
import { FaBars, FaTimes } from 'react-icons/fa';
import SearchBar from "../SearchBar/SearchBar";

type categoryProps = {
  category: string;
  subcategories: {
    subCategory: string;
    productTypes: string[];
  }[];
}[];

const MenuContainer = () => {
  const [categories, setCategories] = useState<categoryProps>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${apiAdress}/categories`);
        const data = await response.json();

        // Converte o objeto de categorias em um array para fácil iteração
        const formattedCategories = Object.entries(data.categories).map(
          ([categoryName, subcategories]: [string, any]) => ({
            category: categoryName,
            subcategories: Object.entries(subcategories).map(
              ([subCategoryName, productTypes]: [string, any]) => ({
                subCategory: subCategoryName,
                productTypes: Array.isArray(productTypes) ? productTypes : [],
              })
            ),
          })
        );

        setCategories(formattedCategories);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };

    fetchCategories();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Suspense fallback={<div>Carregando no menuComponent...</div>}>
      <>
        {isMobile? (
            <SearchBar/>
          
          ) : (
            <div className="w-full pl-2 flex justify-center">
              <nav>
                <ul className="list-none flex flex-row">
                  {categories.map((category) => (
                    <li key={category.category} className="relative p-4 group">
                      <a
                        className="rounded-full text-[#a3115f] py-1.5 px-4 block text-xl font-semibold group-hover:bg-black group-hover:text-[#e65ba5]"
                        href={`/products?category=${category.category}`}
                      >
                        {category.category}
                      </a>

                      <div className="hidden absolute bg-[#f8def2] shadow-[0 4px 8px rgba(0, 0, 0, 0.1)] z-50 min-w-[150px] group-hover:block">
                        {category.subcategories.map((subCategory) => (
                          <div key={subCategory.subCategory}>
                            <a
                              className="block p-2 text-lg font-semibold text-[#e65ba5] hover:underline hover:decoration-[#e65ba5]"
                              href={`/products?subCategory=${subCategory.subCategory}`}
                            >
                              {" "}
                              {subCategory.subCategory}
                            </a>
                            {subCategory.productTypes.map((productType: string) => (
                              <a
                                key={productType}
                                className="block p-2 text-base font-medium text-[#e65ba5] hover:text-black hover:underline hover:decoration-[#e65ba5]"
                                href={`/products?type=${productType}`}
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
          )
        }
      </>
    </Suspense>
  );
};

export default MenuContainer;

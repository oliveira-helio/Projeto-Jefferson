"use client";
import React, { Suspense, useEffect, useState } from "react";
import apiAdress from '@/utils/variables/api';
import { useMediaQuery } from 'react-responsive';
import { FaBars, FaChevronDown, FaChevronUp, FaTimes } from 'react-icons/fa';
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
  const [openCategories, setOpenCategories] = useState<{ [key: string]: boolean }>({});
  const [openSubcategories, setOpenSubcategories] = useState<{ [key: string]: boolean }>({});
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

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  const toggleSubCategory = (subCategory: string) => {
    setOpenSubcategories((prev) => ({ ...prev, [subCategory]: !prev[subCategory] }));
  };

  return (
    <Suspense fallback={<div>Carregando no menuComponent...</div>}>
      <>
      {isMobile ? (
        <>
          <div className="flex items-center justify-between px-4 py-2">
            <button onClick={toggleMenu} className="text-2xl text-[#a3115f]">
              {isMenuOpen ? <FaTimes /> : <FaBars size={20} />}
            </button>
          </div>

          {/* Menu Mobile */}
          <div
            className={`fixed top-0 left-0 h-[100vh] overflow-hidden w-[70%] bg-pink-100 shadow-lg transform  ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out z-50`}
          >
            <button
              onClick={toggleMenu}
              className="absolute top-4 right-4 text-2xl text-[#a3115f]"
            >
              <FaTimes />
            </button>
            <div className="my-10 px-4">
              <p>Encontre seus produtos favoritos</p>
              <div className=""> 
                <SearchBar onSearch={() => setIsMenuOpen(false)} />
              </div>
          
              <hr className="w-full mx-2 my-8 border border-solid border-pink-300" />

              <nav className="">
                <ul className="list-none flex flex-col gap-4 p-6">
                  {categories.map((category) => (
                    <li key={category.category} className="border-b pb-2">

                      <button
                        className="flex justify-between items-center w-full text-[#a3115f] text-lg font-semibold"
                        onClick={() => toggleCategory(category.category)}
                      >
                        {category.category}
                        {openCategories[category.category] ? <FaChevronUp /> : <FaChevronDown />}
                      </button>

                      {openCategories[category.category] && (
                        <ul className="pl-4 mt-2">

                          {category.subcategories.map((subCategory) => (
                            <li key={subCategory.subCategory} className="mb-2">

                              <button
                                className="flex justify-between items-center w-full text-[#e65ba5] text-md font-medium"
                                onClick={() => toggleSubCategory(subCategory.subCategory)}
                              >
                                {subCategory.subCategory}
                                {openSubcategories[subCategory.subCategory] ? (
                                  <FaChevronUp />
                                ) : (
                                  <FaChevronDown />
                                )}
                              </button>

                              {openSubcategories[subCategory.subCategory] && (
                                <ul className="pl-4 mt-1">

                                  {subCategory.productTypes.map((productType) => (
                                    <li key={productType}>
                                      <a
                                        className="block text-sm text-gray-600 hover:text-black"
                                        href={`/products?type=${productType}`}
                                      >
                                        {productType}
                                      </a>
                                    </li>
                                  ))}

                                </ul>
                              )}

                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          {/* Overlay para fechar o menu ao clicar fora */}
          {isMenuOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={toggleMenu}
            ></div>
          )}
        </>
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

                      <div className="hidden absolute bg-[#f8def2] shadow-[0 4px 8px rgba(0, 0, 0, 0.1)] z-50 md:min-w-[150px] group-hover:block">
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

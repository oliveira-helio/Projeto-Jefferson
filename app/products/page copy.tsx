"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Product } from "@/utils/interfaces";
import ProductCard from "../components/ProductCard/ProductCard";
import { Range } from "react-range"; // Importando o componente Range do react-range
import apiAdress from "@/utils/api";
import debounce from "lodash.debounce";

export default function Products() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Estados para os filtros
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [brand, setBrand] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [subCategory, setSubCategory] = useState<string | null>(null);
  const [productType, setProductType] = useState<string | null>(null);
  const [filteredFilters, setFilteredFilters] = useState<{
    brands: string[];
    categories: string[];
    subCategories: string[];
    productTypes: string[];
  }>({
    brands: [],
    categories: [],
    subCategories: [],
    productTypes: [],
  });

  // Carrega filtros iniciais e preenche os valores padrão
  useEffect(() => {
    const loadInitialFilters = async () => {
      try {
        const response = await fetch(`${apiAdress}/filters`);
        const data = await response.json();
        setFilteredFilters(data);
      } catch (error) {
        console.error("Erro ao carregar filtros iniciais:", error);
      }
    };

    loadInitialFilters();
  }, []);

  // Atualiza os filtros na URL
  const updateURL = useCallback(() => {
    const query = new URLSearchParams();

    if (priceRange[0] !== 0 || priceRange[1] !== 1000) {
      query.append("minPrice", priceRange[0].toString());
      query.append("maxPrice", priceRange[1].toString());
    }

    if (brand) query.append("brand", brand);
    if (category) query.append("category", category);
    if (subCategory) query.append("subCategory", subCategory);
    if (productType) query.append("type", productType);

    router.push(`/products?${query.toString()}`, { shallow: true });
  }, [priceRange, brand, category, subCategory, productType, router]);

  // Carrega os produtos e filtros filtrados
  const loadProductsAndFilters = useCallback(async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();

      if (priceRange[0] !== 0 || priceRange[1] !== 1000) {
        query.append("minPrice", priceRange[0].toString());
        query.append("maxPrice", priceRange[1].toString());
      }

      if (brand) query.append("brand", brand);
      if (category) query.append("category", category);
      if (subCategory) query.append("subCategory", subCategory);
      if (productType) query.append("type", productType);

      const response = await fetch(`${apiAdress}/products?${query.toString()}`);
      const data = await response.json();
      setProducts(data.products);

      const filteredResponse = await fetch(
        `${apiAdress}/filters?${query.toString()}`
      );
      const filteredData = await filteredResponse.json();
      setFilteredFilters(filteredData);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    } finally {
      setLoading(false);
    }
  }, [priceRange, brand, category, subCategory, productType]);

  // Debounce para carregar produtos e atualizar a URL
  const debouncedUpdate = useCallback(
    debounce(() => {
      loadProductsAndFilters();
      updateURL();
    }, 700),
    [loadProductsAndFilters, updateURL]
  );

  // Efeito para carregar produtos ao mudar os filtros
  useEffect(() => {
    debouncedUpdate();
  }, [priceRange, brand, category, subCategory, productType, debouncedUpdate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-4xl font-medium text-gray-700">
          Carregando produtos...
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-4 p-4 bg-pink-100 rounded-lg my-6">
        {/* Outros Filtros */}
        <div className="lg:min-w-28">
          <label className="block text-base text-pink-500 font-semibold mb-2">
            Preço
          </label>
          {/* Barra de intervalo para preço */}
          <Range
            step={1}
            min={0}
            max={1000}
            values={priceRange}
            onChange={(values) => setPriceRange(values as [number, number])}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "6px",
                  width: "100%",
                  backgroundColor: "#f8b5ef",
                  borderRadius: "4px",
                }}
              >
                {children}
              </div>
            )}
            renderThumb={({ index, props }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "16px",
                  width: "16px",
                  borderRadius: "8px",
                  backgroundColor: "#bb0bac",
                }}
              />
            )}
          />
          <div className="flex justify-between mt-2">
            <span>R$ {priceRange[0]}</span>
            <span>R$ {priceRange[1]}</span>
          </div>
        </div>

        <div className="grid grid-flow-col max-md:w-full md:flex md:flex-row gap-4 bg-pink-100 rounded-lg ">
          <div>
            <label className="block text-base text-pink-500 font-semibold mb-2">
              Marca
            </label>
            <select
              value={brand || ""}
              onChange={(e) => setBrand(e.target.value || null)}
              className="w-full border-gray-300 rounded-lg"
            >
              <option value="">Todas</option>
              {filteredFilters.brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-base text-pink-500 font-semibold mb-2">
              Categoria
            </label>
            <select
              value={category || ""}
              onChange={(e) => setCategory(e.target.value || null)}
              className="w-full border-gray-300 rounded-lg"
            >
              <option value="">Todas</option>
              {filteredFilters.categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-flow-col max-md:w-full md:flex md:flex-row gap-4 bg-pink-100 rounded-lg ">
          <div>
            <label className="block text-base text-pink-500 font-semibold mb-2">
              Subcategoria
            </label>
            <select
              value={subCategory || ""}
              onChange={(e) => setSubCategory(e.target.value || null)}
              className="w-full border-gray-300 rounded-lg"
            >
              <option value="">Todas</option>
              {filteredFilters.subCategories.map((subcategory) => (
                <option key={subcategory} value={subcategory}>
                  {subcategory}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-base text-pink-500 font-semibold mb-2">
              Tipo de Produto
            </label>
            <select
              value={productType || ""}
              onChange={(e) => setProductType(e.target.value || null)}
              className="w-full border-gray-300 rounded-lg"
            >
              <option value="">Todas</option>
              {filteredFilters.productTypes.map((type) => ("use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Product } from "@/utils/interfaces";
import ProductCard from "../components/ProductCard/ProductCard";
import { Range } from "react-range";
import apiAdress from "@/utils/api";
import debounce from "lodash.debounce";

export default function Products() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Estados para os filtros
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [tempPriceRange, setTempPriceRange] = useState<[number, number]>([
    0, 500,
  ]); // Temporário
  const [brand, setBrand] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [subCategory, setSubCategory] = useState<string | null>(null);
  const [productType, setProductType] = useState<string | null>(null);
  const [filteredFilters, setFilteredFilters] = useState({
    brands: [],
    categories: [],
    subCategories: [],
    productTypes: [],
  });

  const [isMobile, setIsMobile] = useState(false); // Verifica se é mobile
  const [showFilters, setShowFilters] = useState(false); // Estado para o modal de filtros
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth < 768);
    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  // Fecha o modal ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setShowFilters(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Carrega filtros iniciais
  useEffect(() => {
    const loadInitialFilters = async () => {
      try {
        const response = await fetch(`${apiAdress}/filters`);
        const data = await response.json();
        setFilteredFilters(data);
      } catch (error) {
        console.error("Erro ao carregar filtros iniciais:", error);
      }
    };

    loadInitialFilters();
  }, []);

  // Atualiza a URL com filtros
  const updateURL = useCallback(() => {
    const query = new URLSearchParams();

    if (priceRange[0] !== 0 || priceRange[1] !== 500) {
      query.append("minPrice", priceRange[0].toString());
      query.append("maxPrice", priceRange[1].toString());
    }

    if (brand) query.append("brand", brand);
    if (category) query.append("category", category);
    if (subCategory) query.append("subCategory", subCategory);
    if (productType) query.append("type", productType);

    router.push(`/products?${query.toString()}`, { shallow: true });
  }, [priceRange, brand, category, subCategory, productType, router]);

  // Carrega produtos com filtros
  const loadProductsAndFilters = useCallback(async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();

      if (priceRange[0] !== 0 || priceRange[1] !== 500) {
        query.append("minPrice", priceRange[0].toString());
        query.append("maxPrice", priceRange[1].toString());
      }

      if (brand) query.append("brand", brand);
      if (category) query.append("category", category);
      if (subCategory) query.append("subCategory", subCategory);
      if (productType) query.append("type", productType);

      const response = await fetch(`${apiAdress}/products?${query.toString()}`);
      const data = await response.json();
      setProducts(data.products);

      const filteredResponse = await fetch(
        `${apiAdress}/filters?${query.toString()}`
      );
      const filteredData = await filteredResponse.json();
      setFilteredFilters(filteredData);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    } finally {
      setLoading(false);
    }
  }, [priceRange, brand, category, subCategory, productType]);

  // Atualiza os filtros ao soltar a barra de preços
  const debouncedUpdate = useCallback(
    debounce(() => {
      loadProductsAndFilters();
      updateURL();
    }, 500),
    [loadProductsAndFilters, updateURL]
  );

  useEffect(() => {
    debouncedUpdate();
  }, [brand, category, subCategory, productType, debouncedUpdate]);

  useEffect(() => {
    // Obtém os valores iniciais da URL
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const initialBrand = searchParams.get("brand");
    const initialCategory = searchParams.get("category");
    const initialSubCategory = searchParams.get("subCategory");
    const initialProductType = searchParams.get("type");

    if (minPrice && maxPrice) {
      setPriceRange([Number(minPrice), Number(maxPrice)]);
      setTempPriceRange([Number(minPrice), Number(maxPrice)]);
    }
    if (initialBrand) setBrand(initialBrand);
    if (initialCategory) setCategory(initialCategory);
    if (initialSubCategory) setSubCategory(initialSubCategory);
    if (initialProductType) setProductType(initialProductType);
  }, [searchParams]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-4xl font-medium text-gray-700">
          Carregando produtos...
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Botão para abrir filtros em mobile */}
      {isMobile && (
        <button
          className="bg-pink-300 text-white px-4 py-2 rounded-lg m-6"
          onClick={() => setShowFilters(true)}
        >
          Mostrar Filtros
        </button>
      )}

      {/* Modal de filtros */}
      {showFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 rounded-lg overflow-hidden flex justify-start items-start z-30 w-[50%] mt-[105px]">
          <div
            ref={modalRef}
            className="flex flex-col gap-6 bg-pink-100 p-4  max-w-md w-full"
          >
            {/* Barra de intervalo para preço */}
            <label className="block text-base text-pink-500 font-semibold mb-2">
              Preço
            </label>
            <Range
              step={1}
              min={0}
              max={500}
              values={tempPriceRange}
              onChange={(values) =>
                setTempPriceRange(values as [number, number])
              }
              onFinalChange={(values) => {
                setPriceRange(values as [number, number]);
                debouncedUpdate();
              }}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "6px",
                    width: "100%",
                    backgroundColor: "#f8b5ef",
                    borderRadius: "4px",
                  }}
                >
                  {children}
                </div>
              )}
              renderThumb={({ index, props }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "16px",
                    width: "16px",
                    borderRadius: "8px",
                    backgroundColor: "#bb0bac",
                  }}
                />
              )}
            />
            <div className="flex justify-between mt-2">
              <span>R$ {tempPriceRange[0]}</span>
              <span>R$ {tempPriceRange[1]}</span>
            </div>

            <div>
              <label className="block text-base text-pink-500 font-semibold mb-2">
                Marca
              </label>
              <select
                value={brand || ""}
                onChange={(e) => setBrand(e.target.value || null)}
                className="w-full border-gray-300 rounded-lg"
              >
                <option value="">Todas</option>
                {filteredFilters.brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-base text-pink-500 font-semibold mb-2">
                Categoria
              </label>
              <select
                value={category || ""}
                onChange={(e) => setCategory(e.target.value || null)}
                className="w-full border-gray-300 rounded-lg"
              >
                <option value="">Todas</option>
                {filteredFilters.categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-base text-pink-500 font-semibold mb-2">
                Subcategoria
              </label>
              <select
                value={subCategory || ""}
                onChange={(e) => setSubCategory(e.target.value || null)}
                className="w-full border-gray-300 rounded-lg"
              >
                <option value="">Todas</option>
                {filteredFilters.subCategories.map((subcategory) => (
                  <option key={subcategory} value={subcategory}>
                    {subcategory}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-base text-pink-500 font-semibold mb-2">
                Tipo de Produto
              </label>
              <select
                value={productType || ""}
                onChange={(e) => setProductType(e.target.value || null)}
                className="w-full border-gray-300 rounded-lg"
              >
                <option value="">Todas</option>
                {filteredFilters.productTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-between">
              <button
                className="text-pink-500 mx-4 text-base font-medium"
                onClick={() => {
                  setBrand("");
                  setCategory("");
                  setSubCategory("");
                  setProductType("");
                  setTempPriceRange([0, 500]);
                  setPriceRange([0, 500]);
                }}
              >
                Limpar filtros
              </button>
              <button
                className="text-pink-500 mx-4 text-base font-medium"
                onClick={() => setShowFilters(false)}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {!isMobile && (
        <div className="flex flex-row justify-start bg-pink-100 rounded-lg my-6">
          <div className="flex flex-row gap-6 p-4 flex-shrink-0">
            {/* Outros Filtros */}
            <div className="lg:min-w-28">
              <label className="block text-base text-pink-500 font-semibold mb-2">
                Preço
              </label>
              {/* Barra de intervalo para preço */}
              <Range
                step={1}
                min={0}
                max={500}
                values={tempPriceRange}
                onChange={(values) =>
                  setTempPriceRange(values as [number, number])
                }
                onFinalChange={(values) => {
                  setPriceRange(values as [number, number]);
                  debouncedUpdate();
                }}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "6px",
                      width: "100%",
                      backgroundColor: "#f8b5ef",
                      borderRadius: "4px",
                    }}
                  >
                    {children}
                  </div>
                )}
                renderThumb={({ index, props }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "16px",
                      width: "16px",
                      borderRadius: "8px",
                      backgroundColor: "#bb0bac",
                    }}
                  />
                )}
              />
              <div className="flex justify-between mt-2">
                <span>R$ {priceRange[0]}</span>
                <span>R$ {priceRange[1]}</span>
              </div>
            </div>

            <div>
              <label className="block text-base text-pink-500 font-semibold mb-2">
                Marca
              </label>
              <select
                value={brand || ""}
                onChange={(e) => setBrand(e.target.value || null)}
                className="w-full border-gray-300 rounded-lg"
              >
                <option value="">Todas</option>
                {filteredFilters.brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-base text-pink-500 font-semibold mb-2">
                Categoria
              </label>
              <select
                value={category || ""}
                onChange={(e) => setCategory(e.target.value || null)}
                className="w-full border-gray-300 rounded-lg"
              >
                <option value="">Todas</option>
                {filteredFilters.categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-base text-pink-500 font-semibold mb-2">
                Subcategoria
              </label>
              <select
                value={subCategory || ""}
                onChange={(e) => setSubCategory(e.target.value || null)}
                className="w-full border-gray-300 rounded-lg"
              >
                <option value="">Todas</option>
                {filteredFilters.subCategories.map((subcategory) => (
                  <option key={subcategory} value={subcategory}>
                    {subcategory}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-base text-pink-500 font-semibold mb-2">
                Tipo de Produto
              </label>
              <select
                value={productType || ""}
                onChange={(e) => setProductType(e.target.value || null)}
                className="w-full border-gray-300 rounded-lg"
              >
                <option value="">Todas</option>
                {filteredFilters.productTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-row justify-self-stretch w-full justify-end">
            <button
              className="text-pink-500 mx-4 h-full self-center mt-4 text-base font-medium"
              onClick={() => {
                setBrand("");
                setCategory("");
                setSubCategory("");
                setProductType("");
                setTempPriceRange([0, 500]);
                setPriceRange([0, 500]);
              }}
            >
              Limpar filtros
            </button>
          </div>
        </div>
      )}

      {/* Lista de Produtos */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-center justify-between">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.product_id} product={product} />
          ))
        ) : (
          <div>Nenhum produto encontrado.</div>
        )}
      </div>
    </div>
  );
}

                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Adicione os outros filtros seguindo a mesma lógica */}
      </div>

      {/* Lista de Produtos */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-center justify-between">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.product_id} product={product} />
          ))
        ) : (
          <div>Nenhum produto encontrado.</div>
        )}
      </div>
    </div>
  );
}
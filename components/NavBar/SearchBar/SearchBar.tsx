import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useMobile } from "@/hooks/UseMobile/useMobile";


type SearchBarProps = {
  onSearch?: () => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const router = useRouter(); 
  const searchParams = useSearchParams();
  const { isMobile } = useMobile();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
    onSearch?.(); // Chama a função recebida como prop
  };
  

  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "");
  }, [searchParams]);

  return ( 
    <>
      {isMobile? (
        <div className="flex items-center w-full">
          {/* <button onClick={handleSearchToggle} className="text-4xl flex items-center">
            {isSearchOpen ? <FaTimes /> : <FaSearch size={20} className="text-pink-700"/>}
          </button> */}
          {/* {isSearchOpen && (  */}
            <div className="mt-6 rounded-md top-6 w-full z-50 p-2">
              <form onSubmit={handleSearchSubmit} className="flex flex-row flex-nowrap w-full justify-center">
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  required
                  className="flex flex-grow-[0.9] px-4 py-2 rounded-l-3xl focus:outline-none text-black w-max"
                />
                <button
                  className="flex flex-grow-[0.1] px-2 bg-pinkSecondary text-black cursor-pointer rounded-r-3xl items-center justify-center"
                  type="submit"
                >
                  <FaSearch size={16} className="text-center"/>
                </button>
              </form>
            </div>
          {/* )}  */}
        </div>
      ) : (
        <div className="w-full block mt-2">
          <form
            onSubmit={handleSearchSubmit}
            className="flex flex-row flex-nowrap w-full justify-center"
          >
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              required
              className="flex-1 px-4 py-2 rounded-l-3xl focus:outline-none text-black w-max"
            />
            <button
              className="flex-grow-[0.12] p-2 bg-pinkSecondary text-black cursor-pointer rounded-r-3xl"
              type="submit"
            >
              buscar
            </button>
          </form>
        </div>
      )}
    </>
  );
}
 
export default SearchBar;
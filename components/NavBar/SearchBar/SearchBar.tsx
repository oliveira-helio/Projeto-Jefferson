import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import { FaSearch, FaTimes } from "react-icons/fa";

// TODO: inserir logica de busca

const SearchBar = () => {
  const router = useRouter(); 
  const searchParams = useSearchParams();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
    // TODO: inserir logica de busca
    console.log("Buscar por:", searchQuery);
  };

  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "");
  }, [searchParams]);

  return ( 
    <>
      {isMobile? (
        <div className="flex items-center">
          {/* <button onClick={handleSearchToggle} className="text-4xl flex items-center">
            {isSearchOpen ? <FaTimes /> : <FaSearch />}
          </button>
          {isSearchOpen && (
            <div className="
              absolute
              rounded-md 
              top-0 
              left-24
              w-full
              z-50 
              p-2"
            > */}
              <form onSubmit={handleSearchSubmit} className="flex flex-row flex-nowrap w-full justify-center">
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
                  <FaSearch />
                </button>
              </form>
            {/* </div>
          )} */}
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
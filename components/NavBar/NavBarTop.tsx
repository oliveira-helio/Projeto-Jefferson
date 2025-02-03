// "use client";
// // import Link from "next/link";
// import { LocalMallRounded } from "@mui/icons-material";
// import { useCart } from "@/Hooks/useCart";
// import UserMenu from "./UserMenu/UserMenu";
// import React, { useEffect, useState } from "react";
// import apiAdress from "@/utils/api";
// import { useMediaQuery } from "react-responsive";
// import { FaBars, FaTimes } from "react-icons/fa";

// type categoryProps = {
//   category: string;
//   subcategories: {
//     subCategory: string;
//     productTypes: string[];
//   }[];
// }[];

// const NavBarTop = () => {
//   const { cartTotalQty } = useCart();
//   const [categories, setCategories] = useState<categoryProps>([]);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const isMobile = useMediaQuery({ maxWidth: 768 });

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await fetch(`${apiAdress}/categories`);
//         const data = await response.json();

//         // Converte o objeto de categorias em um array para fácil iteração
//         const formattedCategories = Object.entries(data.categories).map(
//           ([categoryName, subcategories]: [string, any]) => ({
//             category: categoryName,
//             subcategories: Object.entries(subcategories).map(
//               ([subCategoryName, productTypes]: [string, any]) => ({
//                 subCategory: subCategoryName,
//                 productTypes: Array.isArray(productTypes) ? productTypes : [],
//               })
//             ),
//           })
//         );

//         setCategories(formattedCategories);
//       } catch (error) {
//         console.error("Erro ao buscar categorias:", error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <div>
//       <div className="flex flex-row items-center justify-between p-0  w-full">
//         {isMobile ? (
//                     <div className="relative">
//                       <button onClick={toggleMenu} className="text-2xl">
//                         {isMenuOpen ? <FaTimes /> : <FaBars />}
//                       </button>
//                       {isMenuOpen && (
//                         <ul className="list-none flex flex-col absolute bg-[#f8def2]">
//                           {categories.map((category) => (
//                             <li key={category.category} className="relative p-4 group">
//                               <a
//                                 className="rounded-full text-[#a3115f]  py-1.5 px-4 block text-xl font-semibold group-hover:bg-black group-hover:text-[#e65ba5]"
//                                 href={`/products?category=${category.category}`}
//                               >
//                                 {category.category}
//                               </a>
        
//                               <div className="hidden absolute bg-[#f8def2] shadow-[0 4px 8px rgba(0, 0, 0, 0.1)] z-50 min-w-[150px] group-hover:block">
//                                 {category.subcategories.map((subCategory) => (
//                                   <div key={subCategory.subCategory}>
//                                     <a
//                                       className="block p-2 text-lg font-semibold text-[#e65ba5] hover:underline hover:decoration-[#e65ba5]"
//                                       href={`/products?subCategory=${subCategory.subCategory}`}
//                                     >
//                                       {" "}
//                                       {subCategory.subCategory}
//                                     </a>
//                                     {subCategory.productTypes.map(
//                                       (productType: string) => (
//                                         <a
//                                           key={productType}
//                                           className="block p-2 text-base font-medium text-[#e65ba5] hover:text-black hover:underline hover:decoration-[#e65ba5]"
//                                           href={`/products?type=${productType}`}
//                                         >
//                                           {productType}
//                                         </a>
//                                       )
//                                     )}
//                                   </div>
//                                 ))}
//                               </div>
//                             </li>
//                           ))}
//                         </ul>
//                       )}
//                     </div>
//                   ) : null}
        
//         {/* logo */}
//         {/* y */}
        
//         {/* search bar */}
//         {/* <div className="md:w-2/5 hidden md:block ">
//           <form
//             action=""
//             className="flex flex-row flex-nowrap w-full justify-center"
//           >
//             <input
//               type="text"
//               placeholder="Buscar produtos..."
//               required
//               className="flex-1 px-4 py-2 rounded-l-3xl focus:outline-none text-black w-max"
//             />
//             <button
//               className="flex-grow-[0.12] p-2 bg-pinkSecondary text-black cursor-pointer rounded-r-3xl"
//               type="submit"
//             >
//               enviar
//             </button>
//           </form>
//         </div> */}
        
//         {/* user menu */}
//         {/* <div className="flex flex-row h-full gap-1 items-center md:mr-2 xl:mr-0">
//           <div className="cartDiv h-full relative">
//             <a href="/carrinho" className="h-full">
//               <button className="cart-btn">
//                 <div
//                   id="cartItemCounter"
//                   className={`absolute right-px top-0.5 box-border rounded-full text-white bg-black w-4 text-xs z-10 ${
//                     cartTotalQty === 0 ? "hidden" : ""
//                   }`}
//                 >
//                   {cartTotalQty}
//                 </div>
//                 <div
//                   className="
//                 text-pinkSecondary 
//                   text-4xl
//                   md:text-[2.25rem] 
//                   p-2 
//                   border-[1px] 
//                   border-pinkSecondary 
//                   flex 
//                   flex-row 
//                   items-center 
//                   gap-1 
//                   rounded-3xl 
//                   cursor-pointer
//                   hover:shadow-md
//                   transition"
//                 >
//                   <LocalMallRounded fontSize="inherit" />
//                 </div>
//               </button>
//             </a>
//           </div>

//           <div>
//             <UserMenu />
//           </div>
//         </div> */}
//       </div>

//       {!isMobile ? null : (
//             <div className="w-full pl-6">
//             <nav>
//               <ul className="list-none flex flex-col md:flex-row">
//                 {categories.map((category) => (
//                   <li key={category.category} className="relative p-4 group">
//                     <a
//                       className="rounded-full text-[#a3115f] py-1.5 px-4 block text-xl font-semibold group-hover:bg-black group-hover:text-[#e65ba5]"
//                       href={`/products?category=${category.category}`}
//                     >
//                       {category.category}
//                     </a>
    
//                     <div className="hidden absolute bg-[#f8def2] shadow-[0 4px 8px rgba(0, 0, 0, 0.1)] z-50 min-w-[150px] group-hover:block">
//                       {category.subcategories.map((subCategory) => (
//                         <div key={subCategory.subCategory}>
//                           <a
//                             className="block p-2 text-lg font-semibold text-[#e65ba5] hover:underline hover:decoration-[#e65ba5]"
//                             href={`/products?subCategory=${subCategory.subCategory}`}
//                           >
//                             {" "}
//                             {subCategory.subCategory}
//                           </a>
//                           {subCategory.productTypes.map((productType: string) => (
//                             <a
//                               key={productType}
//                               className="block p-2 text-base font-medium text-[#e65ba5] hover:text-black hover:underline hover:decoration-[#e65ba5]"
//                               href={`/products?type=${productType}`}
//                             >
//                               {productType}
//                             </a>
//                           ))}
//                         </div>
//                       ))}
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </nav>
//           </div>
//           )}
//     </div>
//   );
// };

// export default NavBarTop;

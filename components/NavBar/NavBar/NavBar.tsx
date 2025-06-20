import { useMediaQuery } from "react-responsive";
import Logo from "../Logo/Logo";
import SearchBar from "../SearchBar/SearchBar";
import UserMenu from "../UserMenu/UserMenu";
import MenuContainer from "../ProductMenu/ProductMenu";
import { Suspense } from "react";
import { useMobile } from "@/hooks/UseMobile/useMobile";

const NewNavBar = () => {
  const { isMobile } = useMobile();

  return (
    <Suspense fallback={<div>Carregando no NewNavBar...</div>}>
      <>
        {isMobile ? (
          <div className="grid grid-cols-6 items-center">
            <div className="col-span-1">
              <MenuContainer/>
            </div>
            <div className="col-span-1"/>
            <div className="col-span-2">
              <Logo/>
            </div>
            <div className="col-span-1"/>
            <div className="col-span-1 flex justify-end pr-2">
              <UserMenu/>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-6">
            <div className="col-span-1">
              <Logo/>
            </div>
            <div className="col-span-5">
              <div className="flex flex-col pt-6 align-center">
                <div className="grid  grid-cols-5">
                  <div className="col-span-1"></div>
                  <div className="col-span-2 flex  justify-center">
                    <SearchBar/>
                  </div>
                  <div className="col-span-1"/>
                  <div className="col-span-1 flex justify-end pr-4">
                    <UserMenu/>
                  </div>
                </div>

                <div className="grid grid-cols-5">
                  <div className="col-span-4 w-full">
                    <MenuContainer/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
     </Suspense>
  )
};

export default NewNavBar;

import Link from "next/link";
import { AccountCircle, LocalMallRounded } from "@mui/icons-material";

const NavBarTop = () => {
  let cartItensCount: number = 7;
  return (
    <div className="flex flex-row items-center justify-between p-0 max-h-28 w-full">
      <div className=" p-0 m-0">
        <Link href={"/"}>
          <img
            className="h-16 md:h-24 w-auto"
            src="/assets/img/Logo1.png"
            alt="Logo da loja"
          />
        </Link>
      </div>

      <div className="md:w-2/5 hidden md:block ">
        <form
          action=""
          className="flex flex-row flex-nowrap w-full justify-center"
        >
          <input
            type="text"
            placeholder="Buscar produtos..."
            required
            className="flex-1 px-4 py-2 rounded-l-3xl focus:outline-none text-black w-max"
          />
          <button
            className="flex-grow-[0.12] p-2 bg-pinkSecondary text-black cursor-pointer rounded-r-3xl"
            type="submit"
          >
            enviar
          </button>
        </form>
      </div>

      <div className="flex flex-row h-full gap-4 items-center md:mr-2 xl:mr-0">
        <div className="cartDiv h-full relative">
          <a href="#" className="h-full">
            <button className="cart-btn">
              <div
                id="cartItemCounter"
                className={`absolute -right-1 -top-1 box-border rounded-full text-white bg-black  w-4 text-xs z-10 ${
                  cartItensCount === 0 ? "hidden" : ""
                }`}
              >
                {cartItensCount}
              </div>
              <LocalMallRounded
                fontSize="large"
                className="relative self-center justify-center box-border text-pinkSecondary md:text-[2.5rem]"
              ></LocalMallRounded>
            </button>
          </a>
        </div>

        <div>
          <a href="#">
            <button className="login-btn">
              <AccountCircle
                fontSize="large"
                className="text-pinkSecondary md:text-[2.5rem]"
              />
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default NavBarTop;

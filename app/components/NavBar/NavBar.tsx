import NavBarBotton from "./MenuComponent";
import NavBarTop from "./NavBarTop";
import Container from "../Container";

const NavBar = () => {
  return (
    <div className="navbar sticky left-0 top-0 z-50 flex flex-col items-center w-full bg-transparent bg-gradient-to-b from-[#f7baeb] to-[#f8def2]">
      <Container>
        <NavBarTop />
        <NavBarBotton />
      </Container>
    </div>
  );
};

export default NavBar;

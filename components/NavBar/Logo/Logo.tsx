import Link from "next/link";

const Logo = () => {
    return ( 
        <div className="p-0 m-0 pt-2 flex items-center">
          <Link href={"/"}>
            <img
              className="w-11/12 aspect-video"
              src="/assets/img/Logo1.png"
              alt="Logo da loja"
            />
          </Link>
        </div>
     );
}
 
export default Logo;
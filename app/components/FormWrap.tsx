import React from "react";

const FormWrap = ({children}: {children: React.ReactNode}) => {
    return ( 
        <div className=" min-h-fit h-full flex items-center justify-center pb-12 pt-24 max-md:px-12 md:px-8 lg:px-0">
            <div className="max-w-[650px] w-full flex flex-col gap-6 items-center shadow-xl shadow-pink-200 rounded-md p-4 md:p-8">
                {children}
            </div>
        </div>
     );
}
 
export default FormWrap;
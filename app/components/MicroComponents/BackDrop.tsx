import React from "react";

interface BackDropProps {
    onClick: () => void;
    custom?: string
}


const BackDrop: React.FC<BackDropProps> = ({onClick, custom}) => {
    return ( 
        <div
        onClick={onClick}
        className={`
            z-20
            h-screen
            w-screen
            fixed
            top-0
            left-0
            ${custom}`}
        /> 
    );
}
 
export default BackDrop;
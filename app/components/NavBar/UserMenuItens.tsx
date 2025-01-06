interface UserMenuItemProps{
    children: React.ReactNode;
    onClick: () => void
}

const UserMenuItem:React.FC<UserMenuItemProps> = ({children, onClick}) => {
    return ( 
        <div onClick={onClick} className="px-4 py-3 hover:bg-pink-200 transition">
            {children}
        </div>
     );
}
 
export default UserMenuItem;
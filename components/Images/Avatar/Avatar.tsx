import Image from "next/image";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

interface AvatarProps {
  src?: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  if (src) {
    return (
      <Image
        src={src}
        alt="Avatar"
        className="rounded-full"
        height="30"
        width="30"
      />
    );
  }
  return <AccountCircleIcon style={{ fontSize: 32 }} />;
};

export default Avatar;
("");

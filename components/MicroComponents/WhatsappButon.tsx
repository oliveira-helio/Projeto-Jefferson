import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const WhatsAppButon = () => {
  return (
    <a target="_blank" href="https://wa.me/5562995578640" rel="noopener">
      <div className="w-16 h-16 rounded-full bg-[#14e141e5] text-white text-5xl p-4 flex justify-center items-center fixed bottom-11 left-11 cursor-pointer z-50">
        <WhatsAppIcon fontSize="inherit"></WhatsAppIcon>
      </div>
    </a>
  );
};

export default WhatsAppButon;

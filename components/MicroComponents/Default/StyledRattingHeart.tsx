import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Product } from "@/interfaces/ProductInterfaces";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#e65ba5",
  },
  "& .MuiRating-iconHover": {
    color: "#f91d7c",
  },
});

const StyledRattingHeart: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div id="Rattings">
      <StyledRating
        value={product.ratting}
        readOnly
        precision={0.5}
        icon={<FavoriteIcon fontSize="medium" />}
        emptyIcon={<FavoriteBorderIcon fontSize="medium" />}
        size="large"
        className="text-4xl"
        onFocus={() => alert(`Avaliações: ${product.ratting}`)}
      />
    </div>
  );
};

export default StyledRattingHeart;

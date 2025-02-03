import { Price, Rating as RatingType } from "@/types";
import { formatPrice } from "@/utils/price";
import { Circle, Star } from "@mui/icons-material";
import { Box, BoxProps, Link, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";

type PropertyResultProps = {
  id: string;
  image: {
    src: string;
    alt: string;
  };
  title: string;
  address: string;
  offerName: string;
  isFreeCancellationEligible: boolean;
  displayPrice: Price;
  savings: Price | null;
  rating?: RatingType;
  promotionTitle?: string;
  layoutProps?: BoxProps;
};

export const PropertyResult = ({
  id,
  image,
  title,
  address,
  layoutProps,
  promotionTitle,
  offerName,
  displayPrice,
  savings,
  rating,
  isFreeCancellationEligible,
}: PropertyResultProps) => {
  return (
    <Box
      itemScope
      itemType="https://schema.org/Hotel"
      display="grid"
      gridTemplateColumns={{ sm: "200px 1fr" }}
      columnGap={{ sm: "30px" }}
      rowGap={{ xs: "15px", sm: "0px" }}
      {...layoutProps}
    >
      <Link href={`/hotel/${id}`}>
        <Box
          position="relative"
          display="flex"
          alignItems="flex-start"
          width="100%"
          minHeight={{ xs: "100px", sm: "none" }}
          sx={{ aspectRatio: "auto" }}
        >
          {promotionTitle && (
            <Typography
              position="absolute"
              top="10px"
              left="0"
              p="7px"
              fontWeight="700"
              bgcolor="#fff"
              color="#cb0001"
              fontSize="15px"
            >
              {promotionTitle}
            </Typography>
          )}
          <img
            src={image.src}
            alt={image.alt}
            height="auto"
            width="100%"
            style={{ objectFit: "fill" }}
          />
        </Box>
      </Link>
      <Box
        position="relative"
        display="flex"
        flexDirection="column"
        borderBottom="1px solid"
        borderColor="#898989"
        pb={{ xs: "5px", sm: "20px" }}
      >
        <Box
          display="flex"
          alignItems={{ xs: "flex-start", sm: "center" }}
          columnGap="20px"
          mb={{ xs: "10px", sm: "0px" }}
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <Typography
            itemProp="name"
            fontSize={{ xs: "20px", md: "25px" }}
            overflow="hidden"
            whiteSpace={{ sm: "pre-line", md: "nowrap" }}
            maxWidth={{ md: "70%" }}
            textOverflow="ellipsis"
          >
            {title}
          </Typography>
          {rating && (
            <Box
              itemProp="starRating"
              itemScope
              itemType="https://schema.org/Rating"
            >
              <Rating
                itemProp="ratingValue"
                content={rating.ratingValue.toString()}
                icon={rating.ratingType === "self" ? <Circle /> : <Star />}
                emptyIcon={rating.ratingType === "self" ? <Circle /> : <Star />}
                value={rating.ratingValue}
                precision={0.5}
                readOnly
                sx={{
                  color: "#f4e900",
                }}
              />
            </Box>
          )}
        </Box>
        <Typography fontSize="15px" color="#898989">
          {address}
        </Typography>
        <Box
          display="grid"
          gridTemplateColumns={{ sm: "repeat(2, 1fr)" }}
          rowGap={{ xs: "10px", sm: "0px" }}
        >
          <Link href={`/hotel/${id}`} color="#cb0001">
            <Typography fontSize="15px">{offerName}</Typography>
          </Link>
          <PriceTag
            displayPrice={displayPrice}
            savings={savings}
            layoutProps={{
              justifySelf: { sm: "flex-end" },
              textAlign: { sm: "right" },
            }}
          />
          {isFreeCancellationEligible && <FreeCancellationBadge />}
        </Box>
      </Box>
    </Box>
  );
};

const FreeCancellationBadge = () => (
  <Typography
    position={{ xs: "relative", sm: "absolute" }}
    mb={{ sm: "10px" }}
    bottom="0px"
    fontSize="15px"
    color="#009261"
  >
    Free cancellation
  </Typography>
);

const PriceTag = ({
  displayPrice,
  savings,
  layoutProps,
}: {
  displayPrice: Price;
  savings: Price | null;
  layoutProps?: BoxProps;
}) => (
  <Box
    {...layoutProps}
    itemProp="priceSpecification"
    itemScope
    itemType="https://schema.org/UnitPriceSpecification"
  >
    <Typography fontSize="12px">
      1 night total ({displayPrice.currency})
    </Typography>
    <Typography
      fontSize="30px"
      fontWeight="200"
      itemProp="price"
      content={displayPrice.amount.toString()}
    >
      {formatPrice(displayPrice)}
    </Typography>
    {savings && (
      <Typography color="#cb0001" fontSize="20px">
        Save {formatPrice(savings)}~
      </Typography>
    )}
  </Box>
);

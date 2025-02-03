export type PropertyResult = {
  id: string;
  property: Property;
  offer: Offer;
};

export type Property = {
  propertyId: string;
  title: string;
  address: string[];
  previewImage: {
    url: string;
    caption: string;
    // NOTE: Assuming that this is the only image type available for now.
    imageType: "PRIMARY";
  };
  rating: Rating;
};

export type Offer = {
  promotion: {
    title: string;
    type: "MEMBER" | "CAMPAIGN";
  };
  name: string;
  displayPrice: Price;
  savings: Price | null;
  cancellationOption: {
    cancellationType: "NOT_REFUNDABLE" | "FREE_CANCELLATION";
  };
};

export type Price = {
  amount: number;
  currency: "AUD";
};

export type Rating = {
  ratingValue: number;
  ratingType: "star" | "self";
};

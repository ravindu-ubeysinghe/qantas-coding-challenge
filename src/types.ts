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
  rating: {
    ratingValue: number;
    ratingType: "star" | "self";
  };
};

export type Offer = {
  promotion: {
    title: string;
    type: "MEMBER" | "CAMPAIGN";
  };
  name: string;
  displayPrice: {
    amount: number;
    currency: "AUD";
  };
  savings: {
    amount: number;
    currency: "AUD";
  } | null;
  cancellationOption: {
    cancellationType: "NOT_REFUNDABLE" | "FREE_CANCELLATION";
  };
};

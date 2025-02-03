import { PropertyResult } from "src/types";
import { mockPropertyResultsData } from "./data";

const MOCK_API_LATENCY_IN_MS = 200;

type PropertyResultsResponse = {
  results: PropertyResult[];
};

export const getPropertyResults = async (): Promise<PropertyResultsResponse> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockPropertyResultsData);
    }, MOCK_API_LATENCY_IN_MS);
  });

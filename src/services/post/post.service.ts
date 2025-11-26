import type {
  NPRequest,
  NPResponse,
  NPCity,
  NPWarehouse,
} from "./post.types";

const API_KEY = "900c7daa90bccdfec531c5e9da6e8385";
const endpoint = "https://api.novaposhta.ua/v2.0/json/";

async function request<TRequest, TResponse>(
  modelName: string,
  calledMethod: string,
  methodProperties: TRequest,
): Promise<NPResponse<TResponse>> {
  const body: NPRequest<TRequest> = {
    apiKey: API_KEY,
    modelName,
    calledMethod,
    methodProperties,
  };

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return res.json();
}

export const postService = {
  searchCities(term: string) {
    if (!term || term.trim().length < 2) {
      return Promise.resolve({
        success: true,
        data: [],
        errors: [],
        warnings: [],
        info: [],
        infoCodes: [],
        messageCodes: [],
        errorCodes: [],
        warningCodes: [],
      } as NPResponse<NPCity>);
    }

    return request<{ FindByString: string; Limit: number }, NPCity>(
      "Address",
      "getCities",
      { FindByString: term.trim(), Limit: 50 }
    );
  },

  getWarehouses(cityRef: string) {
    return request<{ CityRef: string }, NPWarehouse>(
      "AddressGeneral",
      "getWarehouses",
      { CityRef: cityRef }
    );
  },
};

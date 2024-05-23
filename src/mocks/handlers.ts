import { http, HttpResponse } from "msw";
import {
  createMockFavourites,
  createMockLegislationResponse,
} from "./mockGenerator";

export const handlers = [
  http.get("*/v1/legislation", () => {
    return HttpResponse.json(createMockLegislationResponse(5), { status: 200 });
  }),
  http.get("*/favourites", () => {
    return HttpResponse.json(createMockFavourites(), { status: 200 });
  }),
];

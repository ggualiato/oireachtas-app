import { http, HttpResponse } from "msw";
import { createMockLegislationResponse } from "./mockGenerator";

export const handlers = [
  http.get("*/v1/legislation", () => {
    return HttpResponse.json(createMockLegislationResponse(5), { status: 200 });
  }),
];

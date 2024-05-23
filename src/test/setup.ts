import "@testing-library/jest-dom";
import { server } from "../mocks/server";

beforeAll(() => server.listen({ onUnhandledRequest: "warn" }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

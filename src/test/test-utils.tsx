import { cleanup, render } from "@testing-library/react";
import { AppProviders } from "../contexts/AppProviders";
import { BrowserRouter } from "react-router-dom";

afterEach(() => {
  cleanup();
});

const customRender = (ui: React.ReactElement, options = {}) => {
  return render(ui, {
    wrapper: ({ children }) => (
      <BrowserRouter>
        <AppProviders>{children}</AppProviders>
      </BrowserRouter>
    ),
    ...options,
  });
};

// eslint-disable-next-line react-refresh/only-export-components
export * from "@testing-library/react";
// override render export
export { customRender as render };

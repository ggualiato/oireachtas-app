import { cleanup, render } from "@testing-library/react";
import { AppProviders } from "../contexts/AppProviders";
import { BrowserRouter } from "react-router-dom";

afterEach(() => {
  cleanup();
});

function customRender(ui: React.ReactElement, options = {}) {
  return render(ui, {
    // wrap provider(s) here if needed
    wrapper: ({ children }) => (
      <BrowserRouter>
        <AppProviders>{children}</AppProviders>
      </BrowserRouter>
    ),
    ...options,
  });
}

// eslint-disable-next-line react-refresh/only-export-components
export * from "@testing-library/react";
// export { default as userEvent } from "@testing-library/user-event";
// override render export
export { customRender as render };

import { RouterProvider } from "react-router-dom";
import { AppProviders } from "./contexts/AppProviders";
import { router } from "./routes/routes";

function App() {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
}

export default App;

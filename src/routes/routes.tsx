import { createBrowserRouter } from "react-router-dom";
import { BillView } from "../features/bills/BillsView";
import { FavoritesList } from "../features/favorites/FavoritesList";
import ErrorPage from "../components/ErrorPage";
import App from "../App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <BillView /> },
      {
        path: "bills",
        element: <BillView />,
      },
      {
        path: "favourites",
        element: <FavoritesList />,
      },
    ],
  },
]);

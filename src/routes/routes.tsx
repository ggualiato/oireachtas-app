import { createBrowserRouter } from "react-router-dom";
import { BillView } from "../features/bills/BillsView";
import { FavoritesList } from "../features/favorites/FavoritesList";
import { MainContent } from "../components/MainContent";
import ErrorPage from "../components/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainContent />,
    errorElement: <ErrorPage />,
    children: [
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

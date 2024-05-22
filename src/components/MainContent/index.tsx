import { Container, Tab, Tabs } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import { useRouteMatch } from "../../hooks/useRouteMatch";

export const MainContent = () => {
  const routeMatch = useRouteMatch(["/bills", "/favourites"]);
  const currentTab = routeMatch?.pattern?.path;

  return (
    <div>
      <Container maxWidth="sm">
        <Tabs value={currentTab}>
          <Tab
            label="Bills"
            value={"/bills"}
            id="bills-tab"
            to={`bills`}
            component={Link}
          />
          <Tab
            label="Favourites"
            value={"/favourites"}
            id="favourites-tab"
            to="favourites"
            component={Link}
          />
        </Tabs>
        <div>
          <Outlet />
        </div>
      </Container>
    </div>
  );
};

import { AppProviders } from "./contexts/AppProviders";
import { MainContent } from "./components/MainContent/MainContent";

const App = () => {
  return (
    <AppProviders>
      <MainContent />
    </AppProviders>
  );
};

export default App;

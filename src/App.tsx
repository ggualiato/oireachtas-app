import { MainContent } from "./components/MainContent";
import { AppProviders } from "./contexts/AppProviders";

function App() {
  return (
    <AppProviders>
      <MainContent />
    </AppProviders>
  );
}

export default App;

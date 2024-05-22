import { AppProviders } from "./contexts/AppProviders";
import { MainContent } from "./components/MainContent";

function App() {
  return (
    <AppProviders>
      <MainContent />
    </AppProviders>
  );
}

export default App;

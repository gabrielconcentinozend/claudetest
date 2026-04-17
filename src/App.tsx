import { ThemeProvider } from '@zendeskgarden/react-theming';
import GlobalNav from './components/GlobalNav';
import HomePage from './components/HomePage';

function App() {
  return (
    <ThemeProvider>
      <GlobalNav>
        <HomePage />
      </GlobalNav>
    </ThemeProvider>
  );
}

export default App;

import { QueryClient, QueryClientProvider } from 'react-query';
import CurrencySwapForm from './Components/CurrencySwapForm';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <CurrencySwapForm />
      </div>
    </QueryClientProvider>
  );
}

export default App;

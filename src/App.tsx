import './App.css';
import { Books } from './pages/books/Books';
import { Authors } from './pages/authors/Authors';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/navbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  });
  return (
    <div className="App">
      <Router>
        <Navbar />
        <QueryClientProvider client={client}>
          <Routes>
            <Route path='/book' element={<Books />}/>
            <Route path='/author' element={<Authors />}/>
          </Routes>
        </QueryClientProvider>
      </Router>
    </div>
  );
}

export default App;

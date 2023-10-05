import './App.css';
import { Books } from './pages/books/Books';
import { Authors } from './pages/authors/Authors';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/navbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Login } from './pages/auth/Login';
import { createContext, Provider } from 'react';
import { useIsAuth } from './utilities/useIsAuth';
import { Users } from './pages/users/Users';
import { User } from './pages/users/Users';

interface AppContextTypes{
  userLogged?: boolean;
  user?: User | null;
}

export const AppContext = createContext<AppContextTypes | {userLogged: null, user: null | undefined}>({userLogged: true, user: null});

function App() {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  });

  const { userLogged, user } = useIsAuth();

  return (

    <div className="App">
    <AppContext.Provider value={{userLogged, user}}>
      <Router>
        <Navbar />
        <QueryClientProvider client={client}>
          <Routes>
            <Route path='/' element={<h1>Home</h1>}/>
            <Route path='/book' element={<Books />}/>
            <Route path='/author' element={<Authors />}/>
            <Route path='/user' element={<Users />}/>
            <Route path='/login' element={<Login />} />
          </Routes>
        </QueryClientProvider>
      </Router>
    </AppContext.Provider>
    </div>
  );
}

export default App;

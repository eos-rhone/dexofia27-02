import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route 
} from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Rankings from './pages/Rankings';
import { CategoryPage } from './pages/CategoryPage';
import { Assistant } from './pages/Assistant';
import { Learn } from './pages/Learn';
import { News } from './pages/News';
import { Forum } from './pages/Forum';
import { Publish } from './pages/Publish';
import { Newsletter } from './pages/Newsletter';
import { Contact } from './pages/Contact';
import { ThemeProvider } from './contexts/ThemeContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import GlowingShapes from './components/GlowingShapes';

// Activer les futures flags de React Router v7
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route 
      path="/*" 
      element={
        <ThemeProvider>
          <App />
        </ThemeProvider>
      }
      errorElement={<ErrorBoundary />}
    >
      <Route 
        index 
        element={
          <div className="min-h-screen bg-gray-900 text-gray-900 dark:text-white">
            <GlowingShapes />
            <Home />
          </div>
        } 
      />
      <Route path="categories" element={<Categories />} />
      <Route path="categories/:slug" element={<CategoryPage />} />
      <Route path="classement" element={<Rankings />} />
      <Route path="assistant" element={<Assistant />} />
      <Route path="apprendre" element={<Learn />} />
      <Route path="actualites" element={<News />} />
      <Route path="forum" element={<Forum />} />
      <Route path="publier" element={<Publish />} />
      <Route path="rester-informe" element={<Newsletter />} />
      <Route path="contact" element={<Contact />} />
    </Route>
  ),
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }
  }
);

export default router;

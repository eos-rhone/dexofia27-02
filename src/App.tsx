import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Categories } from './pages/Categories';
import { CategoryPage } from './pages/CategoryPage';
import { Assistant } from './pages/Assistant';
import { Learn } from './pages/Learn';
import { News } from './pages/News';
import { Forum } from './pages/Forum';
import { Publish } from './pages/Publish';
import { Newsletter } from './pages/Newsletter';
import { Contact } from './pages/Contact';
import Rankings from './pages/Rankings';

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar />
      <main className="container mx-auto px-4 pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:slug" element={<CategoryPage />} />
          <Route path="/classement" element={<Rankings />} />
          <Route path="/assistant" element={<Assistant />} />
          <Route path="/apprendre" element={<Learn />} />
          <Route path="/actualites" element={<News />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/publier" element={<Publish />} />
          <Route path="/rester-informe" element={<Newsletter />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

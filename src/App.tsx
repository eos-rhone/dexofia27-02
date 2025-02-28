import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import GlowingShapes from './components/GlowingShapes';
import { Home } from './pages/Home';
import { Categories } from './pages/Categories';
import { CategoryPage } from './pages/CategoryPage';
import Rankings from './pages/Rankings';
import { Assistant } from './pages/Assistant';
import { Learn } from './pages/Learn';
import { News } from './pages/News';
import { Forum } from './pages/Forum';
import { Publish } from './pages/Publish';
import { Newsletter } from './pages/Newsletter';
import { Contact } from './pages/Contact';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-900 dark:text-white">
      <Routes>
        <Route path="/" element={
          <>
            <GlowingShapes />
            <Navbar />
            <main className="w-full pt-16">
              <Home />
            </main>
          </>
        } />
        <Route path="/categories" element={
          <>
            <Navbar />
            <main className="w-full pt-16">
              <Categories />
            </main>
          </>
        } />
        <Route path="/categories/:slug" element={
          <>
            <Navbar />
            <main className="w-full pt-16">
              <CategoryPage />
            </main>
          </>
        } />
        <Route path="/classement" element={
          <>
            <Navbar />
            <main className="w-full pt-16">
              <Rankings />
            </main>
          </>
        } />
        <Route path="/assistant" element={
          <>
            <Navbar />
            <main className="w-full pt-16">
              <Assistant />
            </main>
          </>
        } />
        <Route path="/apprendre" element={
          <>
            <Navbar />
            <main className="w-full pt-16">
              <Learn />
            </main>
          </>
        } />
        <Route path="/actualites" element={
          <>
            <Navbar />
            <main className="w-full pt-16">
              <News />
            </main>
          </>
        } />
        <Route path="/forum" element={
          <>
            <Navbar />
            <main className="w-full pt-16">
              <Forum />
            </main>
          </>
        } />
        <Route path="/publier" element={
          <>
            <Navbar />
            <main className="w-full pt-16">
              <Publish />
            </main>
          </>
        } />
        <Route path="/rester-informe" element={
          <>
            <Navbar />
            <main className="w-full pt-16">
              <Newsletter />
            </main>
          </>
        } />
        <Route path="/contact" element={
          <>
            <Navbar />
            <main className="w-full pt-16">
              <Contact />
            </main>
          </>
        } />
      </Routes>
    </div>
  );
}

export default App;

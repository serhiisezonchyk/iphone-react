import './App.css';
import Chip from './components/Chip';
import Features from './components/Features';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Highlights from './components/Highlights';
import Model from './components/Model';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <main className="overflow-y-auto overflow-x-hidden bg-black">
        <Hero />
        <Highlights />
        <Model />
        <Features />
        <Chip />
        <Footer />
      </main>
    </>
  );
}

export default App;

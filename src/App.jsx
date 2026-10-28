import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import About from './sections/About'
import Contact from './sections/Contact'

function App() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-slate-200">
        <Hero />
        <Projects />
        <Experience />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App

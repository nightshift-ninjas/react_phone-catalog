import { Outlet } from 'react-router-dom';
import { Navbar } from '../widgets/Navbar';
import { Footer } from '../widgets/Footer';

function App() {
  return (
    <div>
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default App;

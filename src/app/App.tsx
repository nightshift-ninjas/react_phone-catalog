import { Outlet } from 'react-router-dom';
import { Navbar } from '../widgets/Navbar';

function App() {
  return (
    <div>
      <Navbar />

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;

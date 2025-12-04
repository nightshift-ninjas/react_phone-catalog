import { Outlet } from 'react-router-dom';
import { Navbar } from '../widgets/Navbar';
import { Footer } from '../widgets/Footer';
import { GlobalSearch } from '../features/global-search';
import { useState } from 'react';

function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleOpenSearch = () => setIsSearchOpen(true);
  const handleCloseSearch = () => setIsSearchOpen(false);

  return (
    <div>
      <Navbar onSearchClick={handleOpenSearch} />

      <main>
        <Outlet />

        <GlobalSearch isOpen={isSearchOpen} onClose={handleCloseSearch} />
      </main>

      <Footer />
    </div>
  );
}

export default App;

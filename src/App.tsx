import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext';

import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { Room } from './pages/Room';
import { AdminRoom } from './pages/AdminRoom';
import { RoomsMe } from './pages/RoomsMe';
import { AllRooms } from './pages/AllRooms';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms/new" element={<NewRoom />} />
          <Route path="/rooms/me" element={<RoomsMe />} />
          <Route path="/rooms/:id" element={<Room />} />
          <Route path="/admin/rooms/:id" element={<AdminRoom />} />
          <Route path="/rooms" element={<AllRooms />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;

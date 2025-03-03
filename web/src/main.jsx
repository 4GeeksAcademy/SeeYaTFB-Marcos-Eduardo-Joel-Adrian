import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from "./context/User";
import { BrowserRouter } from 'react-router';
import { FavoritesProvider } from './context/Booking.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <FavoritesProvider>
          <App />
        </FavoritesProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
)

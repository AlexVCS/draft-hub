import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Routes, Route} from "react-router";
import './index.css'
import Board from './components/Board.jsx';
import Profile from './components/Profile.jsx';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Board />} />
        <Route path="player/:playerId/:playerName" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

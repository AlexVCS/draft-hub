import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router";
import "./index.css";
import Board from "./components/Board.tsx";
import Profile from "./components/Profile.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import PlayerDetails from "./components/PlayerDetails.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Board />} />
          <Route path="player/:playerName" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);

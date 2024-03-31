import React from "react";
import "./App.css";
import Interface from "./Pages/Interface";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import { FaUser } from "react-icons/fa";

function App() {
  const darkTheme = {
    bg: "linear-gradient(45deg, #A67BFF, #6900E8)", // Soft pinky-purple gradient
    bgLight: "#1C1E27",
    primary: "#6D43FF",
    text_primary: "#F2F3F4",
    text_secondary: "#b1b2b3",
    card: "#171721",
    card_light: "#191924",
    button: "#6D43FF",
    white: "#FFFFFF",
    black: "#000000",
  };

  return (
    <div
      className="app"
      style={{ backgroundImage: darkTheme.bg, color: darkTheme.text_primary }}
    >
      <h1 className="title">Task Board</h1>
      <div style={{ alignSelf: "end", marginBottom: "55px" }}>
        <FaUser size={50} />
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Interface />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import "./App.css";
import { useEffect } from "react";
import { useTelegram } from "./hooks/useTelegram";
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import RegisterFormStudy from "./components/RegisterForm/Study/Study";
import RegisterFormGuest from "./components/RegisterForm/Guest/Guest";
import Navigation from "./components/Navigation/Navigation";

function App() {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<Navigation />} />
        <Route path={"regform_study"} element={<RegisterFormStudy />} />
        <Route path={"regform_guest"} element={<RegisterFormGuest />} />
      </Routes>
    </div>
  );
}

export default App;

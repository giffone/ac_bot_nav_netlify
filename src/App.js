import "./App.css";
import { useEffect } from "react";
import { useTelegram } from "./hooks/useTelegram";
import Header from "./Components/Header/Header";
import { Route, Routes } from "react-router-dom";
import RegisterForm from "./Components/RegisterForm/RegisterForm";
import Menu from "./Components/Menu/Menu";

function App() {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<Menu />} />
        <Route path={"regform"} element={<RegisterForm />} />
      </Routes>
    </div>
  );
}

export default App;

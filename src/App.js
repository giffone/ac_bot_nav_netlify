import "./App.css";
import { useEffect } from "react";
import { useTelegram } from "./hooks/useTelegram";
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import RegisterForm from "./components/RegisterForm/RegisterForm";
// import About from "./components/About/About";

function App() {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        {/* <Route index element={<About />} /> */}
        <Route path={"regform"} element={<RegisterForm />} />
      </Routes>
    </div>
  );
}

export default App;

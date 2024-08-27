import "./App.css";
import { useEffect } from "react";
import { useTelegram } from "./hooks/useTelegram";
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import Main from "./components/Main/Main";
import RegisterForm from "./components/Navigation/Registration/Registration";
import RegisterFormGuest from "./components/Forms/Register/Guest/Guest";
import RegisterFormStudy from "./components/Forms/Register/Study/Study";
import AdminForm from "./components/Navigation/Admin/Admin";
import CreateAdmin from "./components/Forms/Admin/Admin";

function App() {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<Main />} />
        <Route path={"regform"} element={<RegisterForm/>} />
        <Route path={"regform_study"} element={<RegisterFormStudy />} />
        <Route path={"regform_guest"} element={<RegisterFormGuest />} />
        <Route path={"adminform"} element={<AdminForm />} />
        <Route path={"create_admin"} element={<CreateAdmin />} />
      </Routes>
    </div>
  );
}

export default App;

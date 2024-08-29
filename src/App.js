import "./App.css";
import { useEffect } from "react";
import { useTelegram } from "./hooks/useTelegram";
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import Main from "./components/Main/Main";
import RegistrationForm from "./components/Navigation/Registration/Registration";
import RegisterFormGuest from "./components/Forms/Register/Guest/Guest";
import RegisterFormStudy from "./components/Forms/Register/Study/Study";
import AdminForm from "./components/Navigation/Admin/Admin";
import CreateAdminForm from "./components/Forms/Admin/Admin";
import InvitesForm from "./components/Navigation/Invites/Invites";
import ApproveStudent from "./components/Forms/Invites/Student/Student";
import GuestList from "./components/Forms/Invites/Guest/Guest";
import CreateInviteGuest from "./components/Forms/Invites/Guest/Guest";
import CreateInviteStudent from "./components/Forms/Invites/Student/Student";

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
        {/* registration */}
        <Route path={"regform"} element={<RegistrationForm />} />
        <Route path={"regform_study"} element={<RegisterFormStudy />} />
        <Route path={"regform_guest"} element={<RegisterFormGuest />} />
        {/* invites */}
        <Route path={"invitesform"} element={<InvitesForm />} />
        <Route path={"invite_guest"} element={<CreateInviteGuest />} />
        <Route path={"invite_student"} element={<CreateInviteStudent />} />
        <Route path={"approve_student"} element={<ApproveStudent />} />
        <Route path={"guest_list"} element={<GuestList />} />
        {/* admins */}
        <Route path={"adminform"} element={<AdminForm />} />
        <Route path={"create_admin"} element={<CreateAdminForm />} />
      </Routes>
    </div>
  );
}

export default App;

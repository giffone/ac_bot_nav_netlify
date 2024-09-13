import "./App.css";
import { useEffect } from "react";
import { useTelegram } from "./hooks/useTelegram";
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import Main from "./components/Main/Main";
import RegForm from "./components/Navigation/Registration/Registration";
import GuestRegForm from "./components/Forms/Register/Guest/Guest";
import StudentRegForm from "./components/Forms/Register/Student/Student";
import AdminForm from "./components/Navigation/Admin/Admin";
import CreateAdminForm from "./components/Forms/Admin/Admin";
import InvitesForm from "./components/Navigation/Admin/Invites/Invites";
import ApproveStudent from "./components/Forms/Invites/Student/Student";
import GuestList from "./components/Forms/Invites/Guest/Guest";
import CreateInviteGuest from "./components/Forms/Invites/Guest/Guest";
import CreateInviteStudent from "./components/Forms/Invites/Student/Student";
import QrScanPage from "./components/QrScanPage/QrScanPage";

function App() {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.ready();
    tg.expand(); // open fully
  }, []);

  return (
    <div className="App">
      <Header />
       <Routes>
        <Route index element={<Main />} />
        {/* registration */}
        <Route path={"regform"} element={<RegForm />} />
        <Route path={"regform/student"} element={<StudentRegForm />} />
        <Route path={"regform/guest"} element={<GuestRegForm />} />
        {/* admin */}
        <Route path={"adminform"} element={<AdminForm />} />
        <Route path={"adminform/create_admin"} element={<CreateAdminForm />} />
        {/* admin / invites */}
        <Route path={"adminform/invitesform"} element={<InvitesForm />} />
        <Route path={"adminform/invitesform/guest"} element={<CreateInviteGuest />} />
        <Route path={"adminform/invitesform/student"} element={<CreateInviteStudent />} />
        <Route path={"adminform/invitesform/student/approve"} element={<ApproveStudent />} />
        <Route path={"adminform/invitesform/guest/list"} element={<GuestList />} />
        {/* qr */}
        <Route path="qr_scan" element={<QrScanPage />} />
      </Routes>
    </div>
  );
}

export default App;

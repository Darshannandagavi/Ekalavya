
import {  Routes, Route } from "react-router-dom";
import GuestLayout from "./components/guestlayout/GuestLayout";
import UserLayout from "./components/userlayout/UserLayout";
import AdminLayout from "./components/adminlayout/AdminLayout";
import Home from "./components/guestlayout/Home";
import About from "./components/guestlayout/About";
import Services from "./components/guestlayout/Services";
import Contact from "./components/guestlayout/Contact";
import Login from "./components/guestlayout/Login";
import Register from "./components/guestlayout/Register";
import NotFound from "./components/guestlayout/NotFound";
import UserDashboard from "./components/userlayout/UserDashboard";
import FeedbackForm from "./components/userlayout/FeedbackForm";
import Profile from "./components/userlayout/Profile";
import AdminDashboard from "./components/adminlayout/AdminDashboard";
import UserFeedbacks from "./components/adminlayout/UserFeedbacks";
import AdminUsers from "./components/adminlayout/AdminUsers";
import ForgotPassword from "./components/guestlayout/ForgotPassword";
import AdminContacts from "./components/adminlayout/AdminContacts";
import AcademicManagement from "./components/adminlayout/AcademicManagement";
import FacultyNotes from "./components/facultylayout/FacultyNote";
import StudentNotes from "./components/userlayout/StudentNotes";
import BookAnimation from "./components/guestlayout/BookAnimation";
import FacultyLayout from "./components/facultylayout/FacultyLayout";
import FacultyLogin from "./components/guestlayout/FacultyLogin";
import FacultyRequests from "./components/adminlayout/FacultyRequests";
import FacultyRegister from "./components/guestlayout/FacultyRegister";
import FacultyProfile from "./components/facultylayout/FacultyProfile";
function App() {
  return (

      <Routes>

        <Route element={<GuestLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/book" element={<BookAnimation />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/faculty-login" element={<FacultyLogin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/faculty-register" element={<FacultyRegister />} />
        </Route>

        <Route element={<UserLayout />}>
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/feedback" element={<FeedbackForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/studentnotes" element={<StudentNotes />} />
        </Route>

        <Route path="/faculty" element={<FacultyLayout />}>
          <Route path="facultynote" element={<FacultyNotes />} />
          <Route path="feedback" element={<UserFeedbacks />} />
          <Route path="profile" element={<FacultyProfile />} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/faculty" element={<FacultyRequests/>}/>
          <Route path="/admin/feedbacks" element={<UserFeedbacks />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/contacts" element={<AdminContacts />} />
          <Route path="/admin/academicmanagement" element={<AcademicManagement />} />
          <Route path="/admin/facultynote" element={<FacultyNotes />} />
          <Route path="/admin/profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<NotFound />} />

      </Routes>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth"; // The combined login page
import Welcome from "./pages/Welcome";
import AddContactPage from "./pages/NewContact";
import ContactList from "./pages/AllContacts";
import ProtectedRoute from "./ProtectedRoute"; // Import the ProtectedRoute

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route path="/" element={<ProtectedRoute element={<Welcome />} />} />
        <Route path="/contacts/new" element={<ProtectedRoute element={<AddContactPage />} />} />
        <Route path="/contacts" element={<ProtectedRoute element={<ContactList />} />} />
      </Routes>
    </Router>
  );
}

export default App;

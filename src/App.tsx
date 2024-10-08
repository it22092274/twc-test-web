import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth" // The combined login page
import Welcome from "./pages/Welcome";
import AddContactPage from "./pages/NewContact";
import ContactList from "./pages/AllContacts";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Auth />}>
        </Route>
        <Route path="/" element={<Welcome />} />
        <Route path="/contacts/new" element={<AddContactPage />} />
        <Route path="/contacts" element={<ContactList />} />
      </Routes>
    </Router>
  );
}

export default App;

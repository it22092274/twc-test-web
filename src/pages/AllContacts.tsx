import { useState, useEffect } from "react";
import {
  MdDelete,
  MdEdit,
  MdOutlineLogout,
  MdSave,
  MdSwapVert,
} from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore"; // Import the store

const ContactList = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [editContactId, setEditContactId] = useState<string | null>(null);
  const [editContactData, setEditContactData] = useState({
    fullName: "",
    gender: "",
    email: "",
    phoneNumber: "",
  });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteContactId, setDeleteContactId] = useState<string | null>(null);
  const [showDeleteSuccessPopup, setShowDeleteSuccessPopup] = useState(false);

  // Get the user from the Zustand store
  const { user } = useUserStore();
  const userid = user?._id; // Ensure userid is fetched correctly

  // Fetch contacts from the server
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/contacts");
        setContacts(response.data); // Assuming the API returns a list of contacts
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    if (userid) {
      fetchContacts(); // Fetch contacts only if userid exists
    }
  }, [userid]);

  // Filter contacts based on userid
  const userContacts = contacts.filter(contact => contact.userid === userid);

  // Handle click on Edit button
  const handleEditClick = (contact) => {
    setEditContactId(contact._id); // Correct _id reference
    setEditContactData({ ...contact });
  };

  // Handle form change for edited data
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditContactData({ ...editContactData, [name]: value });
  };

  // Handle save updated contact
  const handleSaveClick = async () => {
    try {
      await axios.patch(
        `http://localhost:3000/contacts/${editContactId}`,
        editContactData,
        {
          headers: {
            Authorization: `Bearer ${userId}`, // Include userId in the Authorization header
          },
        }
      );

      const updatedContacts = contacts.map((contact) =>
        contact._id === editContactId ? editContactData : contact
      );
      setContacts(updatedContacts);
      setEditContactId(null); // Exit edit mode

      // Show success popup
      setShowSuccessPopup(true);
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  // Handle delete confirmation
  const handleDeleteClick = (id: string) => {
    setDeleteContactId(id);
    setShowDeletePopup(true); // Show delete confirmation popup
  };

  // Handle confirm delete
  const confirmDeleteContact = async () => {
    try {
      await axios.delete(`http://localhost:3000/contacts/${deleteContactId}`, {
        headers: {
          Authorization: `Bearer ${userId}`, // Include userId in the Authorization header
        },
      });
      setContacts(contacts.filter((contact) => contact._id !== deleteContactId));
      setShowDeletePopup(false);
      setDeleteContactId(null);
      setShowDeleteSuccessPopup(true); // Show delete success popup
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  // Handle gender swap
  const handleGenderSwap = () => {
    setEditContactData((prevData) => ({
      ...prevData,
      gender: prevData.gender === "Male" ? "Female" : "Male",
    }));
  };

  return (
    <div className="min-h-screen bg-teal-900 p-8 text-white flex justify-center items-center">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <img src="/logo.png" alt="logo" className="w-24" />
            <h1 className="text-3xl font-bold">Contacts</h1>
          </div>
          <button
            className="bg-transparent border text-white px-6 py-3 rounded-full hover:bg-teal-800"
            onClick={() => {
              navigate("/contacts/new");
            }}
          >
            Add New Contact
          </button>
        </div>

        {/* Contacts Table */}
        <div className="bg-white rounded-lg overflow-hidden text-gray-800">
          <table className="w-full">
            <thead>
              <tr className="bg-teal-900 text-white">
                <th className="py-3 px-4 text-left"> </th>
                <th className="py-3 px-4 text-left">Full Name</th>
                <th className="py-3 px-4 text-left">Gender</th>
                <th className="py-3 px-4 text-left">E-mail</th>
                <th className="py-3 px-4 text-left">Phone Number</th>
                <th className="py-3 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {userContacts.map((contact) => (
                <tr key={contact._id} className="border-t py-3 px-4">
                  {/* Full Name */}
                  <td>
                    <img src="/user.png" alt="user" height={30} width={30} />
                  </td>
                  <td className="py-3 px-4">
                    {editContactId === contact._id ? (
                      <input
                        type="text"
                        name="fullName"
                        value={editContactData.fullName}
                        onChange={handleEditChange}
                        className="border px-2 py-1 rounded w-full"
                      />
                    ) : (
                      contact.fullName
                    )}
                  </td>

                  {/* Gender */}
                  <td className="py-3 px-4 flex items-center">
                    {editContactId === contact._id ? (
                      <>
                        <input
                          type="text"
                          name="gender"
                          value={editContactData.gender}
                          readOnly
                          className="border px-2 py-1 rounded w-full mr-2"
                        />
                        <button
                          onClick={handleGenderSwap}
                          className="text-yellow-500"
                        >
                          <MdSwapVert size={24} />
                        </button>
                      </>
                    ) : (
                      contact.gender
                    )}
                  </td>

                  {/* Email */}
                  <td className="py-3 px-4">
                    {editContactId === contact._id ? (
                      <input
                        type="email"
                        name="email"
                        value={editContactData.email}
                        onChange={handleEditChange}
                        className="border px-2 py-1 rounded w-full"
                      />
                    ) : (
                      contact.email
                    )}
                  </td>

                  {/* Phone Number */}
                  <td className="py-3 px-4">
                    {editContactId === contact._id ? (
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={editContactData.phoneNumber}
                        onChange={handleEditChange}
                        className="border px-2 py-1 rounded w-full"
                      />
                    ) : (
                      contact.phoneNumber
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 flex justify-end">
                    {editContactId === contact._id ? (
                      <button
                        onClick={handleSaveClick}
                        className="bg-teal-950 text-white py-2 px-6 rounded-full mr-4"
                      >
                        save
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditClick(contact)}
                          className="text-teal-950 mr-4"
                        >
                          <MdEdit size={24} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(contact._id)}
                          className="text-teal-950"
                        >
                          <MdDelete size={24} />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => console.log("Logout clicked")}
          className="text-white absolute right-5 bottom-5 hover:underline flex items-center"
        >
          <MdOutlineLogout className="text-white mr-2" />
          <span>Logout</span>
        </button>

        {/* Success Popup */}
        {showSuccessPopup && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white text-black p-5 rounded">
              <h2 className="text-xl">Contact Updated!</h2>
              <button
                onClick={() => setShowSuccessPopup(false)}
                className="mt-4 bg-teal-900 text-white py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Delete Confirmation Popup */}
        {showDeletePopup && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white text-black p-5 rounded">
              <h2 className="text-xl">Are you sure you want to delete this contact?</h2>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setShowDeletePopup(false)}
                  className="mr-4 bg-gray-400 text-white py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteContact}
                  className="bg-red-600 text-white py-2 px-4 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Success Popup */}
        {showDeleteSuccessPopup && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white text-black p-5 rounded">
              <h2 className="text-xl">Contact Deleted!</h2>
              <button
                onClick={() => setShowDeleteSuccessPopup(false)}
                className="mt-4 bg-teal-900 text-white py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactList;

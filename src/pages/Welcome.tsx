import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/useUserStore';
import { MdOutlineLogout } from 'react-icons/md';
import { useEffect } from 'react';

const Welcome = () => {
    useEffect( () => {
        const data = localStorage.getItem('user')
        if ( data ) {
            navigate('/contacts')
        }
    })
  const navigate = useNavigate();
  const { user, clearUser } = useUserStore();

  const handleAddContact = () => {
    navigate('/contacts/new'); // Navigate to the add contact page
  };

  const handleLogout = () => {
    clearUser(); // Clear the user state
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="welcomepane min-h-screen flex justify-center items-center text-white">
      <div className="w-[90%] md:w-[50%] p-8 md:p-16 rounded-lg">
        {/* Header */}
        <div className="flex-col justify-between items-center">
          <img src="/logo.png" alt="" />
          <h1 className="text-3xl font-bold"> contacts <br /> portal</h1>
        </div>

        {/* Welcome Section */}
        <div className="mt-12">
          <h2 className="text-4xl font-semibold">Welcome,</h2>
          <p className="text-lg mt-2">
            This is where your contacts will live. Click the button below to add a new contact.
          </p>

          {/* Add Contact Button */}
          <button
            onClick={handleAddContact}
            className="mt-8 px-6 py-3 border text-white font-semibold rounded-full hover:bg-teal-900 focus:outline-none"
          >
            add your first contact
          </button>
        </div>
      </div>

      {/* Logout Button with Icon */}
      <button
        onClick={handleLogout}
        className="text-white absolute right-5 bottom-5 hover:underline flex items-center"
      >
        <MdOutlineLogout className="text-white mr-2" /> {/* Icon is now to the left of the text */}
        <span>logout</span>
      </button>
    </div>
  );
};

export default Welcome;

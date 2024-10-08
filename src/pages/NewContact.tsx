import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";
import { MdOutlineLogout } from "react-icons/md";

const AddContactPage = () => {
  const navigate = useNavigate();
  const { clearUser, user } = useUserStore(); // Retrieve user from the store

  // Form validation schema
  const contactSchema = Yup.object({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    phoneNumber: Yup.string().matches(/^[0-9]+$/, "Phone number must be numeric").required("Phone number is required"),
    gender: Yup.string().oneOf(["male", "female"], "Gender is required").required("Please select a gender"),
  });

  const handleLogout = () => {
    clearUser(); // Clear user state
    navigate("/login"); // Redirect to login
  };

  const handleAddContact = async (values, { setSubmitting }) => {
    console.log(user._id)
    try {
      const contactData = {
        ...values,
        userid: user._id, // Add user ID to the request body
      };
      const res = await axios.post("http://localhost:3000/contacts", contactData);
      console.log("Contact added:", res.data);
      setSubmitting(false);
      navigate("/contacts");
    } catch (error) {
      console.error("Failed to add contact:", error);
      setSubmitting(false);
    }
  };

  return (
    <div className="welcomepane min-h-screen flex justify-center items-center text-white px-4">
      <div className="w-full max-w-4xl p-8 rounded-lg ">
        {/* Header */}
        <div className="flex-col justify-between items-center">
          <img src="/logo.png" alt="" />
          <h1 className="text-3xl font-bold"> contacts <br /> portal</h1>
        </div>

        {/* New Contact Form */}
        <h2 className="text-3xl font-black mt-4 mb-6">New Contact</h2>

        <Formik
          initialValues={{ fullName: "", email: "", phoneNumber: "", gender: "" }}
          validationSchema={contactSchema}
          onSubmit={handleAddContact}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              {/* Full Name and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Field
                    type="text"
                    name="fullName"
                    placeholder="full name"
                    className="w-full p-3 placeholder-teal-950 bg-white text-teal-900 rounded-full"
                  />
                  <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm" />
                </div>
                <div>
                  <Field
                    type="email"
                    name="email"
                    placeholder="e-mail"
                    className="w-full p-3 placeholder-teal-950 bg-white text-teal-900 rounded-full"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                </div>
              </div>

              {/* Phone Number and Gender */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Field
                    type="text"
                    name="phoneNumber"
                    placeholder="phone number"
                    className="w-full p-3 placeholder-teal-950 bg-white text-teal-900 rounded-full"
                  />
                  <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="flex items-center space-x-4">
                  <span>gender</span>
                  <label className="flex items-center">
                    <Field type="radio" name="gender" value="male" className="bg-transparent border placeholder-teal-950 mr-2" />
                    <span>male</span>
                  </label>
                  <label className="flex items-center">
                    <Field type="radio" name="gender" value="female" className="placeholder-teal-950 mr-2" />
                    <span>female</span>
                  </label>
                  <ErrorMessage name="gender" component="div" className="text-red-500 text-sm" />
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-6 py-3 hover:bg-teal-950 border text-white rounded-full focus:outline-none"
                >
                  {isSubmitting ? "Adding contact..." : "add your first contact"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
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

export default AddContactPage;

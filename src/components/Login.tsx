import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useUserStore } from "../store/useUserStore";
import { useNavigate } from "react-router-dom";

export default function LoginForm({ switchToSignup }) {
    const navigate = useNavigate()
  const setUser = useUserStore((state) => state.setUser);

  const loginSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[@$!%*#?&]/, "Password must contain at least one special character")
      .required("Password is required"),
  });

  const handleLoginSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await axios.post("http://localhost:3000/auth/login", values);
      setUser(res.data);
      setSubmitting(false);
      console.log(res.data)
      navigate('/')
    } catch (error) {
      console.error("Login failed:", error);
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-4xl font-semibold">Hi there,</h2>
      <p className="text-xl mt-2">Welcome to our <br /> contacts portal</p>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={handleLoginSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="w-[90%] max-w-full mt-8">
            <div className="mb-4">
              <Field
                type="email"
                name="email"
                placeholder="e-mail"
                className="w-[90%] h-11 px-4 py-2 mb-1 placeholder-[#083F46] bg-white text-teal-800 rounded-full"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="mb-6">
              <Field
                type="password"
                name="password"
                placeholder="password"
                className="w-[90%] h-11 placeholder-[#083F46] px-4 py-2 mb-1 bg-white text-teal-800 rounded-full"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="w-[90%] flex justify-between items-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="border border-white w-[120px] bg-[#083F46] hover:bg-teal-900 text-white py-2 rounded-full"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
              <div className="mt-4">
                <span>or </span>
                <button type="button" onClick={switchToSignup} className="text-white hover:underline underline">
                  Click here to Register
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

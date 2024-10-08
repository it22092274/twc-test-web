import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useUserStore } from "../store/useUserStore";

export default function SignupForm({ switchToLogin }) {
  const setUser = useUserStore((state) => state.setUser);

  const signupSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[@$!%*#?&]/, "Password must contain at least one special character")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSignupSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await axios.post("http://localhost:3000/auth/signup", values);
      setUser(res.data);
      setSubmitting(false);
      switchToLogin()
      localStorage.setItem('user', res.data)
    } catch (error) {
      console.error("Signup failed:", error);
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-4xl font-semibold">Register Now!</h2>
      <Formik
        initialValues={{ email: "", password: "", confirmPassword: "" }}
        validationSchema={signupSchema}
        onSubmit={handleSignupSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="w-[90%] max-w-full mt-8">
            <div className="mb-4">
              <Field
                type="email"
                name="email"
                placeholder="e-mail"
                className="w-[90%] px-4 py-2 mb-1 placeholder-[#083F46] bg-white text-teal-800 rounded-full"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="mb-6">
              <Field
                type="password"
                name="password"
                placeholder="password"
                className="w-[90%] placeholder-[#083F46] px-4 py-2 mb-1 bg-white text-teal-800 rounded-full"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="mb-6">
              <Field
                type="password"
                name="confirmPassword"
                placeholder="confirm password"
                className="w-[90%] placeholder-[#083F46] px-4 py-2 mb-1 bg-white text-teal-800 rounded-full"
              />
              <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="border border-white w-[120px] bg-[#083F46] hover:bg-teal-600 text-white py-2 rounded-full"
            >
              {isSubmitting ? "Signing up..." : "Register"}
            </button>
            <div className="mt-4">
              <button type="button" onClick={switchToLogin} className="text-white hover:underline underline">
                &lt; Back to Login
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

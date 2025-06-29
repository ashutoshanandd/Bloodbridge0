import React, { useEffect } from "react";
import Form from "../../Component/shared/form/Form";
import { useSelector } from "react-redux";
import AuthLayout from "../../Component/shared/Layout/AuthLayout";

const Login = () => {
  const { loading, error } = useSelector((state) => state.auth);



  return (
    <>
      {loading ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80">
          <div className="w-12 h-12 border-t-4 border-red-600 rounded-full loader animate-spin"></div>
        </div>
      ) : (
        <AuthLayout>
          {/* Full-screen Background Image */}
          <div className="fixed inset-0 -z-10">
            <img
              src="./assets/images/banner-1.jpg" // Different image for login
              alt="Blood donation illustration"
              className="object-cover w-full h-full"
              loading="lazy"
            />
            <div className="absolute top-10 inset-0 bg-black/30"></div>
          </div>

          {/* Centered Form with z-index - identical to register */}
          <div className="relative z-10 flex items-center justify-center min-h-[90vh] p-4">
            <div className="w-full max-w-md  bg-white rounded-lg shadow-xl animate-slide-up">
              <Form
                formTitle="Login"
                submitBtn="Login"
                formType="login"
              />
            </div>
          </div>

          {/* Same animations as register */}
          <style jsx="true">{`
            @keyframes slide-up {
              from {
                transform: translateY(20px);
                opacity: 0;
              }
              to {
                transform: translateY(0);
                opacity: 1;
              }
            }
            .animate-slide-up {
              animation: slide-up 0.6s ease-out forwards;
            }
            .loader {
              animation: spin 1s linear infinite;
            }
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </AuthLayout>
      )}
    </>
  );
};

export default Login;
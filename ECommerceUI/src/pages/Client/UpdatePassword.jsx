import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updatePassword } from "../../api/users";
import { showErrorToast, showSuccessToast } from "../../utils/toastUtils";
import { verifyResetToken } from "../../api/auth";
import Loading from "../../components/Loading";

const UpdatePassword = () => {
  const { userId, resetToken } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isTokenValid, setIsTokenValid] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const data = await verifyResetToken(resetToken, userId);
        setIsTokenValid(data.state);
      } catch (error) {
        showErrorToast("An error occurred while verifying the reset token.");
        setIsTokenValid(false);
      }
    };

    verifyToken();
  }, [resetToken, userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== passwordConfirm) {
      showErrorToast("Passwords do not match!");
      return;
    }

    const response = await updatePassword(userId, resetToken, newPassword, passwordConfirm);
    if (response.status === 200) {
      showSuccessToast("Şifre değiştirme başarılı!");
      navigate("/login");
    }
  };

  if (isTokenValid === null) {
    return <Loading />;
  }

  if (isTokenValid === false) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-13rem)] text-center">
        <h2 className="mb-4 text-2xl font-bold text-red-600">Invalid or Expired Link</h2>
        <p className="text-gray-700 dark:text-gray-300">This password reset link is no longer valid. Please request a new one.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-[calc(100vh-13rem)] lg:py-0">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Change Password
        </h2>
        <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              New Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirm-password"
              id="confirm-password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;

import React, {useEffect} from "react";

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-gray-800 opacity-50"></div>
      
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative z-10">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <p className="mb-4">{message}</p>
        <div className="flex justify-end">
          <button
            onClick={onConfirm}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
          >
            Confirm
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;

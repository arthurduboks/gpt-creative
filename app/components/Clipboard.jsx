import { useState } from "react";
import { toast } from "react-hot-toast";

const Clipboard = ({ text }) => {
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Copied!");
      })
      .catch((err) => {
        toast.error("Failed to copy!");
      });
  };

  return (
    <div className="container mx-auto mt-10 mb-4">
      <div className="flex items-center justify-between text-primary p-4 rounded-xl border border-dashed">
        <p className="text-gray-700">{text}</p>
        <button
          onClick={copyToClipboard}
          className="btn btn-primary"
          type="button"
        >
          Copy
        </button>
      </div>
    </div>
  );
};

export default Clipboard;

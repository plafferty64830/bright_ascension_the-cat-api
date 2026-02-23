import { useState } from "react";
import { uploadCat } from "../services/create";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

export default function Upload() {

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [status, setStatus] = useState<boolean>(false);

  // used to navigate to the 
  const navigate = useNavigate();

  const processFile = (selectedFile: File) => {
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setMessage(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    processFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      setLoading(true);

      await uploadCat(file);

      setMessage("Cat uploaded successfully!");
      setStatus(true);
      navigate('/');

    } catch (err) {
      console.error(err);
      setMessage(`Upload failed. ${err}`);
      setStatus(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();

    const droppedFile = e.dataTransfer.files?.[0];
    if (!droppedFile) return;

    processFile(droppedFile);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-8">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Upload Your Cat
        </h1>

        <label
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragLeave={handleDragLeave}
          className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 cursor-pointer transition
          ${isDragging
              ? "border-green-500 bg-green-50"
              : "border-gray-300 hover:border-gray-400"
            }
          `}
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="rounded-lg max-h-60 object-contain"
            />
          ) : (
            <span className="text-gray-500 text-center">
              Click or drag a cat image here
            </span>
          )}

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className="mt-6 w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload Cat"}
        </button>

        {message && (
          <div className="mt-4 flex items-center justify-center gap-2 text-sm">
            {status ? (
              <FontAwesomeIcon icon={'circle-check'} className="text-green-500" />
            ) : (
              <FontAwesomeIcon icon={'circle-xmark'} className="text-red-500" />
            )}
            <span>{message}</span>
          </div>
        )}

      </div>
    </div>
  );
}
import { useState } from "react";
import { uploadCat } from "../services/create";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { isValidImage } from "../utils/validateImage";

export default function Upload() {

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [uploadStatus, setUploadStatus] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // used to navigate to the root page once a cat image has been successfully uploaded
  const navigate = useNavigate();

  /**
   * 
   * @param selectedFile File
   * 
   * Used to handle the file received after validation if dropped or manually uploaded using the file explorer
   */
  const processFile = (selectedFile: File) => {
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setErrorMessage(null);
  };

  /**
   * 
   * @param e React.ChangeEvent<HTMLInputElement>
   * @returns void 
   * 
   * This validates the input from the manual file input.
   * If file exists, the file is passed to processFile.
   * Else, function is exited via the return method.
   * 
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    processFile(e.target.files[0]);
  };

  /**
   * Handles the submit procedure of the page
   * 
   *  1. Validation - exits if file is not set
   *  2. Attempt to upload using uploadCat service
   *  3. (a) If API fails, catch method informs the user.
   *     (b) If API succeed, user is redirected to the root list page
   *  4. Loading spinner is hidden
   * 
   */
  const handleUpload = async () => {
    if (!file) return;

    try {
      setLoading(true);

      await uploadCat(file);

      setErrorMessage("Cat uploaded successfully!");
      setUploadStatus(true);
      navigate('/');

    } catch (err) {
      console.error(err);
      setErrorMessage(`Upload failed. ${err}`);
      setUploadStatus(false);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles the styling change if a file is dragged over the drop area
   */
  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();

    const droppedFile = e.dataTransfer.files?.[0];
    if (!droppedFile) return;

    // validate the file type
    if (!isValidImage(droppedFile)) {
      setUploadStatus(false);
      setErrorMessage("Invalid file supplied. Accepted file formats are: jpg, jpeg, png and webp. Please try again");
      return;
    }

    processFile(droppedFile);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-8">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl mb-6 text-center">
          Upload Your Cat
        </h1>

        <label
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragLeave={handleDragLeave}
          className={classNames('flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 cursor-pointer transition',
            uploadStatus === false && errorMessage !== null
              ? "border-red-500 bg-red-50"
              : isDragging
                ? "border-green-500 bg-green-50"
                : "border-gray-300 hover:border-gray-400"
          )}
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

        {errorMessage && (
          <div className="mt-4 flex items-center justify-center gap-2 text-sm">
            {uploadStatus ? (
              <FontAwesomeIcon icon={'circle-check'} className="text-green-500" />
            ) : (
              <FontAwesomeIcon icon={'circle-xmark'} className="text-red-500" />
            )}
            <div className={classNames('font-bold', uploadStatus ? 'text-green-500' : 'text-red-500')}>
              {errorMessage}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
// list of mime types accepted
export const imageMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
]

// list of image file extensions accepted
export const imageExtensions = [".jpg", ".jpeg", ".png", ".webp"];

/**
 * 
 * @param file File
 * @returns Boolean
 * 
 * Validate the file extension and mimeType of the file supplied
 * 
 * Returns true if valid else returns false
 */
export const isValidImage = (file: File): boolean => {
  return (
    imageMimeTypes.includes(file.type) ||
    imageExtensions.some(ext =>
      file.name.toLowerCase().endsWith(ext)
    )
  );
};
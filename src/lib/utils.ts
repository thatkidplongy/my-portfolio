/**
 * Utility function to download a file from a URL
 * @param url - The URL of the file to download
 * @param filename - The name to save the file as
 */
export const downloadFile = (url: string, filename: string) => {
  // Create a temporary anchor element
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;

  // Append to body, click, and remove
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Utility function to download CV/Resume
 */
export const downloadCV = () => {
  const cvUrl = "/resume.pdf"; // Path to your resume in public folder
  const filename = "Florante_Clavano_Resume.pdf"; // Name for the downloaded file

  downloadFile(cvUrl, filename);
};

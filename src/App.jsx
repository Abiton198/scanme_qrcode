
import React, { useState, useRef } from 'react';
import { QRCode } from 'react-qrcode-logo'; // QR code component that supports logo overlay
import logo from './assets/logo.png'; // custom logo to embed in the QR code

function App() {
  // Reference to the QR code container (to extract canvas for download/print)
  const qrRef = useRef();

  // State to manage light/dark mode toggle
  const [darkMode, setDarkMode] = useState(false);

  // URL to be encoded in the QR code
  const url = "https://nextgenskills.co.za"; // ✅ live project link
    // const url = "https://amic-hub.netlify.app/";

  // Toggles light/dark mode by adding/removing 'dark' class on body
  // const toggleTheme = () => {
  //   setDarkMode(!darkMode);
  //   document.body.classList.toggle("dark");
  // };

  // Downloads the QR code as a PNG image
  const downloadQRCode = () => {
    const canvas = qrRef.current?.querySelector("canvas"); // Get canvas inside ref
    if (!canvas) return;

    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    const link = document.createElement("a");
    link.href = pngUrl;
    link.download = "nextgen-qr.png";
    link.click(); // Triggers download
  };

  // Opens a print-friendly window and prints the QR code
  const printQRCode = () => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (!canvas) return;

    const dataUrl = canvas.toDataURL(); // Convert to base64 image
    const printWindow = window.open("", "_blank");

    // Write image to new window and trigger print
    printWindow.document.write(`
      <html>
        <head><title>Print QR</title></head>
        <body style="text-align:center; padding-top:30px; background:#fff;">
          <img src="${dataUrl}" style="width:250px;" />
          <script>
            window.onload = function() {
              window.print();
              window.onafterprint = function () { window.close(); };
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-white dark:bg-gray-900 transition duration-500">
      
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6 text-indigo-700 dark:text-indigo-300 animate-bounce">
        📱 Scan Me - NextGen Skills
      </h1>

      {/* QR Code container */}
      <div ref={qrRef} className="my-4 p-4 bg-white dark:bg-gray-800 rounded shadow">
        <QRCode
          value={url}
          size={200}
          logoImage={logo}
          removeQrCodeBehindLogo={true} // Makes QR readable under logo
        />
      </div>

      {/* Buttons: Download / Print / Toggle Dark Mode */}
      <div className="flex space-x-4 mt-4">
        <button
          onClick={downloadQRCode}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Download
        </button>

        <button
          onClick={printQRCode}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Print
        </button>

        {/* <button
          onClick={toggleTheme}
          className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded"
        >
          Toggle Dark
        </button> */}
      </div>
    </div>
  );
}

export default App;


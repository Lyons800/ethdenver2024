'use client';

import { QRCode } from 'react-qrcode-logo';

export default function QRCodeViewer() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-cover bg-center bg-no-repeat">
      <QRCode
        value="https://github.com/gcoro/react-qrcode-logo"
        size={256}
        bgColor="rgba(255, 255, 255, 0.8)" // Semi-transparent white background
        fgColor="#000000"
        // logoImage="https://cdn-images-1.medium.com/max/1200/1*lKHjKj1SSVQe4XjosHjrow.png" // Can also be a data URL
        // You can further customize your QR code with additional props
      />
    </div>
  );
}

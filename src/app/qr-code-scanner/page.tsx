'use client';

import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

export default function Test() {
  const [data, setData] = useState('No result');

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-md px-4">
        <QrReader
          onResult={(result, error) => {
            if (!!result) {
              setData(result?.text);
            }

            if (!!error) {
              console.info(error);
            }
          }}
          constraints={{ facingMode: 'environment' }}
          videoContainerStyle={{ borderRadius: '12px', overflow: 'hidden' }}
          videoStyle={{ width: '100%', height: 'auto' }} // This ensures the video is responsive and maintains aspect ratio
          ViewFinder={({ width, height }) => (
            <svg width={width} height={height} style={{ position: 'absolute', top: 0, left: 0 }}>
              <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeDasharray="20"
              />
            </svg>
          )}
          className="aspect-square" // This makes the video viewer square
        />
      </div>
      <p className="mt-4 text-lg font-semibold text-gray-700">{data}</p>
    </div>
  );
}

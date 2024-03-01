import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const PassCard = ({ pass }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <motion.div
      layout // This prop enables automatic layout animation
      initial={{ borderRadius: 10 }}
      onClick={toggleExpand}
      animate={{
        y: isExpanded ? 0 : 50 * pass.index, // Adjust this value to control overlap
        scale: isExpanded ? 1 : 0.9,
        opacity: isExpanded ? 1 : 0.7,
        zIndex: isExpanded ? 100 : 1, // Ensure expanded card is on top
      }}
      transition={{ duration: 0.5 }}
      className="absolute left-0 right-0 m-5 mx-auto max-w-sm cursor-pointer rounded-lg bg-white p-5 shadow-lg"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">{pass.title}</h2>
          <p className="text-gray-500">{pass.date}</p>
        </div>
        <Image
          src={pass.logo}
          alt="Event Logo"
          className="h-10 w-10 rounded-full"
          width={40}
          height={40}
        />
      </div>
      {isExpanded && (
        <div className="mt-4">
          <p>{pass.description}</p>
        </div>
      )}
    </motion.div>
  );
};

export default PassCard;

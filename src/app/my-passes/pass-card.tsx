/* eslint-disable @next/next/no-img-element */

import { motion } from 'framer-motion';

const PassCard = ({ pass }: { pass: any }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="m-5 max-w-sm rounded-lg bg-white p-5 shadow-lg"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">{pass.title}</h2>
          <p className="text-gray-500">{pass.date}</p>
        </div>
        <img
          src={pass.logo}
          alt="Event Logo"
          className="h-10 w-10 rounded-full"
        />
      </div>
      <div className="mt-4">
        <p>{pass.description}</p>
      </div>
    </motion.div>
  );
};

export default PassCard;

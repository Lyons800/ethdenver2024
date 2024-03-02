import { motion } from 'framer-motion';
import { TicketIcon } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

import { Button } from './ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from './ui/drawer';

interface Event {
  id: string;
  name: string;
  image: string;
  location: string;
  description: string;
}

export function PassSheet({ event }: { event: Event }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingQR, setIsGeneratingQR] = useState(true);

  useEffect(() => {
    // Simulate QR code generation delay
    const timer = setTimeout(() => {
      setIsGeneratingQR(false);
    }, 2000); // Adjust delay as needed

    return () => clearTimeout(timer);
  }, []);

  const handleAddToWalletClick = async () => {
    setIsLoading(true);
    // Simulate a network request or processing delay
    setTimeout(() => {
      setIsLoading(false);
      // After loading, you might want to show a success message or dialog here
    }, 2000); // Simulate loading for 2 seconds
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="mt-4 w-full gap-2">
          <TicketIcon size="16" />
          Generate Pass
        </Button>
      </DrawerTrigger>

      <DrawerContent
        className="flex w-full flex-col p-4"
        style={{ height: '95vh' }}
      >
        <div className="mt-4 flex h-full w-full flex-col justify-between">
          <h3>{event.name}</h3>

          {isGeneratingQR ? (
            <div className="flex h-32 items-center justify-center">
              {' '}
              {/* Adjust size as needed */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ loop: Infinity, duration: 1 }}
              >
                {/* Loading indicator */}
                <TicketIcon size="32" />{' '}
                {/* Example, replace with your spinner */}
              </motion.div>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              {/* Placeholder for QR code */}
              <Image
                src="/qr-code.png"
                alt="QR Code"
                width={380}
                height={380}
              />
            </div>
          )}

          <div className="flex w-full justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                className={`mt-4 w-full gap-2 ${isLoading ? 'loading-class' : ''}`}
                onClick={handleAddToWalletClick}
                disabled={isLoading}
              >
                {isLoading ? (
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ loop: Infinity, duration: 1 }}
                  >
                    <TicketIcon size="16" />
                  </motion.span>
                ) : (
                  <>
                    <TicketIcon size="16" />
                    Add to Apple Wallet
                  </>
                )}
              </Button>
            </motion.div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useWallet } from '@/context/wallet-context';
// import SignInButton from '@/lib/components/NearConnect';
import { Button } from '@/lib/components/ui/button';

export default function ConnectPage() {
  const { isSignedIn, wallet } = useWallet();
  const router = useRouter();

  if (isSignedIn) {
    router.push('/');
  }

  const handleSignIn = () => {
    wallet.signIn();
  };

  // Animation variants for the welcome text and slogan
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 0.3, duration: 0.6 },
    },
  };

  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { delay: 0.5, duration: 0.5 },
    },
  };

  return (
    <motion.div
      className="flex min-h-[60vh] flex-col items-center justify-center gap-8 p-4 text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        background:
          'url("https://img.freepik.com/free-vector/blue-fluid-background-frame_53876-99019.jpg?w=900&t=st=1709394552~exp=1709395152~hmac=cd670c77793d17f5dab718c49202dd16cdc290aa7d8a9619cacd0d266cc5434d") center center / cover no-repeat',
        padding: '50px', // Example padding, adjust as needed
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <motion.h1 variants={textVariants} className="text-3xl font-bold">
        Welcome to NearEventsHub!
      </motion.h1>
      <motion.p variants={textVariants} className="text-xl">
        Empowering Event Engagement: Secure, Trustless, and Collaborative
        Experiences on the Blockchain{' '}
      </motion.p>
      {/* The SignInButton can be replaced or uncommented as needed */}
      {/* <SignInButton /> */}
      <Button className="w-full" variant="outline" onClick={handleSignIn}>
        Connect
      </Button>
    </motion.div>
  );
}

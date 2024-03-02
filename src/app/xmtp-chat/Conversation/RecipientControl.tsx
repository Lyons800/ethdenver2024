import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import AddressInput from '../AddressInput';
import { isEns, getAddressFromPath, is0xAddress } from '../helpers';
import { useAppStore } from '../store/app';
import useWalletProvider from '../hooks/useWalletProvider';
import BackArrow from '../BackArrow';

const RecipientInputMode = {
  InvalidEntry: 0,
  ValidEntry: 1,
  FindingEntry: 2,
  Submitted: 3,
  NotOnNetwork: 4,
};

const RecipientControl = (): JSX.Element => {
  const { resolveName, lookupAddress } = useWalletProvider();
  const client = useAppStore((state) => state.client);
  const router = useRouter();
  const pathname = usePathname()
  const searchParams = useSearchParams();
  const recipientWalletAddr = searchParams.get('recipientWalletAddr');
  const recipientWalletAddress = Array.isArray(recipientWalletAddr)
    ? recipientWalletAddr[0]
    : (recipientWalletAddr as string);

  // const recipientWalletAddress = getAddressFromPath(router)
  const [recipientInputMode, setRecipientInputMode] = useState(
    RecipientInputMode.InvalidEntry
  );
  const [hasName, setHasName] = useState(false);

  const checkIfOnNetwork = useCallback(
    async (address: string): Promise<boolean> => {
      return client?.canMessage(address) || false;
    },
    [client]
  );

  const onSubmit = async (address: string) => {
    router.push(address ? `/xmtp-chat/dm/${address}` : '/xmtp-chat/dm/');
  };

  const handleBackArrowClick = useCallback(() => {
    router.push('/');
  }, [router]);

  const completeSubmit = async (address: string, input: HTMLInputElement) => {
    if (await checkIfOnNetwork(address)) {
      onSubmit(address);
      input.blur();
      setRecipientInputMode(RecipientInputMode.Submitted);
    } else {
      setRecipientInputMode(RecipientInputMode.NotOnNetwork);
    }
  };

  useEffect(() => {
    const handleAddressLookup = async (address: string) => {
      const name = await lookupAddress(address);
      setHasName(!!name);
    };
    if (recipientWalletAddress && !isEns(recipientWalletAddress)) {
      setRecipientInputMode(RecipientInputMode.Submitted);
      handleAddressLookup(recipientWalletAddress);
    } else {
      setRecipientInputMode(RecipientInputMode.InvalidEntry);
    }
  }, [lookupAddress, recipientWalletAddress]);

  const handleSubmit = useCallback(
    async (e: React.SyntheticEvent, value?: string) => {
      e.preventDefault();
      const data = e.target as typeof e.target & {
        recipient: { value: string };
      };
      const input = e.target as HTMLInputElement;
      const recipientValue = value || data.recipient.value;
      if (isEns(recipientValue)) {
        setRecipientInputMode(RecipientInputMode.FindingEntry);
        const address = await resolveName(recipientValue);
        if (address) {
          await completeSubmit(address, input);
        } else {
          setRecipientInputMode(RecipientInputMode.InvalidEntry);
        }
      } else if (is0xAddress(recipientValue)) {
        await completeSubmit(recipientValue, input);
      }
    },
    [resolveName]
  );

  const handleInputChange = useCallback(
    async (e: React.SyntheticEvent) => {
      const data = e.target as typeof e.target & {
        value: string;
      };
      if (pathname !== '/xmtp-chat/dm') {
        router.push('/xmtp-chat/dm');
      }
      if (isEns(data.value) || is0xAddress(data.value)) {
        handleSubmit(e, data.value);
      } else {
        setRecipientInputMode(RecipientInputMode.InvalidEntry);
      }
    },
    [handleSubmit, router]
  );

  return (
    <>
      <div className="ml-3 flex items-center md:hidden">
        <BackArrow onClick={handleBackArrowClick} />
      </div>
      <div className="flex flex-1 shrink flex-col justify-center bg-zinc-50 md:border-b md:border-gray-200 md:px-4 md:pb-[2px]">
        <form
          className="flex h-8 w-full pl-2 pt-1 md:pl-0"
          action="#"
          method="GET"
          onSubmit={handleSubmit}
        >
          <label htmlFor="recipient-field" className="sr-only">
            Recipient
          </label>
          <div className="text-n-300 focus-within:text-n-600 relative w-full">
            <div className="text-md pointer-events-none absolute left-0 top-1 flex items-center font-medium md:text-sm md:font-semibold">
              To:
            </div>
            <AddressInput
              recipientWalletAddress={recipientWalletAddress}
              id="recipient-field"
              className="caret-n-600 text-n-600 block w-[95%] bg-transparent pl-7 pr-3 pt-[3px] font-mono text-lg placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 md:pt-[1px] md:pt-[2px]"
              name="recipient"
              onInputChange={handleInputChange}
            />
            <button type="submit" className="hidden" />
          </div>
        </form>

        {recipientInputMode === RecipientInputMode.Submitted ? (
          <div className="text-md text-n-300 ml-10 pb-1 font-mono text-sm md:ml-8 md:pb-[1px]">
            {hasName ? recipientWalletAddress : <br />}
          </div>
        ) : (
          <div className="text-n-300 ml-[29px] pb-1 pl-2 text-sm md:pb-[3px] md:pl-0 md:text-xs">
            {recipientInputMode === RecipientInputMode.NotOnNetwork &&
              'Recipient is not on the XMTP network'}
            {recipientInputMode === RecipientInputMode.FindingEntry &&
              'Finding ENS domain...'}
            {recipientInputMode === RecipientInputMode.InvalidEntry &&
              'Please enter a valid wallet address'}
            {recipientInputMode === RecipientInputMode.ValidEntry && <br />}
          </div>
        )}
      </div>
    </>
  );
};

export default RecipientControl;

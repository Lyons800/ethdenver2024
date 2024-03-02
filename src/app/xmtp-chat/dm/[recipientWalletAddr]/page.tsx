'use client'
import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { useRouter, useSearchParams} from 'next/navigation'
import { Conversation } from '../../Conversation'
import useWalletProvider from '../../hooks/useWalletProvider'
import { isEns } from '../../helpers/string'

const ConversationPage: NextPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const recipientWalletAddrQuery = searchParams.get('recipientWalletAddr')
  const { resolveName } = useWalletProvider()
  const [recipientWalletAddr, setRecipientWalletAddr] = useState<string>()
 
  useEffect(() => {
    const routeAddress =
      (Array.isArray(recipientWalletAddrQuery)
        ? recipientWalletAddrQuery.join('/')
        : recipientWalletAddrQuery) ?? ''
    setRecipientWalletAddr(routeAddress)
  }, [recipientWalletAddr])

  useEffect(() => {
    if (!recipientWalletAddr && window.location.pathname.includes('/dm')) {
      router.push(window.location.pathname)
      setRecipientWalletAddr(window.location.pathname.replace('/dm/', ''))
    }
    const checkIfEns = async () => {
      if (recipientWalletAddr && isEns(recipientWalletAddr)) {
        const address = await resolveName(recipientWalletAddr)
        router.push(`/xmtp-chat/dm/${address}`)
      }
    }
    checkIfEns()
  }, [recipientWalletAddr, window.location.pathname])

  return <Conversation recipientWalletAddr={recipientWalletAddr ?? ''} />
}

export default React.memo(ConversationPage)

import { authOptions } from '@/auth'
import { getDocs } from 'firebase/firestore'
import { getServerSession } from 'next-auth'

import { chatMembersCollectionsGroupRef } from "@/lib/converters/ChatMembers"
import ChatListRows from './ChatListRows'


async function ChatList() {
  const session = await getServerSession(authOptions)

  const chatsSnapshot = await getDocs(
    chatMembersCollectionsGroupRef(session?.user.id!)
  );



  const initialChats = chatsSnapshot.docs.map((doc) => ({
    ...doc.data(),
    timestamp: null
  }));

  return (
  <ChatListRows initialChats={initialChats} />
  );


}

export default ChatList
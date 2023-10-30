import { authOptions } from "@/auth"
import ChatInput from "@/components/ChatInput";
import { getServerSession } from "next-auth";


type Props = {
  params:{
    chatId:string
  }
}

async function ChatPage({ params: { chatId } }: Props) {
  const session = await getServerSession(authOptions);
  return (
    <>

      <ChatInput chatId={chatId} />

    </>
  )
}

export default ChatPage
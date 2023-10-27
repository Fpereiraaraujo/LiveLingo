import { authOptions } from '@/auth'
import { getServerSession } from 'next-auth'


async function ChatList() {
    const session = await getServerSession(authOptions)
  return (
    <div>ChatList</div>
  )
}

export default ChatList
import React from 'react'
import Logo from './Logo'
import DarkModeToggle from './DarkModeToggle'
import UserButton from './UserButton'
import UserAvatar from './UserAvatar'
import { authOptions } from '@/auth'
import { getServerSession } from "next-auth"
import { MessagesSquareIcon } from 'lucide-react'
import Link from 'next/link'
import CreateChatButton from './CreateChatButton'


async function Header() {
  const session = await getServerSession(authOptions);
  console.log(session);


  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900">
      <nav className='flex flex-col md:flex-row items-center p-5 pl-2 bg-white dark:bg-gray-900 max-w-7xl mx-auto'>
        <Logo />
        <div className=' flex items-center justify-end space-x-4'>

          {session ? (
            <>
              <Link href={"/chat"}>
                <MessagesSquareIcon className='text-black dark:text-white' />
              </Link>
              <CreateChatButton/>
            </>
          ) : (
            <Link href='/pricing'>Pricing</Link>
          )}




          <DarkModeToggle />
          <UserButton session={session} />


        </div>
      </nav>

    </header >
  )
}

export default Header
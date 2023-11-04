"use client"



import LOGOLINGO from "@/images/logos/LOGOLINGO.png"


import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import Image from 'next/image'

function Logo() {
  return (
    <div className="flex items-center w-72 h-14">
      <AspectRatio
        ratio={16 / 9}
        className='flex items-center justify-center' >

        <Image priority
          src={LOGOLINGO}
          alt="logo"
          className="dark:filter dark:invert w-40" />
      </AspectRatio>
    </div >
  )
}

export default Logo
"use client"

import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import Image from 'next/image'

function Logo() {
  return (
    <div className="flex items-center w-72 h-14">
      <AspectRatio
        ratio={16 / 9}
        className='flex items-center justify-center' >

      <Image priority
        src=""
        alt="logo"
        className="dark:filter dark:invert" />
    </AspectRatio>
    </div >
  )
}

export default Logo
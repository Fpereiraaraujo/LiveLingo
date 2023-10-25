'use client'

import { useSession } from "next-auth/react"

function CheckoutButton() {
  const { data: session } = useSession()
  const createCheckoutSession = async () => {
    if(!session) return; 
  }
  return (
    <div className='flex flex-col space-y-2' >
      <button onClick={() => createCheckoutSession()} className='mt-8 block rounded-md bg-indigo-600 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sn hover:bg-indigo-500 focus-visible:outline cursor-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
    cursor-pointer disable:opacity-80 disablebg-indigo-600/50 disable:text-white disable:cursor-default'>
        Sign Up
      </button>
    </div>
  )
}

export default CheckoutButton
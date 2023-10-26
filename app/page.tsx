import { authOptions } from '@/auth'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'

export default async function Home() {

  const session = await getServerSession()

  console.log(session)

  return (
    <main className="">
      <div className='relative isolate pt-14 dark:bg-gray-900'>
        <div className="absolute inset-x-0 top-28 -z-10 transform-gpu overflow-hidden blur-3xl" >

          <div className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[40deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875]'
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4)"
            }}>
          </div>


        </div>
        <div className='py-12 sm:py-20 lg:pb-40'>
          <div className='mx-auto max-w-7xl px-6 lg:px-6'>
            <div className='mx-auto max-w-2xl text-center '>
              <h1 className='text-4xl font-bold tracking-tight sm:text-6xl'>
                Chat With Anyone,Anywhere
              </h1>
              <p className='mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300'>
                You Speak your len....{" "}
                <span className='text-indigo-600 dark:text-indigo-500'>
                  Let AI handler the translation
                </span>
              </p>
              <div className='mt-10 flex items-center justify-center gap-x-6'>
                <Link href="/chat" className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white dark:text-white shadow-sm hover:bg-indigo-500 focus:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Get Started
                </Link>
                <Link href="/pricing" className='text-sm font-semibold leading-6 text-gray-900 dark:text-gray-300'>
                  View Pricing <span aria-hidden="true">-</span>
                </Link>
              </div>
            </div>
            <div className='mt-16 flow-root sm:mt-24'>
              <div className='-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
                <Image
                  unoptimized
                  src=""
                  alt="app Screenshot"
                  width={2432}
                  height={1442}
                  className='rounded-md shadow-2xl ring-1 ring-gray-900/1' />
              </div>
            </div>

          </div>

        </div>
      </div>

    </main>
  )
}

'use client'

import { db } from "@/firebase"
import { useSubscriptionStore } from "@/store/store"
import { addDoc, collection, onSnapshot } from "firebase/firestore"
import { useSession } from "next-auth/react"
import { useState } from "react"
import LoadingSpinner from "./LoadingSpinner"
import ManageAccountButton from "./ManageAccountButton"

function CheckoutButton() {
  const { data: session } = useSession()
  const subscription = useSubscriptionStore((state) => state.subscription)

  const isLoadingSubscription = subscription === undefined;


  const isSubscribed = subscription?.status === "active" && subscription?.role === "pro"



  const [loading, setLoading] = useState(false)
  const createCheckoutSession = async () => {
    if (!session?.user.id) return;
    // push a document into firebase db
    setLoading(true);

    const docRef = await addDoc(
      collection(db, 'customers', session.user.id, "checkout_sessions"),
      {
        price: "price_1O57BfDjLJMyLciJqpPs8pTW",
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      })

    //... stripe extension on firebase will create a checkout session
    return onSnapshot(docRef, (snap) => {
      const data = snap.data();
      const url = data?.url;
      const error = data?.error;



      if (error) {
        //show an error to your customer and 
        // inspect your clound function logs in the firebase console
        alert(`An error occured: ${error.message}`);
        setLoading(false)
      }

      if (url) {
        //we have a stribe checkout URL,let´s redirect
        window.location.assign(url);
        setLoading(true)
      }

    })

    //redirect user to checkout page

  }
  return (



    <div className='flex flex-col space-y-2' >
      {/*if subscribed show me user in subscribed */}

      {isSubscribed && (
        <>
          <hr className="mt-5" />
          <p className="pt-5 text-center text-xs text-indigo-600">
          Você está inscrito na versão PRO
          </p>
        </>
      )}
      <div className='mt-8 block rounded-md bg-indigo-600 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sn hover:bg-indigo-500 focus-visible:outline cursor-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
    cursor-pointer disable:opacity-80 disablebg-indigo-600/50 disable:text-white disable:cursor-default'>

        {isSubscribed ? (
          <ManageAccountButton />
        ) : isLoadingSubscription || loading ? (
          <LoadingSpinner />
        ) : (
          <button onClick={() => createCheckoutSession()}>Fazer Upgrade </button>
        )}

      </div>
    </div>
  )
}

export default CheckoutButton
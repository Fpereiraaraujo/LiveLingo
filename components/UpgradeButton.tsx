'use client'

import { useSubscriptionStore } from "@/store/store"
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";


function UpgradeButton() {

    const subscription = useSubscriptionStore((state) => state.subscription)
    const isPro = subscription?.role === "pro";
    const router = useRouter();



    if (subscription === undefined || isPro) return null;

    return (
        <Button
            onClick={() => router.push('/register')}
            className="w-full rounded-none bg-gradient-to-r from-[#7777D6] to-[#E935C1]
        text-center text-white px-5 py-2 hover:from-[#7775D9]  hover:to-[#E935C1] hover:shadow-md hover:opacity-75 transition-all">
            Aprimore para a versão PRO para Desbloquear todos os recursos.
        </Button>
    )
}

export default UpgradeButton
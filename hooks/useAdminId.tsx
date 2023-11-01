"use client"

import { chatMemberAdminRef } from "@/lib/converters/ChatMembers";
import { getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

function useAdminId({ chatId }: { chatId: string }) {
    const [adminId, setAdminId] = useState<string>("");

    useEffect(() => {
        const fetcheAdminStatus = async () => {
            const adminId = (await getDocs(chatMemberAdminRef(chatId))).docs.map((doc) => doc.id)[0];
            setAdminId(adminId)
        }
        fetcheAdminStatus()
    },[chatId])

    return adminId;
}

export default useAdminId
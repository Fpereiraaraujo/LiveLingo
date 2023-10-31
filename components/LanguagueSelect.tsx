'use client'

import { LanguagesSupported, languagesSupportedMap, useLanguageStore, useSubscriptionStore } from "@/store/store"

import { Select, SelectContent, SelectValue, SelectItem, SelectTrigger } from "@/components/ui/select";

import { usePathname } from "next/navigation";

import LoadingSpinner from "./LoadingSpinner";

import Link from "next/link";


function LanguagueSelect() {
    const [language, setLanguage, getLanguages, getNotSupportedLanguages] = useLanguageStore((state) => [
        state.language,
        state.setLanguage,
        state.getLanguages,
        state.getNoSupportedLanguage,
    ])

    const subscription = useSubscriptionStore((state) => state.subscription)
    const isPro = subscription?.role === "pro" && subscription?.status === "active";


    const pathName = usePathname();
    const isChatPage = pathName.includes("/chat")

    return isChatPage && (
        <div>
            <Select onValueChange={(value: LanguagesSupported) => setLanguage(value)}>

                <SelectTrigger className="w-[150px] text-black dark:text-white">
                    <SelectValue placeholder={languagesSupportedMap[language]} className="" />
                </SelectTrigger>

                <SelectContent>
                    {subscription === undefined ? (
                        <LoadingSpinner />
                    ) : (
                        <>
                            {getLanguages(isPro).map((language) => (
                                <SelectItem key={language} value={language}>
                                    {languagesSupportedMap[language]}
                                </SelectItem>
                            ))}
                            {getNotSupportedLanguages(isPro).map((language) => (
                                <Link href={"/register"} key={language} prefetch={false}>
                                    <SelectItem
                                        key={language}
                                        value={language}
                                        disabled
                                        className="bg-gray-300/50 text-gray-500 dark:text-white py-2 my-1">
                                        {languagesSupportedMap[language]}(PRO)
                                    </SelectItem>
                                </Link>
                            ))}
                        </>
                    )}
                </SelectContent>
            </Select>
        </div>
    )
}

export default LanguagueSelect
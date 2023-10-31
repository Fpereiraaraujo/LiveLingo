import { create } from 'zustand';


import { Subscription } from '@/types/Subscription';


export type LanguagesSupported =
    | "en"
    | "de"
    | "fr"
    | "es"
    | "hi"
    | "ja"
    | "la"
    | "ru"
    | "zh"
    | "ar";


export const languagesSupportedMap: Record<LanguagesSupported, string> = {
    en: "English",
    de: "German",
    fr: "French",
    es: "Spanish",
    hi: "Hindi",
    ja: "Japonese",
    la: "Latin",
    ru: "Russian",
    zh: "Mandarin",
    ar: "Arabic",

}

const LANGUAGES_IN_FREE = 2

interface LanguageState {
    language: LanguagesSupported;
    setLanguage: (language: LanguagesSupported) => void;
    getLanguages: (isPro: boolean) => LanguagesSupported[];
    getNoSupportedLanguage: (isPro: boolean) => LanguagesSupported[];
}


export const useLanguageStore = create<LanguageState>()((set, get) => ({
    language: "en",
    setLanguage: (language: LanguagesSupported) => set({ language }),
    getLanguages: (isPro: boolean) => {
        if (isPro)
            return Object.keys(languagesSupportedMap) as LanguagesSupported[];


            return Object.keys(languagesSupportedMap).slice(
                0,
                LANGUAGES_IN_FREE
            ) as LanguagesSupported[];
    },
    getNoSupportedLanguage:(isPro:boolean)=>{
        if(isPro) return[];
        return Object.keys(languagesSupportedMap).slice(LANGUAGES_IN_FREE) as LanguagesSupported[];
    },
}))





interface SubscriptionState {
    subscription: Subscription | null | undefined;
    setSubscription: (subscription: Subscription | null) => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
    subscription: undefined,
    setSubscription: (subscription: Subscription | null) => set({
        subscription
    })
}))

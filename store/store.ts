import { create } from 'zustand';


import { Subscription } from '@/types/Subscription';


export type LanguageSupported =
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


export const LanguageSupportedMap: Record<LanguageSupported, string> = {
    en: "english",
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

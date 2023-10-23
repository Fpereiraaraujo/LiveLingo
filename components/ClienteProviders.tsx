"use cliente"

import { SessionProvider } from "next-auth/react"


export default function ClienteProviders({
    children,

}: {
    children: React.ReactNode;
}) {
    return <SessionProvider> {children} < SessionProvider />;
}
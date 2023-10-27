export default function ChatsLayout({
    children }:
    { children: React.ReactNode }
) {
    return (
        <div className="flex flex-1 w-full flex-col masx-w-6xl mx-auto">
            {children}
        </div>
    )
}
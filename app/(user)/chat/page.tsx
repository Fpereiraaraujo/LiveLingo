import ChatList from "@/components/ChatList";

type Props = {
    params: {};
    searchParams: {
        error: string
    }
}
function ChatsPage({ searchParams: { error } }: Props) {
    return (
        <div>
            <ChatList/>
        </div>
    )
}

export default ChatsPage
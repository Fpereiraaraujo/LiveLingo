'use client'

import InviteUser from "./InviteUser"


function AdminControls({ chatId }: { chatId: string }) {
    return (
        <div className="flex justify-end spacce-x-2 m-5 mb-0">
            <InviteUser chatId={chatId} />
          

        </div>
    )
}

export default AdminControls
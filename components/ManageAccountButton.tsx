import { generatePortalLink } from "@/actions/GeneratePortalLinks"


function ManageAccountButton() {
  return (
    <form action={generatePortalLink}>
        <button type="submit">Gerenciar conta

        </button>
    </form>
  )
}

export default ManageAccountButton
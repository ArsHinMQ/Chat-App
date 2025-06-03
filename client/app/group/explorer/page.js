import getCategories from "@/app/request/get-categories"
import GroupExplorer from "./components"

export default async function GroupExplorerPage() {
    const categories = await getCategories()
    return <GroupExplorer inputCategories={categories} />
}




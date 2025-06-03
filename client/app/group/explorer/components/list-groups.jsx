import findFirstLetter from "@/app/helper/find-first-letter"
import getFilePath from "@/app/helper/get-file-path"
import request from "@/app/request"
import { useLanguage } from "@/app/provider/language-provider"
import { useCallback, useEffect, useRef, useState } from "react"

export default function GroupExplorerListGroups({ setFocusedGroup, setShowGroupDetils, categories, selectedCategories }) {

    const [groups, setGroups] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const { translations } = useLanguage()
    const observer = useRef()


    const loadMore = () => {
        if (!isLoading && hasMore) {
            fetchGroups(currentPage + 1, true)
        }
    }

    const lastGroupElementRef = useCallback(node => {
        if (isLoading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                loadMore()
            }
        })
        if (node) observer.current.observe(node)
    }, [isLoading, hasMore])


    const openGroupDetails = (groupId) => {
        setFocusedGroup(groups.find(g => g.id === groupId))
        setShowGroupDetils(true)
    }

    const fetchGroups = async (page = 1, append = false) => {
        setIsLoading(true)
        const res = await request({
            route: '/group',
            method: 'GET',
            withAuth: true,
            query: {
                categories: selectedCategories,
                page
            }
        })

        if (res.success) {
            // Map category keys to full category objects
            const groupsWithCategories = res.data.groups.map(group => ({
                ...group,
                categories: group.categories.map(categoryKey =>
                    categories.find(cat => cat.key === categoryKey) || { key: categoryKey, name: categoryKey }
                )
            }))

            if (append) {
                setGroups(prev => [...prev, ...groupsWithCategories])
            } else {
                setGroups(groupsWithCategories)
            }

            // Update pagination state
            setCurrentPage(res.data.pager.page)
            setHasMore(res.data.pager.page < res.data.pager.totalPages)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        setCurrentPage(1)
        fetchGroups(1, false)
    }, [categories, selectedCategories])

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {
                    groups.map((group, index) => {
                        const isLastElement = index === groups.length - 1
                        return (
                            <div
                                ref={isLastElement ? lastGroupElementRef : null}
                                onClick={() => openGroupDetails(group.id)}
                                className="bg-primary p-2 rounded-lg border-4 border-primary cursor-pointer hover:border-primaryLight transition-colors"
                                key={index}
                            >
                                <div className="p-3 mb-2 border-b-2 border-primaryLight">
                                    <div className='flex items-center'>
                                        <div style={{ backgroundImage: `url(${getFilePath(group.thumbnailURI)})` }} className={`bg-${findFirstLetter(group.name)} min-w-[52px] min-h-[52px] rounded-full bg-cover bg-center`}></div>
                                        <div className="ms-3 w-[calc(100%-52px-10px)]">
                                            <div className="text-lg">{group.name}</div>
                                            <div className="text-special text-xs text-ellipsis truncate w-full">{group.members} {translations.group.membersIndicator}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-gray-200 text-sm px-2 line-clamp-2">
                                    {group.description}
                                </div>
                                <div className="flex max-w-full overflow-auto mt-2 hidden-scrollbar">
                                    {
                                        group.categories.map((category) => {
                                            const categoryFirstLetter = category.name[0].toUpperCase()
                                            return (
                                                <div className={`flex text-xs justify-center whitespace-nowrap bg-${categoryFirstLetter} cursor-pointer font-semibold py-2 px-3 rounded-lg me-2`} key={category.key}>
                                                    {category.name}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {isLoading && (
                <div className="flex justify-center mt-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
                </div>
            )}
        </>
    )
}
"use client"

import { useLanguage } from "@/app/provider/language-provider"
import Link from "next/link"
import { useState } from "react"

export default function GroupExplorer() {
    const categories = [
        {
            id: 1,
            name: "Study",
        },
        {
            id: 2,
            name: "Gaming"
        },
        {
            id: 3,
            name: "Music"
        },
        {
            id: 4,
            name: "Sports"
        },
        {
            id: 5,
            name: "Technology"
        },
        {
            id: 6,
            name: "Art"
        },
        {
            id: 7,
            name: "Language Learning"
        },
        {
            id: 8,
            name: "Cooking"
        },
        {
            id: 9,
            name: "Photography"
        },
        {
            id: 10,
            name: "Books"
        },
        {
            id: 11,
            name: "Movies"
        },
        {
            id: 12,
            name: "Fitness"
        },
        {
            id: 13,
            name: "Travel"
        },
        {
            id: 14,
            name: "Business"
        },
        {
            id: 15,
            name: "Science"
        },
        {
            id: 16,
            name: "Pets"
        },
        {
            id: 17,
            name: "Fashion"
        },
        {
            id: 18,
            name: "DIY"
        },
        {
            id: 19,
            name: "Nature"
        },
        {
            id: 20,
            name: "History"
        }
    ]

    const groups = [
        {
            id: 1,
            name: "Test",
            members: 125,
            description: "This groups is aimed to be a test, to see if the component is working as expected. Let's make it longer so we see if clamp works too.",
            categories: [{ id: 1, name: "Study" }, { id: 7, name: "Language Learning" }]
        }
        ,
        {
            id: 2,
            name: "Photography Club",
            members: 348,
            description: "Share your photography tips, showcase your work, and discuss different techniques and equipment.",
            categories: [{ id: 9, name: "Photography" }, { id: 19, name: "Nature" }]
        },
        {
            id: 3,
            name: "Gaming Squad",
            members: 892,
            description: "Connect with fellow gamers, organize gaming sessions, and discuss latest game releases and strategies.",
            categories: [{ id: 2, name: "Gaming" }, { id: 5, name: "Technology" }]
        },
        {
            id: 4,
            name: "Book Club",
            members: 256,
            description: "Monthly book discussions, reading recommendations, and literary analysis of classic and contemporary works.",
            categories: [{ id: 10, name: "Books" }, { id: 20, name: "History" }]
        },
        {
            id: 5,
            name: "Fitness Warriors",
            members: 567,
            description: "Share workout routines, nutrition tips, and motivate each other to reach fitness goals.",
            categories: [{ id: 12, name: "Fitness" }, { id: 13, name: "Travel" }]
        },
        {
            id: 6,
            name: "Tech Innovators",
            members: 445,
            description: "Discuss latest tech trends, share coding projects, and collaborate on innovative solutions.",
            categories: [{ id: 5, name: "Technology" }, { id: 14, name: "Business" }]
        },
        {
            id: 7,
            name: "Language Exchange",
            members: 678,
            description: "Practice different languages, cultural exchange, and improve your language skills with native speakers.",
            categories: [{ id: 7, name: "Language Learning" }, { id: 1, name: "Study" }, { id: 17, name: "Fashion" }, { id: 16, name: "Pets" }, { id: 18, name: "DIY" }]
        },
        {
            id: 8,
            name: "Art Studio",
            members: 234,
            description: "Share your artwork, get feedback, and discuss various art techniques and inspirations.",
            categories: [{ id: 6, name: "Art" }, { id: 18, name: "DIY" }]
        },
        {
            id: 9,
            name: "Movie Critics",
            members: 389,
            description: "Discuss and review latest movies, classic films, and everything cinema-related.",
            categories: [{ id: 11, name: "Movies" }, { id: 6, name: "Art" }]
        },
        {
            id: 10,
            name: "Science Hub",
            members: 298,
            description: "Explore scientific discoveries, share research, and discuss various scientific topics.",
            categories: [{ id: 15, name: "Science" }, { id: 1, name: "Study" }]
        }
    ]

    const [focusedGroup, setFocusedGroup] = useState(null)
    const [showGroupDeatils, setShowGroupDetils] = useState(false)

    const { translations } = useLanguage()

    const openGroupDetails = (groupId) => {
        setFocusedGroup(groups.find(g => g.id === groupId))
        setShowGroupDetils(true)
    }

    return (
        <div className="flex justify-center items-center h-full overflow-x-hidden">
            <div className="max-w-[1020px] w-full p-5 overflow-x-hidden">
                <div className="flex justify-center items-center">
                    <input className="appearance-none bg-primaryLight px-4 py-3 rounded-lg max-w-md w-full focus:outline-none text-fontLight" placeholder={translations.group.explorer.privateGroupCodeInputPlaceholder} />
                    <button className="disabled:text-primary underline rounded py-2 px-4 ms-2 bg-primaryDark" disabled>{translations.group.explorer.joinGroupButtonShort}</button>
                </div>
                <div className="mt-4 w-full max-w-[1020px] hidden-scrollbar !overflow-x-scroll bg-primary p-4 rounded-lg whitespace-nowrap">
                    {
                        categories.map((category) => {
                            return (
                                <div className="mx-2 min-w-[72px] w-fit-content inline-block relative" key={category.id}>
                                    <label htmlFor={`${category.id}`}>
                                        <input type="checkbox" className="peer w-0 h-0 absolute" id={`${category.id}`} name={`${category.id}`} tabIndex="-1" />
                                        <div className="flex justify-center whitespace-nowrap cursor-pointer bg-primaryLight font-semibold py-2 px-4 rounded-lg border-2 border-primaryLight peer-checked:bg-secondary peer-checked:text-primary peer-checked:border-secondary hover:border-secondary transition-colors">
                                            {category.name}
                                        </div>
                                    </label>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {
                        groups.map((group) => {
                            const groupNameFirstLetter = group.name[0].toUpperCase()
                            return (
                                <div onClick={() => openGroupDetails(group.id)} className="bg-primary p-2 rounded-lg border-4 border-primary cursor-pointer hover:border-primaryLight transition-colors" key={group.id}>
                                    <div className="p-3 mb-2 border-b-2 border-primaryLight">
                                        <div className='flex items-center'>
                                            <div className={`bg-${groupNameFirstLetter} min-w-[52px] min-h-[52px] rounded-full`}></div>
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
                                                    <div className={`flex text-xs justify-center whitespace-nowrap bg-${categoryFirstLetter} cursor-pointer font-semibold py-2 px-3 rounded-lg me-2`} key={category.id}>
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
            </div>
            <GroupDetails focusedGroup={focusedGroup} setShowGroupDetils={setShowGroupDetils} showGroupDetails={showGroupDeatils} />
        </div>
    )
}

function GroupDetails({ focusedGroup, showGroupDetails, setShowGroupDetils }) {
    const { directions, translations } = useLanguage()
    return (
        <>
            <div className={`bg-black bg-opacity-50 top-0 left-0 fixed w-full h-full ${!showGroupDetails ? 'hidden' : ''}`}></div>
            <div className={`fixed inset-0 flex justify-center z-50 transition ${!showGroupDetails ? '-translate-y-full' : 'translate-y-0'}`}>
                <div className="max-h-[calc(100%-100px)]">
                    <div className="bg-primary p-6 rounded-lg max-w-2xl w-full m-4 relative">
                        <button className={`text-fontLight hover:text-secondary absolute top-5 ${directions === 'ltr' ? 'right-5' : 'left-5'}`} onClick={() => setShowGroupDetils(false)}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        {
                            focusedGroup && (
                                <>
                                    <div className="flex justify-between items-center mb-4 border-b-2 border-b-primaryLight pb-4">
                                        <div className="flex items-center">
                                            <div className={`bg-${focusedGroup.name[0].toUpperCase()} min-w-[64px] min-h-[64px] rounded-full`}></div>
                                            <div className="ms-4">
                                                <h2 className="text-2xl font-bold">{focusedGroup.name}</h2>
                                                <p className="text-special">{focusedGroup.members} {translations.group.membersIndicator}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-gray-200 mb-4 whitespace-pre-line">
                                        {focusedGroup.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 border-b-2 border-b-primaryLight pb-4">
                                        {focusedGroup.categories.map((category) => (
                                            <span key={category.id} className={`bg-${category.name[0].toUpperCase()} px-3 py-2 rounded-lg text-sm font-semibold`}>
                                                {category.name}
                                            </span>
                                        ))}
                                    </div>
                                </>
                            )
                        }
                        {
                            focusedGroup && (
                                <div>
                                    <button className="bg-primaryLight hover:bg-primaryDark transition-colors text-fontLight py-2 px-4 rounded-lg w-full mt-4">
                                        <Link href={`/group/سل/${focusedGroup.id}`}>{translations.group.explorer.joinGroupButton}</Link>
                                    </button>
                                    <button className="border border-secondary text-secondary hover:bg-secondary hover:text-primary transition-colors text-fontLight py-2 px-4 rounded-lg w-full mt-2">
                                        {translations.group.explorer.seeGroupDetails}
                                    </button>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
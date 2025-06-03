import findFirstLetter from "@/app/helper/find-first-letter"
import getFilePath from "@/app/helper/get-file-path"
import { useLanguage } from "@/app/provider/language-provider"
import Link from "next/link"

export default function GroupExplorerGroupDetails({ focusedGroup, showGroupDetails, setShowGroupDetils }) {
    const { directions, translations } = useLanguage()

    return (
        <>
            <div className={`bg-black bg-opacity-50 top-0 left-0 fixed w-full h-full ${!showGroupDetails ? 'hidden' : ''}`}></div>
            <div className={`fixed inset-0 flex justify-center z-50 transition ${!showGroupDetails ? '-translate-y-full' : 'translate-y-0'}`}>
                <div className="max-h-[calc(100%-100px)] m-4 md:w-[500px] w-[calc(100%-2rem)]">
                    <div className="bg-primary p-6 rounded-lg max-w-2xl w-full relative">
                        <button className={`text-fontLight hover:text-secondary absolute top-5 ${directions === 'ltr' ? 'left-5' : 'right-5'}`} onClick={() => setShowGroupDetils(false)}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        {
                            focusedGroup && (
                                <>
                                    <div className="flex justify-between items-center mb-4 border-b-2 border-b-primaryLight pb-4">
                                        <div className="flex items-center">
                                            <div style={{ backgroundImage: `url(${getFilePath(focusedGroup.thumbnailURI)})` }} className={`bg-${findFirstLetter(focusedGroup.name)} min-w-[64px] min-h-[64px] rounded-full bg-cover bg-center`}></div>
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
                                            <span key={category.key} className={`bg-${category.name[0].toUpperCase()} px-3 py-2 rounded-lg text-sm font-semibold`}>
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
                                        <Link href={`/group/info/${focusedGroup.id}`}>{translations.group.explorer.seeGroupDetails}</Link>
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


import { useLanguage } from '@/app/provider/language-provider'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import InfoIcon from '@mui/icons-material/Info'
import Link from 'next/link'
import findFirstLetter from '@/app/helper/find-first-letter'
import getFilePath from '@/app/helper/get-file-path'

export default function ChatInfo({ sidebarOpen, setSidebarOpen, chat }) {
    const { translations } = useLanguage()

    return (
        <div className="absolute top-0 bg-primary z-10 w-full h-[4.5rem] flex items-center px-4 px-[18px]">
            <button className='me-4 lg:hidden' onClick={() => setSidebarOpen(!sidebarOpen)}>
                <MenuOpenIcon fontSize='large' />
            </button>
            <div className='flex items-center'>
                <div style={{ backgroundImage: `url(${getFilePath(chat.thumbnailURI)})` }} className={`bg-${findFirstLetter(chat.name)} w-[52px] h-[52px] rounded-full bg-cover bg-center`}></div>
                <div className="ms-3">
                    <div className="text-lg">{chat.name}</div>
                    <div className="text-special text-xs">{chat.numberOfMembers} {translations.chat.membersIndicator}</div>
                </div>
            </div>
            <Link href={`/group/info/${chat.id}`} className='ms-auto'>
                <InfoIcon sx={{ fontSize: '1.5rem' }} color='white' />
            </Link>
        </div>
    )
}
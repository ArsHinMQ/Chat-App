import { useLanguage } from '@/app/provider/language-provider'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'

export default function ChatInfo({ sidebarOpen, setSidebarOpen, chatName }) {
    let firstLetter = chatName.charAt(0).toUpperCase()

    const { translations } = useLanguage()

    return (
        <div className="absolute top-0 bg-primary z-10 w-full h-[4.5rem] flex items-center px-4 px-[18px]">
            <button className='me-4 lg:hidden' onClick={() => setSidebarOpen(!sidebarOpen)}>
                <MenuOpenIcon fontSize='large' />
            </button>
            <div className='flex items-center'>
                <div className={`bg-${firstLetter} w-[52px] h-[52px] rounded-full`}></div>
                <div className="ms-3">
                    <div className="text-lg">{chatName}</div>
                    <div className="text-special text-xs">12 {translations.chat.membersIndicator}</div>
                </div>
            </div>
        </div>
    )
}
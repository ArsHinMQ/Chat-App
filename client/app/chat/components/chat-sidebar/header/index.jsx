import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import SearchIcon from '@mui/icons-material/Search'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

export default function ChatSidebarHeader() {
    return (
        <div className='flex justify-between items-center mx-3 px-2 h-[5rem] border-b border-primary sticky top-0 z-10'>
            <a href='/user/me' className='hover:text-secondary transition-colors'>
                <SettingsOutlinedIcon style={{ fontSize: '3rem' }} />
            </a>
            <a href='/group/explorer' className='hover:text-secondary transition-colors'>
                <SearchIcon style={{ fontSize: '3rem' }} />
            </a>
            <a href='/group/actions/create' className='hover:text-secondary transition-colors'>
                <AddCircleOutlineIcon style={{ fontSize: '3rem' }} />
            </a>
        </div>
    )
}
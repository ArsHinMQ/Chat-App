import SendIcon from '@mui/icons-material/Send'

export default function ChatInputSendButton({ sendMessage }) {

    return (
        <button onClick={sendMessage} className="w-[1.75rem] h-[1.75rem] rounded-full flex items-center justify-center rtl:rotate-180">
            <SendIcon className='text-primary h-full w-full' />
        </button>
    )
}
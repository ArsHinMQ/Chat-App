import Picker from "@emoji-mart/react"
import data from "@emoji-mart/data"
import MoodIcon from '@mui/icons-material/Mood'
import { useRef } from "react"

export default function ChatInputEmojiPicker({ userInput, setUserInput, cursorPosition, setCursorPosition }) {
    const emojiPickerRef = useRef(null)

    const toggleEmojiSelector = () => {
        emojiPickerRef.current.classList.toggle('hidden')
    }

    const showEmojiSelector = () => {
        emojiPickerRef.current.classList.remove('hidden')
    }

    const hideEmojiSelector = () => {
        emojiPickerRef.current.classList.add('hidden')
    }

    const handleEmojiSelection = (emoji) => {
        const textBefore = userInput.substring(0, cursorPosition)
        const textAfter = userInput.substring(cursorPosition)
        const newText = textBefore + emoji.native + textAfter
        setUserInput(newText)
        setCursorPosition(cursorPosition + emoji.native.length)
    }

    return (
        <div className="relative" onMouseEnter={showEmojiSelector} onMouseLeave={hideEmojiSelector}>
            <button className="w-[2rem] h-[2rem] rounded-full flex items-center justify-center" onClick={toggleEmojiSelector}>
                <MoodIcon className="text-primary" />
            </button>
            <div ref={emojiPickerRef} className="hidden absolute bottom-[2rem]">
                <Picker data={data} className='w-full' theme='light' onEmojiSelect={handleEmojiSelection} />
            </div>
        </div>
    )
}
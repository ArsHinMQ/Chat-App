import getDirection from "@/app/helper/get-direction"
import { useRef, useEffect } from "react"

export default function ChatInputTextArea({ userInput, setUserInput, setCursorPosition, sendMessage }) {
    const maxRows = 5
    const textareaRef = useRef(null)

    const handleTextareaHeight = () => {
        const textarea = textareaRef.current
        textarea.style.height = "auto"
        const lineHeight = parseInt(getComputedStyle(textarea).lineHeight)

        const lines = textarea.value.split("\n").length

        if (lines <= maxRows) {
            textarea.style.height = `${textarea.scrollHeight}px` // Grow with content
            textarea.style.overflowY = "hidden" // Prevent scrolling
        } else {
            textarea.style.height = `${lineHeight * maxRows}px` // Limit max height
            textarea.style.overflowY = "scroll" // Enable scrolling
        }
    }

    const handleBlur = () => {
        if (textareaRef.current) {
            setCursorPosition(textareaRef.current.selectionStart);
        }
    }

    const onInputChange = (event) => {
        setUserInput(event.target.value)
    }

    const onInputKeyDown = (event) => {
        const isEnter = event.key === "Enter"
        const isCmd = event.metaKey
        const isWin = event.ctrlKey
        const isSudo = event.ctrlKey
        if (isEnter && (isCmd || isWin || isSudo)) {
            event.preventDefault()
            sendMessage()
        }
    }

    useEffect(() => {
        handleTextareaHeight()
    }, [userInput])

    return (
        <textarea style={{ direction: getDirection(userInput) }} ref={textareaRef} value={userInput} type='text' className="resize-none block w-full h-full focus:outline-none text-fontDark px-4" rows={1} onChange={onInputChange} onKeyDown={onInputKeyDown} onBlur={handleBlur}>
        </textarea>
    )
}
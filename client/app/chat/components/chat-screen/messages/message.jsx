import { useState } from "react"
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { useLanguage } from "@/app/provider/language-provider"
import getDirection from "@/app/helper/get-direction"

export default function ChatSingleMessage({ message, isLastFromThisSender, isFirstFromThisSender }) {
    const sentAt = new Date(message.sentAt)
    const [showTime, setShowTime] = useState(false)
    const { direction, translations } = useLanguage()

    let senderStyle = ''
    if (isLastFromThisSender) {
        if (message.fromMe) {
            senderStyle = direction === 'ltr' ? 'rounded-br-[0px]' : 'rounded-bl-[0px]'
        } else {
            senderStyle = direction === 'ltr' ? 'rounded-bl-[0px]' : 'rounded-br-[0px]'
        }
    }

    const toggleSentTime = () => {
        setShowTime(!showTime)
    }

    let firstLetter = message.user.username[0].toUpperCase()

    return (
        <div onClick={toggleSentTime} className={`max-w-[70%] relative sm:max-w-sm md:max-w-md lg:max-w-xl w-fit ${isLastFromThisSender ? 'mb-3' : 'mb-1'} ${message.fromMe ? 'justify-self-end me-2' : 'justify-self-start ms-2'} `}>
            {
                <div className={`w-[42px] h-[42px] absolute ${showTime ? 'bottom-[27px]' : 'bottom-0'} ${(isLastFromThisSender && !message.fromMe) && ('bg-' + firstLetter)} rounded-full`}></div>
            }
            <div className={`${!message.fromMe && 'ms-[48px]'} inline-block`}>

                {
                    (isFirstFromThisSender && !message.fromMe) &&
                    <div className={`text-${firstLetter} text-xs ms-1`}>{message.user.username}</div>
                }
                <div style={{direction: getDirection(message.text)}} className={`${message.fromMe ? 'bg-primaryLight' : `bg-primaryDark`} p-3 rounded-xl whitespace-pre-line ${senderStyle}`}>
                    {message.text}
                </div>
                <div className={`text-xs text-gray-400 justify-between  text-right mt-[2px] me-2 ${showTime ? 'flex' : 'hidden'}`}>
                    <span className="mx-2">
                        {translations.chat.messageStatus[message.status]}
                    </span>
                    <span>
                        {sentAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>
                {
                    message.status === 'sending' &&
                    <div className={`absolute left-[-2rem] me-2 mb-2 w-[1rem] h-[1rem] top-[50%] bottom-[50%] transform -translate-y-[50%]`}>
                        <AccessTimeIcon className="text-gray-400 w-full h-full" />
                    </div>
                }
            </div>
        </div>
    )
}
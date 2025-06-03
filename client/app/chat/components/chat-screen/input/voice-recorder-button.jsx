import { useVoiceRecorder } from '@/app/hook/use-voice-recorder'
import { useState, useRef } from 'react'
import MicIcon from '@mui/icons-material/Mic'
import CloseIcon from '@mui/icons-material/Close'
import UploadIcon from '@mui/icons-material/Upload'


export default function ChatInputVoiceRecorderButton({ onUploadRecording, userInput, setInRecordingMode }) {
    const [recording, setRecording] = useState(false)
    const cancelledRef = useRef(false)

    const { startRecording, stopRecording } = useVoiceRecorder(async (blob) => {
        if (cancelledRef.current || !blob) return

        const success = await onUploadRecording(blob)
        setInRecordingMode(false)
    })

    const handleStartRecording = () => {
        setRecording(true)
        cancelledRef.current = false
        startRecording()
    }

    const handleCancelRecording = () => {
        cancelledRef.current = true
        setRecording(false)
        stopRecording(false)
        setInRecordingMode(false)
    }

    const handleUploadRecording = () => {
        setRecording(false)
        cancelledRef.current = false
        stopRecording(true)
    }

    if (userInput.trim()) return null

    return (
        <div className='w-[4rem] rounded-full flex items-center justify-end rtl:rotate-180'>
            {
                !recording && (
                    <button
                        onClick={handleStartRecording}
                        className={`w-[2rem] h-[2rem] rounded-full flex items-center justify-center text-2xl transition-all border-none outline-none shadow-none text-primary shadow-md active:scale-95`}
                    >
                        <MicIcon className={`text-primary h-full w-[2rem]`} />
                    </button>
                )
            }
            {
                recording && (
                    <div className='flex items-center gap-1'>
                        <span className='text-sm me-2'>Recording...</span>
                        <button onClick={handleCancelRecording} className='w-[2rem] h-[2rem] rounded-full flex items-center justify-center transition-all border-none outline-none shadow-none bg-[#FF2C2C]'>
                            <CloseIcon className='w-[1.5rem] text-white' />
                        </button>
                        <button onClick={handleUploadRecording} className='w-[2rem] h-[2rem] rounded-full flex items-center justify-center transition-all border-none outline-none shadow-none bg-primary text-white'>
                            <UploadIcon className='w-[1.5rem]' />
                        </button>
                    </div>
                )
            }
        </div>
    )
}

import getFilePath from '@/app/helper/get-file-path'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useWavesurfer } from '@wavesurfer/react'
import PauseIcon from '@mui/icons-material/Pause'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

export default function ChatSingleMessageAttachmentVoicePlayer({ audioURI }) {
    const containerRef = useRef(null)
    const [isPlaying, setIsPlaying] = useState(false)

    const { wavesurfer } = useWavesurfer({
        container: containerRef,
        height: 32,
        barHeight: 2.5,
        barWidth: 2.5,
        barRadius: 2.5,
        barGap: 0,
        cursorWidth: 0,
        barAlign: 'center',
        waveColor: '#e2e8f0',
        progressColor: '#3b82f6',
        url: getFilePath(audioURI),
        normalize: true,
        responsive: true,
        splitChannels: false,
        interact: false,
        fillParent: true,
        autoScroll: false,
        progressHeight: 2.5,
    })

    useEffect(() => {
        if (!wavesurfer) return

        wavesurfer.on('finish', () => {
            setIsPlaying(false)
        })

        return () => {
            wavesurfer.destroy()
        }
    }, [wavesurfer])

    const onPlayPause = useCallback(() => {
        if (!wavesurfer) return
        wavesurfer.playPause()
        setIsPlaying(!isPlaying)
    }, [wavesurfer, isPlaying])

    return (
        <div className="message-attachment-voice-player flex items-center gap-2 w-[240px] h-[32px]">
            <button 
                onClick={onPlayPause}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-primary text-white"
            >
                {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </button>
            <div className='min-w-[200px] relative'>
            <div
                ref={containerRef}
                    className=''
                />
            </div>
        </div>
    )
}
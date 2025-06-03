// hooks/useVoiceRecorder.js
import { useRef } from 'react'

export function useVoiceRecorder(onStop) {
    const mediaRecorderRef = useRef(null)
    const streamRef = useRef(null)
    let chunks = []
  
    const startRecording = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      mediaRecorderRef.current = new MediaRecorder(stream)
      
      mediaRecorderRef.current.ondataavailable = (e) => chunks.push(e.data)
  
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' })
        onStop(blob)
        chunks = []
        
        // Stop all tracks in the stream
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop())
          streamRef.current = null
        }
      }
  
      mediaRecorderRef.current.start()
    }
  
    const stopRecording = () => {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop()
      }
    }
  
    return { startRecording, stopRecording }
}
  
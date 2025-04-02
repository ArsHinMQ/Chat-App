'use client'

import { useRef, useState } from "react"
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import findFirstLetter from '@/app/helper/find-first-letter'


export default function ThumbnailPicker({ itemName, setThumbnail, thumbnail, width, height }) {
    const fileInputRef = useRef(null)
    const [imageUrl, setImageUrl] = useState(thumbnail)

    const handleClick = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = (event) => {
        const file = event.target.files?.[0]
        if (file) {
            setThumbnail(file)
            setImageUrl(URL.createObjectURL(file))
        }
    }

    return (
        <div>
            <div style={{ backgroundImage: `url(${imageUrl})`, width: `${width}px`, height: `${height}px` }} onClick={handleClick} className={`bg-${findFirstLetter(itemName)} border-4 border-${findFirstLetter(itemName)} overflow-hidden transition duration-500 min-w-[82px] min-h-[82px] w-[82px] h-[82px] rounded-full relative cursor-pointer group bg-cover bg-center`}>
                <div className={`absolute bg-${findFirstLetter(itemName)} bg-opacity-50 flex justify-center items-center opacity-90 group-hover:opacity-100 w-[100%] h-[100%]`}>
                    <AddAPhotoIcon className='text-2xl group-hover:text-4xl' style={{ transition: 'font-size .25s' }} />
                </div>
            </div>
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
            />
        </div>
    )
}
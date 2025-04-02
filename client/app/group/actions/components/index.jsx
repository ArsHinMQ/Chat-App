'use client'
import findFirstLetter from '@/app/helper/find-first-letter'
import CheckIcon from '@mui/icons-material/Check'
import dynamic from 'next/dynamic'
import categories from '@/app/data/categories'
const AsyncSelect = dynamic(() => import('react-select/async'), { ssr: false });
import ThumbnailPicker from '@/app/components/thumbnail-picker'

const MAX_SELECTION = 3

const filterCategories = (inputValue) => {
    const categoriesOptions = []
    for (const cat of categories) {
        if (cat.name.toLowerCase().includes(inputValue.toLowerCase())) {
            categoriesOptions.push({
                label: cat.name,
                value: cat.id
            })
        }
    }
    return categoriesOptions
}

const promiseOptions = (inputValue) =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(filterCategories(inputValue))
        }, 1000)
    })

export default function GroupAction({ translations, groupName, setGroupName, selectedCategories, setSelectedCategories, thumbnail, setThumbnail, groupDescription, setGroupDescription }) {

    const onGroupNameChange = (event) => {
        const newGroupName = event.target.value
        setGroupName(newGroupName)
    }

    const onSelectedCategoriesChange = (selected) => {
        if (selected.length > MAX_SELECTION) {
            selected.shift()
        }
        setSelectedCategories(selected)

    }

    return (
        <div className="flex flex-nowrap flex-col w-full justify-center items-center">
            <div className="w-full mb-5 flex items-center justify-between bg-primary py-4 px-5">
                <div className="text-xl font-semibold text-fontLight">{translations.pageTitle}</div>
                <button className="px-4 py-2 text-white rounded-md hover:bg-primaryDark transition">
                    <CheckIcon />
                </button>
            </div>
            <div className="w-full max-w-[750px] bg-primaryLight p-3 rounded-xl flex">
                <ThumbnailPicker itemName={groupName} setThumbnail={setThumbnail} thumbnail={thumbnail} />
                <input className="appearance-none bg-primaryLight px-4 py-3 rounded-lg w-full focus:outline-none text-fontLight text-xl" placeholder={translations.groupNameInputPlaceholder} value={groupName} onChange={onGroupNameChange} />
            </div>

            <div className="mt-5 w-full max-w-[750px]">
                <div className='text-xl mb-2'>{translations.groupDescriptionTitle}</div>
                <textarea value={groupDescription} onChange={(event) => setGroupDescription(event.target.value)} className="resize-none appearance-none bg-primaryLight px-4 py-3 rounded-lg w-full focus:outline-none text-fontLight" rows={4} placeholder={translations.groupDescriptionInputPlaceholder}></textarea>
            </div>

            <div className="mt-5 w-full min-h-[300px] overflow-visible max-w-[750px]">
                <div className='text-xl mb-1'>{translations.selectCategoriesTitle}</div>
                <div className='mb-3 text-sm text-gray-400'>{translations.selectCategroiesNote} | <strong className={`${selectedCategories.length === 0 ? 'text-red-400' : 'text-special'}`}>{selectedCategories.length}/{MAX_SELECTION}</strong></div>
                <AsyncSelect
                    isMulti
                    classNames={{
                        control: () => "bg-primaryLight text-fontLight overflow-visible border border-blue-500 bg-gray-100 hover:border-blue-700 p-2 rounded-md",
                        multiValue: ({ data }) => `bg-${findFirstLetter(data.label)} text-fontLight px-2 py-1 rounded flex items-center`,
                        multiValueLabel: () => "text-white",
                        multiValueRemove: () => "text-white hover:bg-red-200 hover:text-red-500 px-1 ms-1",
                        menu: () => "bg-primaryLight rounded shadow-md",
                        option: ({ data, isFocused, isSelected }) => `bg-${findFirstLetter(data.label)} p-2 cursor-pointer ${isSelected ? "bg-special text-white" : isFocused ? "bg-primaryDark" : "bg-primaryLight"}`,
                        loadingIndicator: () => "text-fontLight",
                        placeholder: () => "text-gray-400",
                        clearIndicator: () => "text-fontLight hover:text-fontLight cursor-pointer",
                        dropdownIndicator: () => "text-fontLight hover:text-fontLight cursor-pointer",
                        input: () => "text-fontLight",
                    }}
                    minMenuHeight={200}
                    maxMenuHeight={300}
                    onChange={onSelectedCategoriesChange}
                    value={selectedCategories}
                    isClearable={true}
                    cacheOptions
                    defaultOptions
                    placeholder={translations.selectCategoriesInputPlaceholder}
                    loadOptions={promiseOptions} />
            </div>
        </div>
    )
}
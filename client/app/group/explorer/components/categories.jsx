export default function GroupExplorerCategories({ categories, selectedCategories, setSelectedCategories }) {

    const updateSelectedCategories = (checked, selectedCategory) => {
        if (checked) {
            setSelectedCategories([...selectedCategories, selectedCategory])
        } else {
            setSelectedCategories(selectedCategories.filter(c => c !== selectedCategory))
        }
    }

    return (
        <div className="mt-4 w-full max-w-[1020px] hidden-scrollbar !overflow-x-scroll bg-primary p-4 rounded-lg whitespace-nowrap">
            {
                categories.map((category, index) => {
                    return (
                        <div className="mx-2 min-w-[72px] w-fit-content inline-block relative" key={index}>
                            <label htmlFor={`${category.key}`}>
                                <input type="checkbox" className="peer w-0 h-0 absolute" id={`${category.key}`} name={`${category.key}`} tabIndex="-1" onChange={(e) => updateSelectedCategories(e.target.checked, category.key)} />
                                <div className="flex justify-center whitespace-nowrap cursor-pointer bg-primaryLight font-semibold py-2 px-4 rounded-lg border-2 border-primaryLight peer-checked:bg-secondary peer-checked:text-primary peer-checked:border-secondary hover:border-secondary transition-colors">
                                    {category.name}
                                </div>
                            </label>
                        </div>
                    )
                })
            }
        </div>
    )
}
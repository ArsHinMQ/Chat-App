import findFirstLetter from "@/app/helper/find-first-letter";

export default function GroupInfoGeneralCategories({ categories }) {
    return (
        <div className="p-4 rounded-xl bg-primaryLight h-full">
            <div className="mt-2 flex flex-wrap">
                {
                    categories.map((category) => (
                        <div key={category.key} className={`bg-${findFirstLetter(category.name)} rounded-lg p-2 text-sm text-fontLight me-2 mb-2`}>
                            {category.name}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
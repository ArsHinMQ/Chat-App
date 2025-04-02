import { useLanguage } from "@/app/provider/language-provider"

export default function GroupInfoGeneralDescription({ description }) {
    const { translations } = useLanguage()
    return (
        <div className="w-full flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{translations.group.info.groupDescriptionTitle}</h1>
            <div className="text-fontLight bg-primaryLight p-4 rounded-lg">{description}</div>
        </div>
    )
}
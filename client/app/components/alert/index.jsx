'use client'

const Alert = ({ message, type = "info", visible, setVisible }) => {
    if (!visible) return null

    const typeClasses = {
        success: "bg-green-100 border-green-500 text-green-700",
        error: "bg-red-100 border-red-500 text-red-700",
        warning: "bg-yellow-100 border-yellow-500 text-yellow-700",
        info: "bg-blue-100 border-blue-500 text-blue-700",
    }

    return (
        <div
            className={`flex items-center justify-between px-4 py-3 rounded border ${typeClasses[type]} fixed top-4 right-4 shadow-lg max-w-[500px] w-full z-50`}
        >
            <span className="text-sm">{message}</span>
            <button onClick={() => setVisible(false)} className="text-xl font-bold text-gray-700 hover:text-gray-900">
                ×
            </button>
        </div>
    )
}

export default Alert
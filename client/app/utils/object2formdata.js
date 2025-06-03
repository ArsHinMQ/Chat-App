export default function objectToFormData(obj, form = new FormData(), namespace = '') {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            const formKey = namespace ? `${namespace}[${key}]` : key
            const value = obj[key]

            if (value instanceof Date) {
                form.append(formKey, value.toISOString())
            } else if (typeof value === 'object' && !(value instanceof File)) {
                objectToFormData(value, form, formKey)
            } else if (value instanceof Blob) {
                form.append(formKey, value)
            } else {
                form.append(formKey, value)
            }
        }
    }
    return form
}

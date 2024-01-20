import {uploadImages} from "~/src/upload"
import {
    clearForm,
    clearImagesToUpload,
    clearLoading,
    clearUploadedImages,
    setImagesToUpload,
    setLoading,
    setUploadedImages,
} from "~/src/utils"

const handleChange = async (event: Event) => {
    const {files} = event.target as HTMLInputElement

    if (!files || files.length === 0) {
        clearImagesToUpload()
        return
    }

    setImagesToUpload(files)
    clearUploadedImages()
}

const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault()

    setLoading()
    const images = await uploadImages()
    clearLoading()

    setUploadedImages(images)

    clearForm()
    clearImagesToUpload()
}

export {handleChange, handleSubmit}

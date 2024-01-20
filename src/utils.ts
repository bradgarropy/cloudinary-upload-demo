const setImagesToUpload = (files: FileList) => {
    const imagesToUpload = document.getElementById(
        "imagesToUpload",
    ) as HTMLDivElement

    const imageList = document.createElement("ul")

    for (const file of files) {
        const selectedImage = document.createElement("li")
        selectedImage.innerHTML = file.name
        imageList.appendChild(selectedImage)
        imagesToUpload.innerHTML = imageList.outerHTML
    }
}

const clearUploadedImages = () => {
    const uploadedImages = document.getElementById(
        "uploadedImages",
    ) as HTMLDivElement

    uploadedImages.innerHTML = "No images uploaded yet."
}

const clearImagesToUpload = () => {
    const imagesToUpload = document.getElementById(
        "imagesToUpload",
    ) as HTMLDivElement

    imagesToUpload.innerHTML = "No images selected yet."
}

const setUploadedImages = (images: Array<{url: string}>) => {
    const uploadedImages = document.getElementById(
        "uploadedImages",
    ) as HTMLDivElement

    uploadedImages.innerHTML = ""

    images.forEach(image => {
        const uploadedImage = document.createElement("img")

        uploadedImage.src =
            image.url.split("/upload/")[0] +
            "/upload/f_auto,q_auto,w_225/" +
            image.url.split("/upload/")[1]

        uploadedImages.appendChild(uploadedImage)
    })
}

const setLoading = () => {
    const button = document.getElementById("submit") as HTMLButtonElement

    button.setAttribute("disabled", "true")
    button.innerText = "Uploading..."
}

const clearLoading = () => {
    const button = document.getElementById("submit") as HTMLButtonElement
    const input = document.getElementById("images") as HTMLInputElement

    button.removeAttribute("disabled")
    button.innerText = "Upload"
    input.removeAttribute("disabled")
}

const clearForm = () => {
    const form = document.getElementById("upload") as HTMLFormElement

    form.reset()
}

export {
    clearForm,
    clearImagesToUpload,
    clearLoading,
    clearUploadedImages,
    setImagesToUpload,
    setLoading,
    setUploadedImages,
}

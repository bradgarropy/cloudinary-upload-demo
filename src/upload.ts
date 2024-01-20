const setupInput = () => {
    const input = document.getElementById("images") as HTMLInputElement
    input.addEventListener("change", handleChange)
}

const setupForm = () => {
    const form = document.getElementById("upload") as HTMLFormElement
    form?.addEventListener("submit", handleSubmit)
}

const handleChange = async (event: Event) => {
    const {files} = event.target as HTMLInputElement

    if (!files || files.length === 0) {
        clearImagesToUpload()
        return
    }

    // set images to upload
    setImagesToUpload(files)

    // clear uploaded images
    clearUploadedImages()
}

const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault()

    // upload files
    const form = document.getElementById("upload") as HTMLFormElement
    const formData = new FormData(form)
    const images = formData.getAll("images")
    const promises = images.map(image => uploadFile(image as File))

    // set loading state
    setLoading()

    // wait for uploads
    const newImages = await Promise.all(promises)
    console.log(newImages)

    // show uploaded images
    setUploadedImages(newImages)

    // clear loading state
    clearLoading()

    // reset form
    form.reset()
    clearImagesToUpload()
}

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
    const input = document.getElementById("images") as HTMLInputElement

    button.setAttribute("disabled", "true")
    button.innerText = "Uploading..."
    input.setAttribute("disabled", "true")
}

const clearLoading = () => {
    const button = document.getElementById("submit") as HTMLButtonElement
    const input = document.getElementById("images") as HTMLInputElement

    button.removeAttribute("disabled")
    button.innerText = "Upload"
    input.removeAttribute("disabled")
}

const uploadFile = async (file: File) => {
    console.log(`Uploading ${file.name}...`)

    const formData = new FormData()

    formData.append("file", file)
    formData.append("upload_preset", "unsignedDemo")
    // formData.append("upload_preset", "signedDemo")

    const response = await fetch(
        "https://api.cloudinary.com/v1_1/bradgarropy/upload",
        {
            method: "post",
            body: formData,
        },
    )

    const image = await response.json()
    console.log(image.url)
    return image
}

export {setupForm, setupInput}

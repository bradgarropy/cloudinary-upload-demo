const setupInput = () => {
    const input = document.getElementById("images") as HTMLInputElement
    input.addEventListener("change", handleChange)
}

const setupForm = () => {
    const form = document.getElementById("upload") as HTMLFormElement
    form?.addEventListener("submit", handleSubmit)
}

const handleChange = async (event: Event) => {
    const imagesToUpload = document.getElementById(
        "imagesToUpload",
    ) as HTMLDivElement
    const uploadedImages = document.getElementById(
        "uploadedImages",
    ) as HTMLDivElement

    const {files} = event.target as HTMLInputElement

    if (!files || files.length === 0) {
        imagesToUpload.innerHTML = "No images selected yet."
        return
    }

    const imageList = document.createElement("ul")

    for (const file of files) {
        const selectedImage = document.createElement("li")
        selectedImage.innerHTML = file.name
        imageList.appendChild(selectedImage)
        imagesToUpload.innerHTML = imageList.outerHTML
    }

    uploadedImages.innerHTML = "No images uploaded yet."
}

const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault()

    // gather elements
    const form = event.target as HTMLFormElement
    const button = form.querySelector("#submit") as HTMLButtonElement
    const input = form.querySelector("#images") as HTMLInputElement
    const imagesToUpload = document.getElementById(
        "imagesToUpload",
    ) as HTMLDivElement
    const uploadedImages = document.getElementById(
        "uploadedImages",
    ) as HTMLDivElement

    const formData = new FormData(form)
    const images = formData.getAll("images")

    const promises = images.map(image => uploadFile(image as File))

    // set loading state
    button.setAttribute("disabled", "true")
    button.innerText = "Uploading..."
    input.setAttribute("disabled", "true")

    // wait for uploads
    const newImages = await Promise.all(promises)
    console.log(newImages)

    // show uploaded images
    uploadedImages.innerHTML = ""

    newImages.forEach(image => {
        const uploadedImage = document.createElement("img")

        uploadedImage.src =
            image.url.split("/upload/")[0] +
            "/upload/f_auto,q_auto,w_225/" +
            image.url.split("/upload/")[1]

        uploadedImages.appendChild(uploadedImage)
    })

    // clear loading state
    button.removeAttribute("disabled")
    button.innerText = "Upload"
    input.removeAttribute("disabled")

    // reset form
    form.reset()
    imagesToUpload.innerHTML = "No images selected yet."
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

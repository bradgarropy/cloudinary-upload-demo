const setupInput = () => {
    const input = document.querySelector<HTMLInputElement>("#images")

    if (!input) {
        return
    }

    input.addEventListener("change", handleChange)
}

const handleChange = async (event: Event) => {
    if (!event.target) {
        return
    }

    const target = event.target as HTMLInputElement
    const files = target.files

    if (!files) {
        return
    }

    for (const file of files) {
        uploadFile(file)
    }
}

const uploadFile = async (file: File) => {
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
}

export {setupInput}

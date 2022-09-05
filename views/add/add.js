var image = document.querySelector("#image");

image.onchange = (evt) => {
    const [file] = image.files;
    if (file) {
        blah.src = URL.createObjectURL(file);
    }
};
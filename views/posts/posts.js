var myImg = document.querySelectorAll("img");

myImg.forEach((img) => {
    var realWidth = img.naturalWidth;
    var realHeight = img.naturalHeight;

    if (realWidth / realHeight >= 1.5) {
        console.log(
            "Original width=" +
            realWidth +
            ", " +
            "Original height=" +
            realHeight +
            "aspect ratio" +
            realWidth / realHeight +
            "you're a wide boi"
        );
        img.parentElement.classList.add("image-wide");
    } else if (realWidth / realHeight <= 0.5) {
        console.log(
            "Original width=" +
            realWidth +
            ", " +
            "Original height=" +
            realHeight +
            "aspect ratio" +
            realWidth / realHeight +
            "you're a tall boi"
        );
        img.parentElement.classList.add("image-tall");
    } else {
        console.log(
            "Original width=" +
            realWidth +
            ", " +
            "Original height=" +
            realHeight +
            "aspect ratio" +
            realWidth / realHeight +
            "you're an even boi"
        );
    }
});
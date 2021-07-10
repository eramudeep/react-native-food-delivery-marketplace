export default function getIcon(type) {
    switch (type) {
        case "img1":
            return require("../assets/Images/img1.jpg")
        case "img2":
            return require("../assets/Images/img2.jpg")
        case "img4":
            return require("../assets/Images/img4.jpg")
        case "img5":
            return require("../assets/Images/img5.jpg")
        case "img3":
            return require("../assets/Images/img3.jpg")
        case "img6":
            return require("../assets/Images/img6.png")
        case "img7":
            return require("../assets/Images/img7.png")
        case "img8":
            return require("../assets/Images/img8.png")
        case "img9":
            return require("../assets/Images/img9.png")
        case "img10":
            return require("../assets/Images/img10.png")
        case "img11":
            return require("../assets/Images/img11.png")
        case "img12":
            return require("../assets/Images/img12.png")
        case "img13":
            return require("../assets/Images/img13.jpg")
        case "img14":
            return require("../assets/Images/img14.jpg")
        case "img15":
            return require("../assets/Images/img15.jpg")
        case "img16":
            return require("../assets/Images/img16.jpg")
        case "img17":
            return require("../assets/Images/img17.jpg")
        case "img18":
            return require("../assets/Images/img18.jpg")
        case "img19":
            return require("../assets/Images/img19.jpg")
        case "img20":
            return require("../assets/Images/img20.jpg")
        case "splash":
            return require("../assets/Images/splash.png")
        case "logo":
            return require("../assets/Images/logo.png")
        case "stars":
            return require("../assets/Images/Stars.png")
        case "store":
            return require("../assets/Images/shops.png")
        default:
            return require("../assets/Images/logo.png")
    }
}
let img = document.getElementById("img");
let file = document.getElementById("file");
let image = document.querySelector(".image");

let filters = document.querySelectorAll("ul li input")
let sturate = document.getElementById("sturate")
let contrast = document.getElementById("contrast")
let Brightness = document.getElementById("Brightness")
let sepia = document.getElementById("sepia")
let grayscale = document.getElementById("grayscale")
let blur = document.getElementById("blur")
let hueRotate = document.getElementById("hueRotate")

let download = document.getElementById("download")
let reset = document.getElementById("reset")

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

function resetValue () {
  ctx.filter = 'none'
  
  sturate.value = "100"
  contrast.value = "100"
  Brightness.value = "100"
  sepia.value = "0"
  grayscale.value = "0"
  blur.value = "0"
  hueRotate.value = "0"
  ctx.drawImage(img,0,0,canvas.height,canvas.width)
}
window.onload = function () {
  download.style.display = "none"
  reset.style.display = "none"
  img.style.display = "none"
}

file.onchange = function () {
  resetValue ()
  download.style.display = "block"
  reset.style.display = "block"
  img.style.display = "block"
  let fileUpload = new FileReader()
  fileUpload.readAsDataURL(file.files[0])
  fileUpload.onload = () => {
    img.src = fileUpload.result
  }
  img.onload = function () {
    canvas.width = img.width
    canvas.height = img.height
    ctx.drawImage(img,0,0,canvas.height,canvas.width)
    img.style.display = "none"
  }
}

filters.forEach(filter => {
  filter.addEventListener ("input", function (){
    ctx.filter = `
    saturate(${sturate.value}%)
    contrast(${contrast.value}%)
    Brightness(${Brightness.value}%)
    sepia(${sepia.value}%)
    grayscale(${grayscale.value})
    blur(${blur.value}px)
    hue-rotate(${hueRotate.value}deg)
    `
    ctx.drawImage(img,0,0,canvas.height,canvas.width)
  }) 
})

download.onclick = function () {
  download.href = canvas.toDataURL("jpeg")
}

const appGalleryImage = document.querySelectorAll('.showcase__app img')

function lazyLoadingInImageGallery() {
  for (let i = 0; i < appGalleryImage.length; i++) {
    new Waypoint.Inview({
      element: appGalleryImage[i],
      entered: function () {
        const fullImageLoaded = this.element.getAttribute('data-src')
        this.element.setAttribute('src', fullImageLoaded)
      }
    })
  }
}

lazyLoadingInImageGallery()

// App Preview Modal
const appImagePreviewOverlay = document.querySelectorAll(".showcase__app")
const appModal = document.querySelector('.app-modal')
const imageInsideFrame = document.querySelector(".modal__smartphone-frame img")
const appModalBackgroundOverlay = document.querySelector(".app-modal--overlay")
const manageItPageHeader = document.getElementById("header--manageit")

function showAppModal() {
  if (!headerNavigation.classList.contains("show")) {
    manageItPageHeader.classList.add("background-overlay")
    appModal.classList.add("active")
    appModalBackgroundOverlay.classList.add("active")
    contactButton.classList.add("background-overlay")

    for (section of document.querySelectorAll("section")) {
      section.style.filter = "blur(20px)"
    }
  }
}

function imageCounterFormatter(number) {
  if (number < 10) {
    return `0${number}`
  } else {
    return number
  }
}

const currentImageCounterNumber = document.querySelector(".app-modal .next-prev__current-slider")
const totalNumberOfImages = document.querySelector(".app-modal .next-prev__total-slider")
totalNumberOfImages.innerHTML = appGalleryImage.length
const skeletonLoading = document.querySelector(".modal__skeleton-loading")

function showAndHideSkeletonLoading(imageSrc) {
  const loadImage = new Image()
  loadImage.src = imageSrc
  loadImage.addEventListener("load", () => {
    skeletonLoading.classList.add("fade-out")
    setTimeout(() => {
      skeletonLoading.style.display = "none"
    }, 2000)
  })
}

function setImageInsideFrame(i) {
  const dataSrc = appGalleryImage[i].getAttribute("data-src")
  const currentNumberOfImage = appGalleryImage[i].getAttribute("data-item")

  skeletonLoading.style.display = "flex"

  imageInsideFrame.setAttribute("src", dataSrc)
  imageInsideFrame.setAttribute("data-index", currentNumberOfImage)

  currentImageCounterNumber.innerHTML = imageCounterFormatter(currentNumberOfImage)

  showAndHideSkeletonLoading(dataSrc)

  return imageInsideFrame
}

function whenClickInImagesOfGallery() {
  for (let i = 0; i < appImagePreviewOverlay.length; i++) {
    appImagePreviewOverlay[i].addEventListener("click", () => {
      showAppModal()
      setImageInsideFrame(i)
    })
  }
}

whenClickInImagesOfGallery()

appModalBackgroundOverlay.addEventListener("click", removeAppModal)

function removeAppModal() {
  manageItPageHeader.classList.remove("background-overlay")
  appModal.classList.remove("active")
  appModalBackgroundOverlay.classList.remove("active")
  contactButton.classList.remove("background-overlay")

  for (section of allSections) {
    section.removeAttribute("style")
  }
}

const nextIcon = document.querySelector(".app-modal .next-icon")
const prevIcon = document.querySelector(".app-modal .prev-icon")

function goToNextImage() {
  const getCurrentNumberOfImage = imageInsideFrame.getAttribute("data-index")
  let nextItemNumber = parseInt(getCurrentNumberOfImage) + 1

  for (let i = 0; i < appGalleryImage.length; i++) {
    const galleryImageNumber = parseInt(appGalleryImage[i].getAttribute("data-item"))

    if (galleryImageNumber == nextItemNumber) {
      const nextImageSrc = appGalleryImage[i].getAttribute("data-src")
      const currentDataIndex = appGalleryImage[i].getAttribute("data-item")

      skeletonLoading.style.display = "flex"

      imageInsideFrame.setAttribute("src", nextImageSrc)
      imageInsideFrame.setAttribute("data-index", currentDataIndex)

      currentImageCounterNumber.innerHTML = imageCounterFormatter(currentDataIndex)

      showAndHideSkeletonLoading(nextImageSrc)
    }
  }
}

function goToPrevImage() {
  const getCurrentNumberOfImage = imageInsideFrame.getAttribute("data-index")
  let prevItemNumber = parseInt(getCurrentNumberOfImage) - 1

  for (let i = 0; i < appGalleryImage.length; i++) {
    const galleryImageNumber = parseInt(appGalleryImage[i].getAttribute("data-item"))

    if (galleryImageNumber == prevItemNumber) {
      const prevImageSrc = appGalleryImage[i].getAttribute("data-src")
      const currentDataIndex = appGalleryImage[i].getAttribute("data-item")

      skeletonLoading.style.display = "flex"

      imageInsideFrame.setAttribute("src", prevImageSrc)
      imageInsideFrame.setAttribute("data-index", currentDataIndex)

      currentImageCounterNumber.innerHTML = imageCounterFormatter(currentDataIndex)

      showAndHideSkeletonLoading(prevImageSrc)
    }
  }
}

nextIcon.addEventListener("click", () => {
  goToNextImage()
})

prevIcon.addEventListener("click", () => {
  goToPrevImage()
})






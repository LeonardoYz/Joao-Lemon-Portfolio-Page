const sliderContainer = document.querySelector(".container--slider")
const sliderList = document.querySelector(".container--slider .projects__list")
const sliderItem = document.querySelectorAll(".container--slider .projects__item")
const containerWidth = sliderContainer.offsetWidth
let sliderListWidth = null

// Set Slider Width From Container Size
function calculateAndAddWidthToSlider() {
  for (const li of sliderItem) {
    li.style.width = `${containerWidth}px`
    let sliderItemWidth = li.offsetWidth

    sliderListWidth += sliderItemWidth
  }

  sliderList.style.width = `${sliderListWidth}px`
}

calculateAndAddWidthToSlider()

// Go To Next/Previous Slider
const prevItem = document.querySelector("#projects-preview .prev-icon")
const nextItem = document.querySelector("#projects-preview .next-icon")
let sliderPosition = 0

function slideNextItem() {
  let lastSliderItem = sliderListWidth - containerWidth

  if ((-1 * (sliderPosition) == lastSliderItem)) {
    return;
  }

  sliderPosition -= containerWidth

  addAnimationToSliders()
}

function slidePrevItem() {
  if (sliderPosition == 0) {
    return;
  }

  sliderPosition += containerWidth

  addAnimationToSliders()
}

function addAnimationToSliders() {
  for (const li of sliderItem) {
    let sliderListPosition = parseInt(li.getAttribute("data-slide"))

    if (sliderListPosition == currentCounterNumber) {
      anime({
        targets: sliderList,
        translateX: sliderPosition,
        easing: 'easeOutCubic'
      });

      anime({
        targets: '#projects-preview .preview__background',
        keyframes: [
          { opacity: 0 },
          { scaleX: 0 },
          { opacity: 1 },
          { scaleX: 1 }
        ],
        duration: 850,
        easing: 'linear'
      });

      anime({
        targets: '.container--slider .projects__text',
        keyframes: [
          { opacity: 0 },
          { scaleX: 0 },
          { opacity: 1 },
          { scaleX: 1 }
        ],
        duration: 1150,
        easing: 'easeOutSine'
      });

      anime({
        targets: '.container--slider .projects__image',
        keyframes: [
          { opacity: 0 },
          { scale: 0 },
          { opacity: 1 },
          { scale: 1 }
        ],
        duration: 1250,
        easing: 'easeOutQuad'
      });
    }
  }
}

// Slider Counter
const currentSliderNumber = document.querySelector("#projects-preview .next-prev__current-slider")
const totalSliderNumber = document.querySelector("#projects-preview .next-prev__total-slider")
const sliderTotalItems = sliderItem.length
let currentCounterNumber = 1
const sliderPreviewNumber = document.querySelector(".preview__number")

function counterFormatter(number) {
  if (number < 10) {
    return `0${number}`
  } else {
    return number
  }
}

function counterAdd() {
  if (currentCounterNumber >= 0 && currentCounterNumber < sliderTotalItems) {
    currentCounterNumber++
    currentSliderNumber.innerHTML = counterFormatter(currentCounterNumber)
    sliderPreviewNumber.innerHTML = counterFormatter(currentCounterNumber)
  }
}

function counterRemove() {
  if (currentCounterNumber > 1) {
    currentCounterNumber--
    currentSliderNumber.innerHTML = counterFormatter(currentCounterNumber)
    sliderPreviewNumber.innerHTML = counterFormatter(currentCounterNumber)
  }
}

totalSliderNumber.innerHTML = counterFormatter(sliderTotalItems)

const sliderPreviewMarker = document.querySelectorAll(".preview__marker")

function checkActiveSliderNav() {
  for (const link of sliderPreviewMarker) {
    let dataNavSliderPosition = parseInt(link.getAttribute("data-nav"))

    if (dataNavSliderPosition == currentCounterNumber) {
      link.classList.add("active")
    }
  }
}

function changeActiveSliderNav() {
  for (const link of sliderPreviewMarker) {
    link.classList.remove("active")
  }

  checkActiveSliderNav()
}

// When Click In Arrows Of Slider
nextItem.addEventListener("click", () => {
  slideNextItem()
  counterAdd()
  changeActiveSliderNav()
})

prevItem.addEventListener("click", () => {
  slidePrevItem()
  counterRemove()
  changeActiveSliderNav()
})
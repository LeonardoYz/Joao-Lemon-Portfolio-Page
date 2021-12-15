const preLoadingScreen = document.querySelector(".preloading")

window.addEventListener('load', () => {
  preLoadingScreen.classList.add("fade-out")
  setTimeout(() => {
    preLoadingScreen.style.visibility = "hidden"
  }, 1000)
})

const header = document.querySelector("header")
const headerOffSetHeight = header.offsetHeight

// Add Shadow To Header When Scroll
window.addEventListener("scroll", () => {
  if (window.scrollY >= headerOffSetHeight) {
    header.classList.add("scroll")
  } else {
    header.classList.remove("scroll")
  }
})

const allSections = document.querySelectorAll("section")
const headerNavigation = document.querySelector(".header__navigation")
const mobileMenu = document.querySelector(".header__menu--mobile")

mobileMenu.addEventListener("click", () => {
  headerNavigation.classList.toggle("show")
  contactButton.classList.toggle("background-overlay")

  for (const section of allSections) {
    section.classList.toggle("background-overlay")
  }
})

// Make Animation When Scroll On Homepage
const homeScrollDown = document.querySelector('.home__scroll-down')
const currentSection = document.querySelector("section")

if (currentSection.contains(homeScrollDown)) {
  window.addEventListener('scroll', () => {
    if (window.scrollY >= 70) {
      homeScrollDown.classList.add('fade-out')
    } else {
      homeScrollDown.classList.remove('fade-out')
    }
  })
}

// Add Background Blur And Show/Hide Budget Modal
const budgetForm = document.querySelector(".form")

function showAndRemoveModalBudget() {
  budgetForm.classList.toggle("show")
  header.classList.toggle("background-overlay")
  contactButton.classList.toggle("background-overlay")

  for (const section of allSections) {
    section.classList.toggle("background-overlay")
  }
}

// Show And Hide Contact Button
const contactInfo = document.querySelector(".contact-info")
const contactButton = document.querySelector(".contact-button")

contactButton.addEventListener("click", () => {
  contactInfo.classList.toggle("active")
  contactButton.classList.toggle('active')
})








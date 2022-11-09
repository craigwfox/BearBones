// ---------------------------------------------
// ======---------------------------------======
// App.js
// ======---------------------------------======
// ---------------------------------------------

// ====---------------====
// Globals vars
// ====---------------====
const body = document.querySelector("body")
const windowWidth = window.innerWidth

// ====---------------====
// Global functions
// ====---------------====

// ===------ Convert rems to px ------===
function remToPx(rem) {
  const remSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize
  )
  const remClean = parseInt(rem.replace("rem", ""))

  return remClean * remSize
}

// ===------ Get computed prop value ------===
function getCompProp(compProp) {
  return getComputedStyle(body).getPropertyValue(compProp)
}

// ====---------------====
// Set header height
// ====---------------====
const headerHeight = document.querySelector("#page-header").offsetHeight
if (headerHeight && body) {
  body.style.setProperty("--header-height", `${headerHeight}px`)
}

// ====---------------====
// Burger menu
// ====---------------====
const burgerWrapper = document.querySelector(".burger-wrapper")
if (burgerWrapper) {
  const burgerList = burgerWrapper.querySelector(".burger-menu")
  const burgerToggle = burgerWrapper.querySelector(".burger-btn")

  // ====---------------====
  // Mobile burger toggle
  // ====---------------====
  burgerToggle.addEventListener("click", () => {
    if (windowWidth <= remToPx(getCompProp("--tablet-min"))) {
      const navState = burgerWrapper.getAttribute("data-menu-status")

      if (navState === "closed") {
        burgerWrapper.setAttribute("data-menu-status", "open")
        burgerToggle.setAttribute("aria-expanded", "true")
      } else {
        burgerWrapper.setAttribute("data-menu-status", "closed")
        burgerToggle.setAttribute("aria-expanded", "false")
      }
    }
  })

  // ====---------------====
  // Tablet+ burger controls
  // ====---------------====
  const burgerControls = burgerList.querySelectorAll('[data-toggle="nav"]')

  // open burger menu functions
  function openBurgerSubmenu(link) {
    // make sure the function doesn't run unless on tablet or larger
    if (windowWidth > remToPx(getCompProp("--tablet-min"))) {
      // set a tag to expanded
      link.setAttribute("aria-expanded", "true")
    }
  }

  // close burger menu functions
  function closeBurgerSubmenu(link) {
    // make sure the function doesn't run unless on tablet or larger
    if (windowWidth > remToPx(getCompProp("--tablet-min"))) {
      // set a tag to not expanded
      link.setAttribute("aria-expanded", "false")
    }
  }

  // close all burger submenus
  function closeAllBurgerSubmenus() {
    burgerControls.forEach(control => {
      const controlLink = control.querySelector(":scope > a")
      closeBurgerSubmenu(controlLink)
    })
  }

  burgerControls.forEach(control => {
    const controlLink = control.querySelector(":scope > a")

    // ===------ Mouse enter ------===
    controlLink.addEventListener("mouseenter", () => {
      openBurgerSubmenu(controlLink)
    })

    // ===------ Mouse leave ------===
    controlLink.addEventListener("mouseleave", () => {
      closeBurgerSubmenu(controlLink)
    })

    // ===------ Focus in ------===
    controlLink.addEventListener("focusin", () => {
      closeAllBurgerSubmenus()

      // open the current burger submenu
      openBurgerSubmenu(controlLink)
    })

    // ===------ Focus out of control link backwards ------===
    controlLink.addEventListener("focusout", () => {
      // close menus if focus is not on a child of the control
      setTimeout(() => {
        if (!control.contains(document.activeElement)) {
          closeBurgerSubmenu(controlLink)
        }
      }, 1)
    })

    // ===------ Watch for focus leaving last child in a dropdown or mega menu ------===
    const controlChildren = control.querySelectorAll(":scope a")
    const lastChild = controlChildren[controlChildren.length - 1]
    lastChild.addEventListener("focusout", () => {
      setTimeout(() => {
        if (!control.contains(document.activeElement)) {
          closeBurgerSubmenu(controlLink)
        }
      }, 1)
    })
  })

  // ===------ Escape to close burger submenus ------===
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      closeAllBurgerSubmenus()
    }
  })
}

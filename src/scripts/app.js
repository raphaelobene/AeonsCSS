const storageKey = 'theme-preference'

const onClick = () => {
  // flip current value
  theme.value = theme.value === 'light'
    ? 'dark'
    : 'light'

  setPreference()
}

const getColorPreference = () => {
  if (localStorage.getItem(storageKey))
    return localStorage.getItem(storageKey)
  else
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
}

const setPreference = () => {
  localStorage.setItem(storageKey, theme.value)
  reflectPreference()
}

const reflectPreference = () => {
  document.firstElementChild
    .setAttribute('class', theme.value)

  document
    .querySelector('#theme-toggle')
    ?.setAttribute('aria-label', theme.value)
}

const theme = {
  value: getColorPreference(),
}

// set early so no page flashes / CSS is made aware
reflectPreference()

window.onload = () => {
  "use strict"
  const SELECTORS = {
    body: document.querySelector("body"),
    menuBtn: document.querySelector("#menu"),
    closeMenuBtn: document.querySelector("#menu-close"),
    burgerBtn: document.querySelector("#burger"),
    themeBtn: document.querySelector('#theme-toggle'),
    dialogOverlay: document.querySelector('#dialog-overlay'),
    dialogNav: document.querySelector('#nav'),
    dialog: document.querySelector('nav>ul')
  }

  // set on load so screen readers can see latest value on the button
  reflectPreference()

  SELECTORS.menuBtn.addEventListener("click", () => {
    SELECTORS.dialogOverlay.classList.toggle("block");
    ["left-[max(0px,calc(50%-45rem))]", "max-w-100-3", "pt-8", "-ml-8", "top-18", "flex", "is-modal"].map(cls => SELECTORS.dialogNav.classList.toggle(cls));
  });

  SELECTORS.closeMenuBtn.addEventListener("click", () => {
    SELECTORS.dialogOverlay.classList.remove("block");
    SELECTORS.dialogOverlay.classList.add("hidden");
    ["left-[max(0px,calc(50%-45rem))]", "max-w-100-3", "pt-8", "-ml-8", "top-18", "flex", "is-modal"].map(cls => SELECTORS.dialogNav.classList.toggle(cls));
  });

  SELECTORS.burgerBtn.addEventListener("click", () => {
    (SELECTORS.burgerBtn.classList.contains("is-active") === true) ? SELECTORS.burgerBtn.classList.remove("is-active") : SELECTORS.burgerBtn.classList.add("is-active");
    SELECTORS.dialogOverlay.classList.toggle("block");
    ["is-modal"].map(cls => SELECTORS.body.classList.toggle(cls));
  });

  const media = window.matchMedia(`(max-width: 767px)`)
  media.addEventListener('change', (e) => {
    if (!e.matches) SELECTORS.body.classList.remove("is-modal");
  })
  // if (media.matches) {}

  // now this script can find and listen for clicks on the control
  SELECTORS.themeBtn.addEventListener('click', onClick)
}

// sync with system changes
window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', ({ matches: isDark }) => {
    theme.value = isDark ? 'dark' : 'light'
    setPreference()
  })


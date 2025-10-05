// tailwind.config.js
const {heroui} = require("@heroui/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/@heroui/theme/dist/components/(alert|avatar|badge|breadcrumbs|button|card|checkbox|chip|code|date-input|date-picker|dropdown|image|input|input-otp|kbd|link|listbox|modal|navbar|pagination|progress|radio|scroll-shadow|select|slider|snippet|toggle|table|tabs|toast|popover|user|ripple|spinner|form|calendar|menu|divider|spacer).js",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui()],
};
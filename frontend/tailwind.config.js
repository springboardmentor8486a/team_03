/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "text-purple-500", "bg-purple-100",
    "text-green-500", "bg-green-100",
    "text-orange-500", "bg-orange-100",
    "text-pink-500", "bg-pink-100",
    "text-blue-500", "bg-blue-100",
    "text-indigo-500", "bg-indigo-100"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

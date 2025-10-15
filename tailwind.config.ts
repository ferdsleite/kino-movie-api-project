import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    'text-center',
    'text-right',
    'text-left',
    {pattern: /grid-cols-/},
    {pattern: /grid-rows-/},
  ],
  theme: {
    extend: {
      animation: {
        timer: 'wiggle 1s ease-in-out'
      },
      keyframes: {
        timer: {
          '0%': {width: '0'},
          '100%': {width: '100%'}
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        gray: colors.gray,
        slate: colors.slate,
        stone: colors.stone,
        sky: colors.sky,
        neutral: colors.neutral,
        red: {
          ...colors.red,
          kino:"#e50914"
        }
      },
    },
  },
  plugins: [],
};
export default config;

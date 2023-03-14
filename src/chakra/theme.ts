import "@fontsource/open-sans/300.css"
import "@fontsource/open-sans/400.css"
import "@fontsource/open-sans/700.css"

// 1. Import `extendTheme`
import { extendTheme, type ThemeConfig } from "@chakra-ui/react"
import {Button} from './button'
// 2. Call `extendTheme` and pass your custom values

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

export const theme = extendTheme({
  colors: {
    brand: {
      100: "#FF3c00",
    },
  },
  fonts: {
    body: "Open Sans, sans-serif"
  },
  // styles: {
  //   global: () =>({
  //       body: {
  //           bg: "gray.200",
  //       },

  //   }),
  // },
  components: {
    Button,
  },
  config
})



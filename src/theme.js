// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react"
// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  colors: {
    idm: {
      50: '#f4faff',
      100: '#c2dfff',
      200: '#a8d1ff',
      300: '#8fc4ff',
      400: '#75b7ff',
      500: '#429cff',
      600: '#0f81ff',
      700: '#0074f4',
      800: '#0068db',
      900: '#0050a8',
    },
    idmLight: {
      50: '#ffffff',
      100: '#ffffff',
      200: '#ffffff',
      300: '#ffffff',
      400: '#f5fafe',
      500: '#c9e0f7',
      600: '#9dc7f0',
      700: '#86baed',
      800: '#70adea',
      900: '#4494e3',
    }
  },
})

export default theme;
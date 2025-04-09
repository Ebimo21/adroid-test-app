import { Stack } from "expo-router";
import { ThemeProvider } from '@/context/ThemeContext';


export default function RootLayout() {
  return(
    <ThemeProvider>

    <Stack>
      <Stack.Screen name="home/" />
      <Stack.Screen name="about" />
    </Stack>
    </ThemeProvider>
  )
}

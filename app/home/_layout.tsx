import { Stack, Tabs } from "expo-router";

export default function RootLayout() {
  return(
    <Tabs>
      <Tabs.Screen name="home/index" />
      <Tabs.Screen name="home/about" />
    </Tabs>
  )
}

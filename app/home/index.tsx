import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link href={'/home/about'}><Text>Edit app/index.tsx to visit the ABOUT screen.</Text></Link>
    </View>
  );
}

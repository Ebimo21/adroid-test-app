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
        <Link href={'/'}><Text>Edit app/index.tsx to visit the hOME screen.</Text></Link>
      
    </View>
  );
}

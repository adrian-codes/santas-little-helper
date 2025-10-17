import { Text, View } from "react-native";
import Form from "./components/form";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgb(22, 91, 51)',
      }}
    >
      <Text style={{ color: '`rgb(187, 37, 40)`', fontSize: 18, fontWeight: 700, marginTop: 25 }}>Are you on the Naughty or Nice list?</Text>
      <Form />
    </View>
  );
}

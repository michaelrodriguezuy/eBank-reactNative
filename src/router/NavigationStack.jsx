import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../components/screens/LoginScreen";
import HomeScreen from "../components/screens/HomeScreen";
import CVUScreen from "../components/screens/CVUScreen";

const Stack = createStackNavigator();

export default function NavigationStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CVU" component={CVUScreen} />
    </Stack.Navigator>
  );
}

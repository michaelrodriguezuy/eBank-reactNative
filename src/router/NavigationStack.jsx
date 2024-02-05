import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../components/screens/LoginScreen";
import HomeScreen from "../components/screens/HomeScreen";
import CVUScreen from "../components/screens/CVUScreen";
import AddMovement from "../components/screens/AddMovement";

const Stack = createStackNavigator();

export default function NavigationStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CVU" component={CVUScreen} />
      <Stack.Screen name="AddMovement" component={AddMovement} />
    </Stack.Navigator>
  );
}

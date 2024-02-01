import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../components/screens/LoginScreen";

const Stack = createStackNavigator();

export default function NavigationStack() {
  return;

  <Stack.Navigator>
    <Stack.Screen name="Login" component={LoginScreen} />
    {/* <Stack.Screen name="Home" component={Home} /> */}
  </Stack.Navigator>;
}

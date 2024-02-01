import { NavigationContainer } from '@react-navigation/native';

import 'react-native-gesture-handler';
import NavigationStack from './src/router/NavigationStack';

export default function App() {
  return (
    <NavigationContainer>
      <NavigationStack />

    </NavigationContainer>
  );
}



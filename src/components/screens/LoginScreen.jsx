import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Input } from "@rneui/themed";
import { Button } from "@rneui/themed";

export default function LoginScreen({ navigation }) {
  const { top } = useSafeAreaInsets();
  const {user, setUser} = useState({
    email: "",
    password: ""
  });

  const handleLogin = () => {
    console.log("Ingresado");
    navigation.navigate("Home");
  }
  
  return (
    // esto es para android
    <View style={{ top: top, ...styles.containerLogin }}>
      <View style={{ marginHorizontal: 20 }}>
        <Text style={styles.title}>Iniciar sesion</Text>

        <View>
          <Input
            placeholder="Email"
            placeholderTextColor={"white"}
            inputStyle={{ color: "white" }}
            onChangeText={(email) => setUser({ ...user, email })}
          />
          <Input
            placeholder="Contraseña"
            placeholderTextColor={"white"}
            inputStyle={{ color: "white" }}
            secureTextEntry={true}            
            onChangeText={(password) => setUser({ ...user, password })}
          />
        </View>

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Button
            title={"Ingresar"}
            type="outline"
            containerStyle={{
              backgroundColor: "#00ffa8",
              width: 200,
            }}
            buttonStyle={{
              borderColor: "#00ffa8",
            }}
            titleStyle={{ color: "black" }}
            onPress={handleLogin}
          />
        </View>
      </View>
    </View>

    // esto es para ios, soluciona automaticamente el padding y el margen en el cabezal
    // <SafeAreaView>
    //   <Text>LoginScreen</Text>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerLogin: {
    flex: 1, // 1:1 lo hago para que mi pantalla ocupe todo el espacio
    backgroundColor: "#161717",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    color: "whitesmoke",
    // fontWeight: "bold",
    textAlign: "center",
    marginBottom: 50,
  },
});

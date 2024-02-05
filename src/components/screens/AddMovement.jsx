import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { db } from "../../firebaseConfig";
import { collection, serverTimestamp, addDoc } from "firebase/firestore";

import { Button } from "@rneui/base";
import { Input } from "@rneui/themed";

export default function AddMovement({ navigation }) {
  const { top } = useSafeAreaInsets();

  const [movementType, setMovementType] = useState("Ingreso");

  //la fecha no, porque vamos hacer que se genere automaticamente en firebase
  const [movements, setMovements] = useState({
    amount: 0,
    name: "",
    type: "",
    userAvatar: "",
  });

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 100);
    const imageUrl = `https://randomuser.me/api/portraits/men/${randomNumber}.jpg`;

    // otra alternativa para traer la imagen  random
    // const imageUrl=`https://picsum.photos/200/200?random=${randomNumber}`;

    setMovements({ ...movements, userAvatar: imageUrl });
  }, []);

  const handleAddMovement = async () => {
    const amount =
      movementType === "Ingreso"
        ? Number(movements.amount)
        : -Number(movements.amount);

    let NewMovement = {
      ...movements,
      amount,
      date: serverTimestamp(),
    };

    const collectionRef = collection(db, "movements");
    try {
      await addDoc(collectionRef, NewMovement);
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{ top: top, flex: 1, backgroundColor: "#161717" }}>
      <Text
        style={{
          color: "white",
          fontSize: 30,
          textAlign: "center",
          marginVertical: 30,
        }}
      >
        Agregar movimiento
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginVertical: 20,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Button
            title="Ingreso"
            type="outline"
            containerStyle={{
              width: 150,
              backgroundColor:
                movementType === "Ingreso" ? "#00ffa8" : "transparent",
            }}
            titleStyle={{
              color: movementType === "Ingreso" ? "black" : "white",
            }}
            buttonStyle={{ borderWidth: 1, borderColor: "#00ffa8" }}
            onPress={() => setMovementType("Ingreso")}
          />
        </View>

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Button
            title="Egreso"
            type="outline"
            containerStyle={{
              width: 150,
              backgroundColor:
                movementType === "Egreso" ? "#00ffa8" : "transparent",
            }}
            titleStyle={{
              color: movementType === "Egreso" ? "black" : "white",
            }}
            buttonStyle={{ borderWidth: 1, borderColor: "#00ffa8" }}
            onPress={() => setMovementType("Egreso")}
          />
        </View>
      </View>

      <View style={styles.containerForm}>
        <Input
          placeholder="Monto"
          placeholderTextColor={"white"}
          inputStyle={{ color: "white" }}
          keyboardType="numeric"
          onChangeText={(text) => setMovements({ ...movements, amount: text })}
        />
        <Input
          placeholder={movementType === "Ingreso" ? "Origen" : "Destino"}
          placeholderTextColor={"white"}
          inputStyle={{ color: "white" }}
          onChangeText={(name) => setMovements({ ...movements, name })}
        />
        <Input
          placeholder="Tipo de movimiento"
          placeholderTextColor={"white"}
          inputStyle={{ color: "white" }}
          onChangeText={(text) => setMovements({ ...movements, type:text })}
        />
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Button
            title={"Agregar"}
            type="outline"
            containerStyle={{
              width: 170,
              backgroundColor: "#00ffa8",
              borderRadius: 5,
            }}
            titleStyle={{ color: "black" }}
            buttonStyle={{ borderWidth: 1, borderColor: "#00ffa8" }}
            onPress={handleAddMovement}
          />
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 60,
        }}
      >
        <Button
          title={"Regresar"}
          type="outline"
          containerStyle={{
            width: 170,
            backgroundColor: "#00ffa8",
            borderRadius: 5,
          }}
          titleStyle={{ color: "black" }}
          buttonStyle={{ borderWidth: 1, borderColor: "#00ffa8" }}
          onPress={() => navigation.navigate("Home")}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerForm: {
    backgroundColor: "#282929",
    borderRadius: 5,
    padding: 20,
    marginHorizontal: 20,
  },
});

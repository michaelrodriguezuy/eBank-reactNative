import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { FontAwesome } from "@expo/vector-icons";

import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Button, Card } from "@rneui/base";
import Cardmovements from "../common/Cardmovements";
import CardMovementsSkeleton from "../common/CardMovementsSkeleton";

export default function HomeScreen({ navigation }) {
  // navigation es un prop que se le pasa a los componentes que son renderizados por el stack navigator, en criollo si este componente forma parte del stack navigator, le llega el prop navigation
  const { top } = useSafeAreaInsets();

  const [showMoney, setShowMoney] = useState(true);
  const [movements, setMovements] = useState([
    {
      id: 1,
      amount: -5000,
      date: "20/09/2021",
      name: "Pago de telefono",
      type: "debito",
      userAvatar: "https://randomuser.me/api/portraits/men/7.jpg",
    },
    {
      id: 2,
      amount: -1500,
      date: "20/09/2022",
      name: "Pago de cable",
      type: "debito",
      userAvatar: "https://randomuser.me/api/portraits/men/7.jpg",
    },
    {
      id: 3,
      amount: 21000,
      date: "20/11/2023",
      name: "Cobro hs prog",
      type: "cuenta",
      userAvatar: "https://randomuser.me/api/portraits/men/7.jpg",
    },
  ]);

  let monto = 250000;
  return (
    <SafeAreaView
      style={{
        top: top,
        flex: 1,
        backgroundColor: "#161717",
      }}
    >
      <ScrollView
        style={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.containerAmount}>
          <Text style={styles.title}>Tu saldo es: </Text>

          <View style={styles.cardMoney}>
            <FontAwesome name="money" size={40} color="#00ffa8" />

            <Text style={{ color: "white", fontSize: 30 }}>
              {" "}
              {showMoney
                ? monto.toLocaleString("es-UY", {
                    style: "currency",
                    currency: "UYU",
                  })
                : "$*****"}
            </Text>

            {showMoney ? (
              <Ionicons
                name="eye-off-sharp"
                size={40}
                color="#00ffa8"
                onPress={() => setShowMoney(false)}
              />
            ) : (
              <Ionicons
                name="eye-sharp"
                size={40}
                color="#00ffa8"
                onPress={() => setShowMoney(true)}
              />
            )}
          </View>
        </View>

        <View style={styles.containerMiniCards}>
          <TouchableOpacity
            style={styles.miniCards}
            onPress={() => navigation.navigate("CVU")}
            activeOpacity={0.5}
          >
            <FontAwesome name="newspaper-o" size={30} color="#00ffa8" />
            <Text style={{ color: "white" }}>CVU</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.miniCards}>
            <MaterialIcons name="graphic-eq" size={30} color="#00ffa8" />
            <Text style={{ color: "white" }}>Historial</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.miniCards} activeOpacity={0.9}>
            <AntDesign name="creditcard" size={30} color="#00ffa8" />
            <Text style={{ color: "white" }}>Tarjeta</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignContent: "center",
            marginVertical: 20,
          }}
        >
          <Text style={{ fontSize: 16, color: "white" }}>
            Ultimos movimientos
          </Text>
          <Button
            title={"Agregar movimiento"}
            type="outline"
            containerStyle={{
              width: 170,
              backgroundColor: "#00ffa8",
              borderRadius: 5,
            }}
            titleStyle={{ color: "black" }}
            buttonStyle={{ borderWidth: 1, borderColor: "#00ffa8" }}
          />
        </View>

        <View style={styles.containerMovements}>
          {/* a mostrar si no hay movimientos */}

          {movements.length === 0 && (
            <>
              <CardMovementsSkeleton />
              <CardMovementsSkeleton />
              <CardMovementsSkeleton />
              <CardMovementsSkeleton />
            </>
          )}
          {movements.length > 0 &&
            movements.map((movement) => (
              <Cardmovements
                key={movement.id}
                movement={movement}
                showMoney={showMoney}
              />
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    marginHorizontal: 20,
    paddingVertical: 20,
    // flex: 1,
  },
  containerAmount: {
    backgroundColor: "#282929",
    borderRadius: 5,
    color: "white",

    // flexDirection: "row",
    // justifyContent: "space-between",
    // alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 20,
    paddingLeft: 10,
    paddingTop: 10,
  },
  cardMoney: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 80,
    paddingHorizontal: 40,
  },
  containerMiniCards: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,

    // flex: 1,
    // backgroundColor: "#161717",
  },
  miniCards: {
    backgroundColor: "#282929",
    width: 110,
    height: 80,
    borderRadius: 5,
    color: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  containerMovements: {
    backgroundColor: "#282929",
    borderRadius: 5,
    minHeight: 200,
    marginBottom: 50,
  },
});

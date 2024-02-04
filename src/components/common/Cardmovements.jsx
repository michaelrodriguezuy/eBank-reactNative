import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Avatar } from "@rneui/base";

export default function Cardmovements({ movement, showMoney }) {
  return (
    <TouchableOpacity style={styles.cardMovements}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
        <Avatar
          size={32}
          rounded
          source={{
            uri: movement.userAvatar || "https://randomuser.me/api/portraits/men/7.jpg",
          }}
        />
      </View>

      <View style={{ width: 150, margin: 3 }}>
        <Text style={{ color: "white", fontSize: 16, maxWidth: 150 }}>
          {movement.name}
        </Text>
        <Text style={{ color: "white", fontSize: 11 }}>{movement.date}</Text>
        <Text style={{ color: "white", fontSize: 11 }}>{movement.type}</Text>
      </View>
      <View>
        <Text
          style={{
            ...styles.amount,
            backgroundColor: movement.amount >= 0 ? "#00ffa8" : "#282929",
            color: movement.amount >= 0 ? "#161717" : "white",
          }}
        >
          {showMoney
            ? movement.amount.toLocaleString("es-UY", {
                style: "currency",
                currency: "UYU",
              })
            : "$" + "****"}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardMovements: {
    height: 60,
    backgroundColor: "#161717",
    margin: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,

    // marginVertical: 5,
  },

  amount: {
    color: "white",
    backgroundColor: "#00ffa8",
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontWeight: "bold",
    borderRadius: 5,
    width: 120,
    height: 30,
    textAlign: "center",
    fontSize: 18,
  },
});

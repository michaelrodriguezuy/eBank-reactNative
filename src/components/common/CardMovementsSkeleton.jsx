import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Skeleton } from "@rneui/base";

export default function CardMovementsSkeleton() {
  return (
    <View style={styles.cardMovements}>
      <View style={{ flexDirection: "row", gap: 15, alignItems: "center" }}>
        <Skeleton circle width={32} height={32} animation="wave" />
        <Skeleton width={140} height={32} animation="wave" />
      </View>
      <Skeleton width={100} height={32} animation="wave" />
    </View>
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
});

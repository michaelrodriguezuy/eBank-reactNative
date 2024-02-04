import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";

import { FontAwesome } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";

export default function CVUScreen() {
  const { top } = useSafeAreaInsets();

  const [showTooltipCVU, setShowTooltipCVU] = useState(false);
  const [showTooltipAlias, setShowTooltipAlias] = useState(false);

  const handleTooltip = (tooltip) => {
    if (tooltip === "cvu") {
      setShowTooltipCVU(true);
    } else {
      setShowTooltipAlias(true);
    }
    setTimeout(() => {
      setShowTooltipCVU(false);
      setShowTooltipAlias(false);
    }, 1000);
  };

  const copyToClipboard = async (text) => {
    await Clipboard.setStringAsync(text);
  };

  return (
    <SafeAreaView
      style={{
        top: top,
        flex: 1,
        backgroundColor: "#161717",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          textAlign: "center",
          color: "white",
          fontSize: 30,
          marginBottom: 30,
        }}
      >
        Datos de tu cuenta
      </Text>

      <View style={styles.containerData}>
        <View style={styles.cardData}>
          <Text style={{ color: "white", fontSize: 16 }}>CVU</Text>
          <Text style={{ color: "white", fontSize: 16 }}>112132131</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              handleTooltip("cvu");
                copyToClipboard("112132131");
            }}
          >
            {showTooltipCVU && (
              <View style={styles.tooltip}>
                <Text>Copiado!</Text>
              </View>
            )}
            <FontAwesome name="copy" size={24} color="#00ffa8" />
          </TouchableOpacity>
        </View>
        <View style={styles.cardData}>
          <Text style={{ color: "white", fontSize: 16 }}>Alias</Text>
          <Text style={{ color: "white", fontSize: 16 }}>MiTienda.mp</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              handleTooltip("alias");
              copyToClipboard("MiTienda.mp");
            }}
          >
            {showTooltipAlias && (
              <View style={styles.tooltip}>
                <Text>Copiado!</Text>
              </View>
            )}
            <FontAwesome name="copy" size={24} color="#00ffa8" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerData: {
    backgroundColor: "#282929",
    borderRadius: 5,
    marginBottom: 50,
    marginHorizontal: 20,
    padding: 20,
  },
  cardData: {
    backgroundColor: "#161717",
    height: 60,
    margin: 10,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  button: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#282929",
  },
  tooltip: {
    position: "absolute",
    backgroundColor: "#00ff08",
    width: 90,
    height: 30,
    borderRadius: 5,
    top: -30,
    justifyContent: "center",
    alignItems: "center",
  },
});

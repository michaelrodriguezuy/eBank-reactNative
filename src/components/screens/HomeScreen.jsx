import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { FontAwesome } from "@expo/vector-icons";

import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Button, Card } from "@rneui/base";
import Cardmovements from "../common/CardMovements";
import CardMovementsSkeleton from "../common/CardMovementsSkeleton";

import { db } from "../../firebaseConfig";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";

export default function HomeScreen({ navigation }) {
  // navigation es un prop que se le pasa a los componentes que son renderizados por el stack navigator, en criollo si este componente forma parte del stack navigator, le llega el prop navigation
  const { top } = useSafeAreaInsets();

  const [showMoney, setShowMoney] = useState(true);
  const [movements, setMovements] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [movementToDelete, setMovementToDelete] = useState(null);
  const [isDelete, setIsDelete] = useState(false);

  const handleModal = (movement) => {
    setModalVisible(true);
    setMovementToDelete(movement);
  };

  const handleDelete = async () => {
    setIsDelete(true);
    setModalVisible(false);
    setMovements([]); //muestro el skeleton
    try {
      await deleteDoc(doc(db, "movements", movementToDelete.id));
      setMovementToDelete(null);
    } catch (error) {
      console.log(error);
    }
  };

  let totalAmount = movements.reduce((acc, movement) => {
    return acc + movement.amount;
  }, 0);

  useEffect(() => {
    setIsDelete(false);
    const getMovements = async () => {
      try {
        const response = await getDocs(collection(db, "movements"));

        const data = response.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });

        setMovements(data);
      } catch (error) {
        console.log(error);
      }
    };
    getMovements();
  }, [isDelete]);

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
              {showMoney
                ? totalAmount.toLocaleString("es-UY", {
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
            onPress={() => navigation.replace("AddMovement")} //con replace fuerzo a que se recarge el Home, y asi relfleje los nuevos cambios
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
                handleModal={handleModal}
              />
            ))}
        </View>
      </ScrollView>

      {/* modal para eliminar movimientos */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.textModal}>
              ¿Estas seguro que deseas eliminar {movementToDelete?.name}?
            </Text>

            <View
              style={{
                gap: 15,
              }}
            >
              <Button
                title={"Eliminar"}
                type="outline"
                containerStyle={{
                  width: 170,
                  backgroundColor: "#161717",
                  borderRadius: 5,
                }}
                titleStyle={{ color: "whitesmoke" }}
                buttonStyle={{ borderWidth: 1, borderColor: "#161717" }}
                onPress={handleDelete}
              />
              <Button
                title={"Cancelar"}
                type="outline"
                containerStyle={{
                  width: 170,
                  backgroundColor: "#161717",
                  borderRadius: 5,
                }}
                titleStyle={{ color: "whitesmoke" }}
                buttonStyle={{ borderWidth: 1, borderColor: "#161717" }}
                onPress={() => {
                  setModalVisible(false), setMovementToDelete(null);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    // backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    backgroundColor: "#00ffa8",
    borderRadius: 5,
    padding: 25,
    alignItems: "center",
    margin: 20,

    // shadowColor: "#000",
    // shadowOffset: {
    // width: 0,
    // height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
  },
  textModal: {
    color: "#282929",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 15,
  },
});

import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { NavigationProps } from "../navigation/app-stacks";
import Transaction from "../services/transaction.model";
import User from "../services/user.model";
import userdbapiService from "../services/userdbapi.service";
import Moment from "moment";

import Ionicons from "react-native-vector-icons/Ionicons";
import { color } from "react-native-reanimated";

// Props pour récupérer un puzzle
// Note : les props de navigation étendues sont bien là même si elles ne sont pas visibles
interface TransactionItemProps extends NavigationProps {
  transaction: Transaction;
  receveur: User;
  preteur: User;
}

export default class TransactionItem extends Component<TransactionItemProps> {
  render() {
    Moment.locale("fr");

    // navigation correspond aux props de navigation obtenues grâce à "extends NavigationsProps"
    const { transaction, receveur, preteur, navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.container}
            onPress={() => {
              // on navigue vers la page avec le nom "Puzzle" qui est en fait PuzzleScreen (cf app-stacks.js)
              navigation.navigate("Message", {
                messageId: transaction.id,
              });
            }}
          >
            <View style={styles.transactionView}>
              {/* <Text style={styles.text}>
            ID de la transaction : {transaction.id}
          </Text> */}
              <Ionicons name="ios-person-outline" size={30}></Ionicons>
              <Text style={styles.text}>{receveur.pseudo}</Text>
            </View>
            <View style={styles.transactionView}>
              {/* Pas nécessaire de garder ces lignes car les transactons concernent forcement le preteur */}
              <Ionicons name="ios-calendar-outline" size={30}></Ionicons>
              <Text style={styles.text}>
                {Moment(transaction.dateFin).fromNow()}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    margin: 10,
    backgroundColor: "white",
  },
  text: {
    fontSize: 18,
    color: "#49266F",
    marginLeft: 10,
  },
  image: {
    height: 150,
    width: 150,
  },
  transactionView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

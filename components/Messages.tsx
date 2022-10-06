import React, { Component } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { NavigationProps } from "../navigation/app-stacks";
import Transactions from "../services/transaction.model";
import transactiondbapiService from "../services/transactiondbapi.service";
import User from "../services/user.model";
import userdbapiService from "../services/userdbapi.service";
import MessagesItem from "./MessagesItem";

// Props de la page Accueil pour récupérer les puzzles et les JDS
// Note : les props de navigation étendues sont bien là même si elles ne sont pas visibles
interface MessagesProps extends NavigationProps {
  transactions: Array<Transactions>;
  users: Array<User>;
}

export default class Accueil extends Component<MessagesProps> {
  render() {
    // si la taille du tableau du puzzle et des JDS est inférieur à zéro on affiche "Pas de puzzle ni de jeu de société"
    if (this.props.transactions?.length > 0)
      return (
        <View style={styles.container}>
          <View style={styles.messages}>
            {/* FlatList pour l'affichage des puzzles */}

            <FlatList<Transactions>
              style={styles.jeuxList}
              data={this.props.transactions}
              keyExtractor={(transaction) => transaction.id.toString()}
              renderItem={({ item }) => {
                const receveur = this.props.users.find(
                  (x) => x.id === item.receveurId
                );
                const preteur = this.props.users.find(
                  (y) => y.id === item.preteurId
                );
                if (preteur?.id == 6) {
                  return (
                    <MessagesItem
                      transaction={item}
                      preteur={preteur}
                      receveur={receveur}
                      navigation={this.props.navigation}
                    />
                  );
                }
              }}
            />
          </View>
        </View>
      );
    else
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Pas de transactions</Text>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    margin: 5,
    width: "100%",
  },
  text: {
    fontSize: 30,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
  },
  messages: {
    margin: 5,
    flexDirection: "row",
  },
  jeuxList: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
});

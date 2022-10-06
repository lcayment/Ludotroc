import Transaction from "./transaction.model";
import User from "./user.model";

const rootEndpoint =
  "https://enscludotroc.azurewebsites.net/api/TransactionApi/";

export interface TransactionData {
  id: number;
  receveurId: number;
  receveur: User;
  preteurId: number;
  preteur: User;
  dateDebut: Date;
  dateFin: Date;
  jeuxId: number;
  jeux: string;
}

class TransactionsDbApi {
  /* Pas encore utilisé mais ca ne saurait tarder */
  // searchUsersById(userId: string): Promise<Array<User>> {
  //   return this.fetchFromApi(
  //     `${rootEndpoint}/UtilisateurApi/Details/${userId}`
  //   ).then((users) => this.createUsers(users));
  // }

  /* Pas encore utilisé mais ca ne saurait tarder */
  // searchCocktailsByIngredientName(name: string): Promise<Array<Ludotroc>> {
  //   // Doesn't return cocktail instructions
  //   return this.fetchFromApi(
  //     `${rootEndpoint}/filter.php?i=${name.trim()}`
  //   ).then((drinks) => this.createCocktails(drinks));
  // }

  // Récupération de toutes les transactions
  getAll(): Promise<Array<Transaction>> {
    // On utilise fetchFromApi
    return this.fetchFromApi(`${rootEndpoint}`).then((transactions) =>
      this.createTransactions(transactions)
    );
  }

  // Récupération d'une transaction donné avec son id
  // ex d'url : https://enscludotroc.azurewebsites.net/api/JDSApi/3
  findTransactionById(id: number): Promise<Transaction> {
    // On utilise fetchFromApiOne
    return this.fetchFromApiOne(`${rootEndpoint}${id}`).then((transactions) =>
      this.createTransaction(transactions)
    );
  }

  // On fetch depuis l'API avec une promesse de TABLEAU DE TRANSACTIONS
  private fetchFromApi(query: string): Promise<Array<Transaction>> {
    return (
      fetch(query)
        // FIXME: JSON parse error when ingredient is not found
        .then((response) => response.json())
        .then((jsonResponse) => jsonResponse || [])
        .catch((error) => {
          console.error(error);
        })
    );
  }

  // On fetch depuis l'API avec une promesse d'UNE SEULE TRANSACTION
  private fetchFromApiOne(query: string): Promise<Transaction> {
    return (
      fetch(query)
        // FIXME: JSON parse error when jds is not found
        .then((response) => response.json())
        .then((jsonResponse) => jsonResponse || [])
        .catch((error) => {
          console.error(error);
        })
    );
  }

  // Après avoir fetch de l'API on crée le jds
  private createTransaction(transactiondata: TransactionData): Transaction {
    return new Transaction(
      transactiondata.id,
      transactiondata.receveurId,
      transactiondata.receveur,
      transactiondata.preteurId,
      transactiondata.preteur,
      transactiondata.dateDebut,
      transactiondata.dateFin,
      transactiondata.jeuxId,
      transactiondata.jeux
    );
  }

  // Après avoir fetch de l'API on crée le tableau de jds
  private createTransactions(
    transactionsData: Array<TransactionData>
  ): Array<Transaction> {
    return transactionsData.map((transactiondata) =>
      this.createTransaction(transactiondata)
    );
  }
}

export default new TransactionsDbApi();

import JDS from "./jds.model";
import User from "./user.model";

const rootEndpoint = "https://enscludotroc.azurewebsites.net/api/JDSApi/";

export interface JDSData {
  nbJoueurs: number;
  tempsDeJeu: number;
  ageMini: number;
  dateDeSortie: Date;
  //public types: Array<Types>,
  id: number;
  nom: string;
  description: string;
  disponibilite: boolean;
  proprietaire: User;
}

class JDSsDbApi {
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

  searchJDSsByName(name: string): Promise<Array<JDS>> {
    // voir la valeur de ce return, ca me semble bizarre
    return this.fetchFromApi(`${rootEndpoint}?name=${name.trim()}`).then(
      (puzzles) => this.createJDSs(puzzles)
    );
  }


  // Récupération de tous les JDS
  getAll(): Promise<Array<JDS>> {
    // On utilise fetchFromApi
    return this.fetchFromApi(`${rootEndpoint}`).then((JDSs) =>
      this.createJDSs(JDSs)
    );
  }

  // Récupération d'un JDS donné avec son id
  // ex d'url : https://enscludotroc.azurewebsites.net/api/JDSApi/3
  findJDSById(id: number): Promise<JDS> {
    // On utilise fetchFromApiOne
    return this.fetchFromApiOne(`${rootEndpoint}${id}`).then((JDSs) =>
      this.createJDS(JDSs)
    );
  }

  // On fetch depuis l'API avec une promesse de TABLEAU DE JDS
  private fetchFromApi(query: string): Promise<Array<JDS>> {
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

  // On fetch depuis l'API avec une promesse d'UN SEUL JDS
  private fetchFromApiOne(query: string): Promise<JDS> {
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
  private createJDS(jdsdata: JDSData): JDS {
    return new JDS(
      jdsdata.nbJoueurs,
      jdsdata.tempsDeJeu,
      jdsdata.ageMini,
      jdsdata.dateDeSortie,
      jdsdata.id,
      jdsdata.nom,
      jdsdata.description,
      jdsdata.disponibilite,
      jdsdata.proprietaire,
    );
  }

  // Après avoir fetch de l'API on crée le tableau de jds
  private createJDSs(jdssData: Array<JDSData>): Array<JDS> {
    return jdssData.map((jdsdata) => this.createJDS(jdsdata));
  }
}

export default new JDSsDbApi();

import User from "./user.model";

const rootEndpoint =
  "https://enscludotroc.azurewebsites.net/api/UtilisateurApi/";

export interface UserData {
  pseudo: string;
  tel: string;
  email: string;
  localisation: string;
  id: number;
}

class UserDbApi {
  /* Pas encore utilisé mais ca ne saurait tarder */
  // searchUsersById(userId: string): Promise<Array<User>> {
  //   return this.fetchFromApi(`${rootEndpoint}${userId}`).then(
  //     (users) => this.createUsers(users)
  //   );
  // }

  /* Pas encore utilisé mais ca ne saurait tarder */
  searchUsersByName(name: string): Promise<Array<User>> {
    // voir la valeur de ce return, ca me semble bizarre
    return this.fetchFromApi(`${rootEndpoint}?name=${name.trim()}`).then(
      (users) => this.createUsers(users)
    );
  }

  // Récupération de tous les utilisateurs
  getAll(): Promise<Array<User>> {
    // On utilise fetchFromApi
    return this.fetchFromApi(`${rootEndpoint}`).then((users) =>
      this.createUsers(users)
    );
  }

  // Récupération d'un JDS donné avec son id
  // ex d'url : https://enscludotroc.azurewebsites.net/api/UtilisateurApi/350
  findUserById(id: number): Promise<User> {
    // On utilise fetchFromApiOne
    return this.fetchFromApiOne(`${rootEndpoint}${id}`).then((users) =>
      this.createUser(users)
    );
  }

  // On fetch depuis l'API avec une promesse de TABLEAU D'UTILISATEURS
  private fetchFromApi(query: string): Promise<Array<User>> {
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

  // On fetch depuis l'API avec une promesse d'UN SEUL UTILISATEUR
  private fetchFromApiOne(query: string): Promise<User> {
    return (
      fetch(query)
        // FIXME: JSON parse error when user is not found
        .then((response) => response.json())
        .then((jsonResponse) => jsonResponse || [])
        .catch((error) => {
          console.error(error);
        })
    );
  }

  // Après avoir fetch de l'API on crée l'utilisateur
  private createUser(userdata: UserData): User {
    return new User(
      userdata.pseudo,
      userdata.tel,
      userdata.email,
      userdata.localisation,
      userdata.id
    );
  }

  // Après avoir fetch de l'API on crée le tableau d'utilisateurs
  private createUsers(usersData: Array<UserData>): Array<User> {
    return usersData.map((userData) => this.createUser(userData));
    // return usersData.map((userdata) => this.createUser(userdata));
  }
}

export default new UserDbApi();

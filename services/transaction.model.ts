import User from "./user.model";

export default class Transaction {
  constructor(
    public id: number,
    public receveurId: number,
    public receveur: User,
    public preteurId: number,
    public preteur: User,
    public dateDebut: Date,
    public dateFin: Date,
    public jeuxId: number,
    public jeux: string
  ) {}
}

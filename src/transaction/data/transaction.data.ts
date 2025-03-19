import { EMPLOYE_STATUS, TRANSACTION_STATUS } from '@prisma/client';
export const TransactionEntityObj = {
  libelle: true,
  montant: true,
  code: true,
  name: true,
  status: true,
  modePaiementId: true,
  nom: true,
  prenom: true,
  email: true,
  telephone: true,
  date_naissance: true,
  posteId: true,
  roleId: true,
  typeEmployeId: true,
  salaire: true,
  dateEmbauche: true,
  departementId: true,
  password: true,
  token: true,
  recuParId: true,
  envoyerParId: true,
};

export class TransactionEntity {
  libelle: string;
  montant: number;
  modePaiement: {
    code: string;
    name: string;
    status: boolean;
  };
  modePaiementId: string;
  recuPar: {
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    date_naissance: Date;
    posteId: string;
    roleId: string;
    typeEmployeId: string;
    salaire: number;
    dateEmbauche: Date;
    departementId: string;
    status: EMPLOYE_STATUS;
    password: string;
    token: string;
  };
  recuParId: string;
  envoyerPar: {
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    date_naissance: Date;
    posteId: string;
    roleId: string;
    typeEmployeId: string;
    salaire: number;
    dateEmbauche: Date;
    departementId: string;
    status: EMPLOYE_STATUS;
    password: string;
    token: string;
  };
  envoyerParId: string;
  status: TRANSACTION_STATUS;
}

export const TransactionExample = {
  libelle: '',
  montant: 10,
  modePaiementId: '',
  recuParId: '',
  envoyerParId: '',
  status: '',
};

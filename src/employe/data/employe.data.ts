import {
  CONGES_STATUS,
  PRESENCE_STATUS,
  EMPLOYE_STATUS,
  DOCUMENT_STATUS,
  TRANSACTION_STATUS,
} from '@prisma/client';
export const EmployeEntityObj = {
  nom: true,
  prenom: true,
  email: true,
  telephone: true,
  date_naissance: true,
  departementId: true,
  posteId: true,
  codeRole: true,
  nameRole: true,
  roleId: true,
  typeEmployeId: true,
  salaire: true,
  employeId: true,
  dateDebut: true,
  dateFin: true,
  status: true,
  date: true,
  montant: true,
  commentaire: true,
  deductions: true,
  note: true,
  heureArrivee: true,
  heureDepart: true,
  dateEmbauche: true,
  responsableId: true,
  name: true,
  password: true,
  token: true,
  labelle: true,
  action: true,
  urlFichier: true,
  libelle: true,
  modePaiementId: true,
  recuParId: true,
  envoyerParId: true,
  salaireBrut: true,
  salaireNet: true,
};

export class EmployeEntity {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  date_naissance: Date;
  poste: {
    nom: string;
    departementId: string;
  };
  posteId: string;
  role: {
    codeRole: string;
    nameRole: string;
  };
  roleId: string;
  typeEmploye: {
    nom: string;
  };
  typeEmployeId: string;
  salaire: number;
  conges: {
    employeId: string;
    dateDebut: Date;
    dateFin: Date;
    status: CONGES_STATUS;
  };
  historiquesalaire: {
    employeId: string;
    date: Date;
    montant: number;
  };
  evaluations: {
    employeId: string;
    date: Date;
    commentaire: string;
    deductions: number;
    note: number;
  };
  presences: {
    employeId: string;
    date: string;
    heureArrivee: string;
    heureDepart: string;
    status: PRESENCE_STATUS;
  };
  dateEmbauche: Date;
  departement: {
    responsableId: string;
    name: string;
  };
  departementId: string;
  status: EMPLOYE_STATUS;
  password: string;
  token: string;
  gestionlogs: {
    labelle: string;
    action: string;
    employeId: string;
  };
  documents: {
    employeId: string;
    nom: string;
    urlFichier: string;
    status: DOCUMENT_STATUS;
  };
  transactionsEffectuer: {
    libelle: string;
    montant: number;
    modePaiementId: string;
    recuParId: string;
    envoyerParId: string;
    status: TRANSACTION_STATUS;
  };
  salaires: {
    employeId: string;
    salaireBrut: number;
    deductions: number;
    salaireNet: number;
  };
  responsableInDepartement: {
    responsableId: string;
    name: string;
  };
  transactionsRecu: {
    libelle: string;
    montant: number;
    modePaiementId: string;
    recuParId: string;
    envoyerParId: string;
    status: TRANSACTION_STATUS;
  };
}

export const EmployeExample = {
  nom: '',
  prenom: '',
  email: '',
  telephone: '',
  date_naissance: '2023-05-17',
  posteId: '',
  roleId: '',
  typeEmployeId: '',
  salaire: 10,
  dateEmbauche: '2023-05-17',
  departementId: '',
  status: '',
  password: '',
  token: '',
};

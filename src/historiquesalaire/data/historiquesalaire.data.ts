import { EMPLOYE_STATUS } from '@prisma/client';
export const HistoriqueSalaireEntityObj = {
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
  status: true,
  password: true,
  token: true,
  employeId: true,
  date: true,
  montant: true,
};

export class HistoriqueSalaireEntity {
  employe: {
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
  employeId: string;
  date: Date;
  montant: number;
}

export const HistoriqueSalaireExample = {
  employeId: '',
  date: '2023-05-17',
  montant: 10,
};

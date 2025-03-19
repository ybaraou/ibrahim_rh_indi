import { EMPLOYE_STATUS, CONGES_STATUS } from '@prisma/client';
export const CongeEntityObj = {
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
  dateDebut: true,
  dateFin: true,
};

export class CongeEntity {
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
  dateDebut: Date;
  dateFin: Date;
  status: CONGES_STATUS;
}

export const CongeExample = {
  employeId: '',
  dateDebut: '2023-05-17',
  dateFin: '2023-05-17',
  status: '',
};

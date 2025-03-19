import { EMPLOYE_STATUS } from '@prisma/client';
export const DepartementEntityObj = {
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
  responsableId: true,
  name: true,
};

export class DepartementEntity {
  responsable: {
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
  responsableId: string;
  employes: {
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
  name: string;
  postes: {
    nom: string;
    departementId: string;
  };
}

export const DepartementExample = {
  responsableId: '',
  name: '',
};

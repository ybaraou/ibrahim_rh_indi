import { EMPLOYE_STATUS } from '@prisma/client';
export const PosteEntityObj = {
  nom: true,
  responsableId: true,
  name: true,
  departementId: true,
  prenom: true,
  email: true,
  telephone: true,
  date_naissance: true,
  posteId: true,
  roleId: true,
  typeEmployeId: true,
  salaire: true,
  dateEmbauche: true,
  status: true,
  password: true,
  token: true,
};

export class PosteEntity {
  nom: string;
  departement: {
    responsableId: string;
    name: string;
  };
  departementId: string;
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
}

export const PosteExample = {
  nom: '',
  departementId: '',
};

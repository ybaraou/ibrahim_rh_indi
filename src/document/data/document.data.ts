import { EMPLOYE_STATUS, DOCUMENT_STATUS } from '@prisma/client';
export const DocumentEntityObj = {
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
  urlFichier: true,
};

export class DocumentEntity {
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
  nom: string;
  urlFichier: string;
  status: DOCUMENT_STATUS;
}

export const DocumentExample = {
  employeId: '',
  nom: '',
  urlFichier: '',
  status: '',
};

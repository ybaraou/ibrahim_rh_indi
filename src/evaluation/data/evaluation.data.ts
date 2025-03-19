import { EMPLOYE_STATUS } from '@prisma/client';
export const EvaluationEntityObj = {
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
  commentaire: true,
  deductions: true,
  note: true,
};

export class EvaluationEntity {
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
  commentaire: string;
  deductions: number;
  note: number;
}

export const EvaluationExample = {
  employeId: '',
  date: '2023-05-17',
  commentaire: '',
  deductions: 10,
  note: 10,
};

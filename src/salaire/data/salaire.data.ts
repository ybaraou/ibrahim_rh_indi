import { EMPLOYE_STATUS } from '@prisma/client';
export const SalaireEntityObj = {
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
  salaireBrut: true,
  deductions: true,
  salaireNet: true,
};

export class SalaireEntity {
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
  salaireBrut: number;
  deductions: number;
  salaireNet: number;
}

export const SalaireExample = {
  employeId: '',
  salaireBrut: 10,
  deductions: 10,
  salaireNet: 10,
};

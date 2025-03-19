import { EMPLOYE_STATUS } from '@prisma/client';
export const RoleEntityObj = {
  codeRole: true,
  nameRole: true,
  roleId: true,
  permissionId: true,
  codePermission: true,
  nom: true,
  prenom: true,
  email: true,
  telephone: true,
  date_naissance: true,
  posteId: true,
  typeEmployeId: true,
  salaire: true,
  dateEmbauche: true,
  departementId: true,
  status: true,
  password: true,
  token: true,
};

export class RoleEntity {
  codeRole: string;
  nameRole: string;
  roleToPermission: {
    roleId: string;
    permissionId: string;
    codePermission: string;
  };
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

export const RoleExample = {
  codeRole: '',
  nameRole: '',
};

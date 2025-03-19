import { EMPLOYE_STATUS, PRESENCE_STATUS } from '@prisma/client';
export const PresenceEntityObj = {
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
  heureArrivee: true,
  heureDepart: true,
};

export class PresenceEntity {
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
  date: string;
  heureArrivee: string;
  heureDepart: string;
  status: PRESENCE_STATUS;
}

export const PresenceExample = {
  employeId: '',
  date: '',
  heureArrivee: '',
  heureDepart: '',
  status: '',
};

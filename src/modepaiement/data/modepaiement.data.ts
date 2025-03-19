import { TRANSACTION_STATUS } from '@prisma/client';
export const ModePaiementEntityObj = {
  libelle: true,
  montant: true,
  modePaiementId: true,
  recuParId: true,
  envoyerParId: true,
  status: true,
  code: true,
  name: true,
};

export class ModePaiementEntity {
  transactions: {
    libelle: string;
    montant: number;
    modePaiementId: string;
    recuParId: string;
    envoyerParId: string;
    status: TRANSACTION_STATUS;
  };
  code: string;
  name: string;
  status: boolean;
}

export const ModePaiementExample = {
  code: '',
  name: '',
  status: '',
};

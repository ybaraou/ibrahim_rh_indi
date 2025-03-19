export const RoletoPermissionEntityObj = {
  codeRole: true,
  nameRole: true,
  roleId: true,
  codePermission: true,
  namePermission: true,
  group: true,
  permissionId: true,
};

export class RoletoPermissionEntity {
  role: {
    codeRole: string;
    nameRole: string;
  };
  roleId: string;
  permission: {
    codePermission: string;
    namePermission: string;
    group: string;
  };
  permissionId: string;
  codePermission: string;
}

export const RoletoPermissionExample = {
  roleId: '',
  permissionId: '',
  codePermission: '',
};

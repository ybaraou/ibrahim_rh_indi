export const PermissionEntityObj = {
  codePermission: true,
  namePermission: true,
  group: true,
  roleId: true,
  permissionId: true,
};

export class PermissionEntity {
  codePermission: string;
  namePermission: string;
  group: string;
  roleToPermission: {
    roleId: string;
    permissionId: string;
    codePermission: string;
  };
}

export const PermissionExample = {
  codePermission: '',
  namePermission: '',
  group: '',
};

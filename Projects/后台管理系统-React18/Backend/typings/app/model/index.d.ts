// This file is created by egg-ts-helper@1.30.3
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportMenu from '../../../app/model/Menu';
import ExportOauth from '../../../app/model/Oauth';
import ExportPrivilege from '../../../app/model/Privilege';
import ExportRole from '../../../app/model/Role';
import ExportRoleMenu from '../../../app/model/RoleMenu';
import ExportRolePrivilege from '../../../app/model/RolePrivilege';
import ExportUser from '../../../app/model/User';
import ExportUserRole from '../../../app/model/UserRole';

declare module 'egg' {
  interface IModel {
    Menu: ReturnType<typeof ExportMenu>;
    Oauth: ReturnType<typeof ExportOauth>;
    Privilege: ReturnType<typeof ExportPrivilege>;
    Role: ReturnType<typeof ExportRole>;
    RoleMenu: ReturnType<typeof ExportRoleMenu>;
    RolePrivilege: ReturnType<typeof ExportRolePrivilege>;
    User: ReturnType<typeof ExportUser>;
    UserRole: ReturnType<typeof ExportUserRole>;
  }
}

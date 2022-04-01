// This file is created by egg-ts-helper@1.30.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportOauth from '../../../app/model/Oauth';
import ExportPrivilege from '../../../app/model/Privilege';
import ExportRole from '../../../app/model/Role';
import ExportRolePrivilege from '../../../app/model/RolePrivilege';
import ExportUser from '../../../app/model/User';
import ExportUserRole from '../../../app/model/UserRole';

declare module 'egg' {
  interface IModel {
    Oauth: ReturnType<typeof ExportOauth>;
    Privilege: ReturnType<typeof ExportPrivilege>;
    Role: ReturnType<typeof ExportRole>;
    RolePrivilege: ReturnType<typeof ExportRolePrivilege>;
    User: ReturnType<typeof ExportUser>;
    UserRole: ReturnType<typeof ExportUserRole>;
  }
}

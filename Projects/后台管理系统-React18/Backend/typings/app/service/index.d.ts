// This file is created by egg-ts-helper@1.30.3
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportMenus from '../../../app/service/menus';
import ExportOauth from '../../../app/service/oauth';
import ExportPrivileges from '../../../app/service/privileges';
import ExportRoleMenu from '../../../app/service/roleMenu';
import ExportRolePrivilege from '../../../app/service/rolePrivilege';
import ExportRoles from '../../../app/service/roles';
import ExportUser from '../../../app/service/user';
import ExportUserRole from '../../../app/service/userRole';
import ExportUsers from '../../../app/service/users';

declare module 'egg' {
  interface IService {
    menus: AutoInstanceType<typeof ExportMenus>;
    oauth: AutoInstanceType<typeof ExportOauth>;
    privileges: AutoInstanceType<typeof ExportPrivileges>;
    roleMenu: AutoInstanceType<typeof ExportRoleMenu>;
    rolePrivilege: AutoInstanceType<typeof ExportRolePrivilege>;
    roles: AutoInstanceType<typeof ExportRoles>;
    user: AutoInstanceType<typeof ExportUser>;
    userRole: AutoInstanceType<typeof ExportUserRole>;
    users: AutoInstanceType<typeof ExportUsers>;
  }
}

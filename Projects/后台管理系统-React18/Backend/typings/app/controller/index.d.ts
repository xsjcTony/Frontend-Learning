// This file is created by egg-ts-helper@1.30.3
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportGithub from '../../../app/controller/github';
import ExportMenus from '../../../app/controller/menus';
import ExportPrivileges from '../../../app/controller/privileges';
import ExportRoleMenu from '../../../app/controller/roleMenu';
import ExportRolePrivilege from '../../../app/controller/rolePrivilege';
import ExportRoles from '../../../app/controller/roles';
import ExportUser from '../../../app/controller/user';
import ExportUserRole from '../../../app/controller/userRole';
import ExportUsers from '../../../app/controller/users';
import ExportUtil from '../../../app/controller/util';

declare module 'egg' {
  interface IController {
    github: ExportGithub;
    menus: ExportMenus;
    privileges: ExportPrivileges;
    roleMenu: ExportRoleMenu;
    rolePrivilege: ExportRolePrivilege;
    roles: ExportRoles;
    user: ExportUser;
    userRole: ExportUserRole;
    users: ExportUsers;
    util: ExportUtil;
  }
}

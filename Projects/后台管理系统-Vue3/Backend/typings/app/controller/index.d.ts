// This file is created by egg-ts-helper@1.30.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportGithub from '../../../app/controller/github';
import ExportPrivileges from '../../../app/controller/privileges';
import ExportRolePrivilege from '../../../app/controller/rolePrivilege';
import ExportRoles from '../../../app/controller/roles';
import ExportUser from '../../../app/controller/user';
import ExportUserRole from '../../../app/controller/userRole';
import ExportUsers from '../../../app/controller/users';
import ExportUtil from '../../../app/controller/util';

declare module 'egg' {
  interface IController {
    github: ExportGithub;
    privileges: ExportPrivileges;
    rolePrivilege: ExportRolePrivilege;
    roles: ExportRoles;
    user: ExportUser;
    userRole: ExportUserRole;
    users: ExportUsers;
    util: ExportUtil;
  }
}

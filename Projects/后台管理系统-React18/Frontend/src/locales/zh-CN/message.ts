/**
 * Server returned message
 */
const message: Record<string, string> = {
  // Register & Login
  'message.captcha.expired': '验证码已过期, 输入新的验证码',
  'message.captcha.incorrect': '验证码不正确, 输入新的验证码',
  'message.verification-code.expired': '验证码已过期, 点击"重新发送"获取新的验证码',
  'message.verification-code.incorrect': '验证码不正确',
  'message.register.username.exist': '用户名已存在',
  'message.register.email.exist': '邮箱已存在',
  'message.register.success': '注册成功, 请登录',
  'message.login.success': '登录成功',
  'message.login.wrong-username': '用户名或密码错误',
  'message.login.wrong-email': '邮箱或密码错误',

  // OAuth
  'message.oauth.bind.success': '绑定账号成功',
  'message.oauth.invalid': 'OAuth ID 不正确',

  // Reset password
  'message.reset-password.verify.success': '验证成功',
  'message.reset-password.verify.email.invalid': `邮箱地址没有和账号绑定`,
  'message.reset-password.reset.success': '重置密码成功, 请登录',

  // Permission
  'message.permission.denied': '没有权限',

  // Admin
  // Users
  'message.users.user.missing': '用户不存在',
  'message.users.user.updated': '更新用户成功',
  'message.users.user.deleted': '删除用户成功',
  'message.users.export.no-user': '没有用户',
  'message.users.import.invalid': '用户数据不正确',
  'message.users.import.success': '导入用户成功',
  'message.users.add.success': '添加用户成功',
  'message.users.avatar.upload.success': '头像上传成功',
  'message.users.avatar.upload.error': '头像上传失败',
  'message.users.assign-roles.already-assigned': '角色已分配给用户',
  'message.users.assign-roles.not-assigned': '角色未分配给用户',
  'message.users.assign-roles.success': '角色分配成功',

  // Roles
  'message.roles.role.updated': '更新角色成功',
  'message.roles.role.missing': '角色不存在',
  'message.roles.role.deleted': '删除角色成功',
  'message.roles.add.success': '添加角色成功',
  'message.roles.role-name.exist': '角色名称已存在',
  'message.roles.role-description.exist': '角色描述已存在',
  'message.roles.assign-privileges.success': '权限分配成功',
  'message.roles.assign-menus.success': '权限菜单成功',

  // Privileges
  'message.privileges.privilege-name.exist': '权限名称已存在',
  'message.privileges.privilege-description.exist': '权限描述已存在',
  'message.privileges.privilege.updated': '更新权限成功',
  'message.privileges.privilege.deleted': '删除权限成功',
  'message.privileges.privilege.missing': '权限不存在',
  'message.privileges.add.success': '权限添加成功',
  'message.privileges.delete.associated': '删除失败, 有子权限属于当前权限',

  // Menus
  'message.menus.menu.missing': '菜单不存在',
  'message.menus.menu-name.exist': '菜单名称已存在',
  'message.menus.menu-description.exist': '菜单描述已存在',
  'message.menus.menu-key.exist': '菜单键已存在',
  'message.menus.add.success': '添加菜单成功',
  'message.menus.menu.updated': '更新菜单成功',
  'message.menus.menu.deleted': '删除菜单成功',
  'message.menus.delete.associated': '删除失败, 有子菜单属于当前菜单'
}

export default message

/* eslint '@typescript-eslint/explicit-function-return-type': 'off' */
/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */
/* eslint '@typescript-eslint/no-unsafe-argument': 'off' */
/* eslint '@typescript-eslint/no-unsafe-member-access': 'off' */

import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  AllowNull,
  Unique,
  CreatedAt,
  UpdatedAt,
  Default,
  BelongsToMany,
  Is
} from 'sequelize-typescript'
import { Privilege } from './Privilege'
import { RolePrivilege } from './RolePrivilege'
import { User } from './User'
import { UserRole } from './UserRole'


const { INTEGER, STRING, BOOLEAN } = DataType

@Table({
  modelName: 'Role'
})
export class Role extends Model<Role> {

  @PrimaryKey
  @AutoIncrement
  @Column(INTEGER.UNSIGNED)
  public id!: number

  @AllowNull(false)
  @Unique(true)
  @Is(/^(?!\s*$).+/)
  @Column(STRING)
  public roleName!: string

  @AllowNull(false)
  @Unique(true)
  @Is(/^(?!\s*$).+/)
  @Column(STRING)
  public roleDescription!: string

  @AllowNull(false)
  @Unique(false)
  @Default(true)
  @Column(BOOLEAN)
  public roleState!: boolean

  @BelongsToMany(() => User, () => UserRole)
  public users!: (User & { UserRole: UserRole })[]

  @BelongsToMany(() => Privilege, () => RolePrivilege)
  public privileges!: (Privilege & { RolePrivilege: RolePrivilege })[]

  @CreatedAt
  public createdAt?: Date

  @UpdatedAt
  public updatedAt?: Date
}

export default () => Role

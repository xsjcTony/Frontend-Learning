/* eslint '@typescript-eslint/explicit-function-return-type': 'off' */
/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */
/* eslint '@typescript-eslint/no-unsafe-argument': 'off' */
/* eslint '@typescript-eslint/no-unsafe-member-access': 'off' */
/* eslint '@typescript-eslint/no-unsafe-call': 'off' */

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
  Is,
  BelongsToMany
} from 'sequelize-typescript'
import { Role } from './Role'
import { RolePrivilege } from './RolePrivilege'


const { INTEGER, STRING, BOOLEAN, ENUM, TINYINT } = DataType

@Table({
  modelName: 'Privilege'
})
export class Privilege extends Model<Privilege> {

  @PrimaryKey
  @AutoIncrement
  @Column(INTEGER.UNSIGNED)
  public id!: number

  @AllowNull(false)
  @Unique(true)
  @Is(/^(?!\s*$).+/)
  @Column(STRING)
  public privilegeName!: string

  @AllowNull(false)
  @Unique(true)
  @Is(/^(?!\s*$).+/)
  @Column(STRING)
  public privilegeDescription!: string

  @AllowNull(false)
  @Unique(false)
  @Default(true)
  @Column(BOOLEAN)
  public privilegeState!: boolean

  @AllowNull(false)
  @Unique(false)
  @Column(ENUM('menu', 'route', 'request'))
  public type!: 'menu' | 'request' | 'route'

  @AllowNull(true)
  @Unique(false)
  @Column(ENUM('get', 'post', 'put', 'delete', 'all'))
  public requestMethod!: 'all' | 'delete' | 'get' | 'post' | 'put'

  @AllowNull(true)
  @Unique(false)
  @Is(/^\/\S*$/)
  @Column(STRING)
  public privilegeUrl!: string

  @AllowNull(true)
  @Unique(false)
  @Column(INTEGER.UNSIGNED)
  public parentId!: number

  @AllowNull(false)
  @Unique(false)
  @Column(TINYINT.UNSIGNED)
  public level!: 1 | 2 | 3

  @BelongsToMany(() => Role, () => RolePrivilege)
  public roles!: (Role & { RolePrivilege: RolePrivilege })[]

  @CreatedAt
  public createdAt?: Date

  @UpdatedAt
  public updatedAt?: Date
}

export default () => Privilege

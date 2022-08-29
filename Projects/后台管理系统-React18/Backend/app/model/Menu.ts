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
import { RoleMenu } from './RoleMenu'


const { INTEGER, STRING, BOOLEAN, TINYINT } = DataType

@Table({
  modelName: 'Menu'
})
export class Menu extends Model<Menu> {

  @PrimaryKey
  @AutoIncrement
  @Column(INTEGER.UNSIGNED)
  public id!: number

  @AllowNull(false)
  @Unique(true)
  @Is(/^(?!\s*$).+/)
  @Column(STRING)
  public menuName!: string

  @AllowNull(false)
  @Unique(true)
  @Is(/^(?!\s*$).+/)
  @Column(STRING)
  public menuDescription!: string

  @AllowNull(false)
  @Unique(false)
  @Default(true)
  @Column(BOOLEAN)
  public menuState!: boolean

  @AllowNull(false)
  @Unique(true)
  @Is(/^(?!\s*$).+/)
  @Column(STRING)
  public menuKey!: string

  @AllowNull(true)
  @Unique(false)
  @Is(/^(?!\s*$).+/)
  @Column(STRING)
  public menuIcon!: string

  @AllowNull(false)
  @Unique(false)
  @Column(INTEGER.UNSIGNED)
  public parentId!: number

  @AllowNull(false)
  @Unique(false)
  @Column(TINYINT.UNSIGNED)
  public level!: 1 | 2

  @BelongsToMany(() => Role, () => RoleMenu)
  public roles!: (Role & { RoleMenu: RoleMenu })[]

  @CreatedAt
  public createdAt?: Date

  @UpdatedAt
  public updatedAt?: Date
}

export default () => Menu

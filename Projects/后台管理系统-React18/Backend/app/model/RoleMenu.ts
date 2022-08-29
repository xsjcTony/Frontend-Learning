/* eslint '@typescript-eslint/explicit-function-return-type': 'off' */
/* eslint '@typescript-eslint/no-unsafe-assignment': 'off' */
/* eslint '@typescript-eslint/no-unsafe-argument': 'off' */
/* eslint '@typescript-eslint/no-unsafe-member-access': 'off' */

import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  CreatedAt,
  UpdatedAt,
  ForeignKey
} from 'sequelize-typescript'
import { Menu } from './Menu'
import { Role } from './Role'


const { INTEGER } = DataType

@Table({
  modelName: 'RoleMenu'
})
export class RoleMenu extends Model<RoleMenu> {

  @PrimaryKey
  @ForeignKey(() => Role)
  @Column(INTEGER.UNSIGNED)
  public roleId!: number

  @PrimaryKey
  @ForeignKey(() => Menu)
  @Column(INTEGER.UNSIGNED)
  public menuId!: number

  @CreatedAt
  public createdAt?: Date

  @UpdatedAt
  public updatedAt?: Date
}

export default () => RoleMenu

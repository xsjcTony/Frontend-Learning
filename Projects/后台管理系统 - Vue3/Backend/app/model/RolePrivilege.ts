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
import { Privilege } from './Privilege'
import { Role } from './Role'


const { INTEGER } = DataType

@Table({
  modelName: 'RolePrivilege'
})
export class RolePrivilege extends Model<RolePrivilege> {

  @PrimaryKey
  @ForeignKey(() => Role)
  @Column(INTEGER.UNSIGNED)
  public roleId!: number

  @PrimaryKey
  @ForeignKey(() => Privilege)
  @Column(INTEGER.UNSIGNED)
  public privilegeId!: number

  @CreatedAt
  public createdAt?: Date

  @UpdatedAt
  public updatedAt?: Date
}

export default () => RolePrivilege

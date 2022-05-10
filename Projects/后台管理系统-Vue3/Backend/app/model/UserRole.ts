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
import { Role } from './Role'
import { User } from './User'


const { INTEGER } = DataType

@Table({
  modelName: 'UserRole'
})
export class UserRole extends Model<UserRole> {

  @PrimaryKey
  @ForeignKey(() => User)
  @Column(INTEGER.UNSIGNED)
  public userId!: number

  @PrimaryKey
  @ForeignKey(() => Role)
  @Column(INTEGER.UNSIGNED)
  public roleId!: number

  @CreatedAt
  public createdAt?: Date

  @UpdatedAt
  public updatedAt?: Date
}

export default () => UserRole

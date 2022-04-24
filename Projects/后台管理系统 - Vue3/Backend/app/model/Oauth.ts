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
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript'
import { User } from './User'


const { INTEGER, STRING, BIGINT } = DataType

@Table({
  modelName: 'Oauth'
})
export class Oauth extends Model<Oauth> {

  @PrimaryKey
  @AutoIncrement
  @Column(INTEGER.UNSIGNED)
  public id!: number

  @AllowNull(false)
  @Unique(false)
  @Column(STRING)
  public accessToken!: string

  @AllowNull(false)
  @Unique(false)
  @Column(STRING)
  public provider!: string

  @AllowNull(false)
  @Unique(false)
  @Column(BIGINT.UNSIGNED)
  public uid!: string

  @AllowNull(false)
  @Unique(false)
  @Column(INTEGER.UNSIGNED)
  @ForeignKey(() => User)
  public userId!: number

  @BelongsTo(() => User)
  public user!: User

  @CreatedAt
  public createdAt!: Date

  @UpdatedAt
  public updatedAt!: Date
}

export default () => Oauth

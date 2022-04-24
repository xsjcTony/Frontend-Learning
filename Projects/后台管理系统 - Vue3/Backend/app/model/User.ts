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
  Is,
  IsEmail,
  HasMany,
  Default, BelongsToMany
} from 'sequelize-typescript'
import { Oauth } from './Oauth'
import { Role } from './Role'
import { UserRole } from './UserRole'


const { INTEGER, STRING, BOOLEAN } = DataType

@Table({
  modelName: 'User'
})
export class User extends Model<User> {

  @PrimaryKey
  @AutoIncrement
  @Column(INTEGER.UNSIGNED)
  public id!: number

  @AllowNull(true)
  @Unique(true)
  @Is(/^[A-Za-z0-9]{6,20}$/)
  @Column(STRING)
  public username!: string

  @AllowNull(true)
  @Unique(true)
  @IsEmail
  @Column(STRING)
  public email!: string

  @AllowNull(false)
  @Unique(false)
  @Column(STRING)
  public password?: string

  @AllowNull(false)
  @Unique(false)
  @Default(false)
  @Column(BOOLEAN)
  public github!: boolean

  @AllowNull(false)
  @Unique(false)
  @Default(true)
  @Column(BOOLEAN)
  public userState!: boolean

  @AllowNull(true)
  @Unique(false)
  @Default('/public/assets/images/avatars/avatar.jpg')
  @Column(STRING)
  public avatarUrl!: string

  @HasMany(() => Oauth)
  public oauths!: Oauth[]

  @BelongsToMany(() => Role, () => UserRole)
  public roles!: (Role & { UserRole: UserRole })[]

  @CreatedAt
  public createdAt?: Date

  @UpdatedAt
  public updatedAt?: Date
}

export default () => User

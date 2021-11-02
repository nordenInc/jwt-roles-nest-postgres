import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  DataType,
  Table,
  Model,
  BelongsToMany,
  HasMany,
} from "sequelize-typescript";
import { Post } from "src/posts/posts.model";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";

interface UserCreationAttribute {
  email: string;
  password: string;
}

@Table({
  tableName: "users",
})
export class User extends Model<User, UserCreationAttribute> {
  @ApiProperty({ example: "1", description: "Unique identificator" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: "example@mail.com", description: "Email" })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @ApiProperty({ example: "34vf33", description: "User password" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({ example: "true", description: "Banned or not" })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  banned: boolean;

  @ApiProperty({ example: "Because of rasism", description: "Ban reason" })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  banReason: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  @HasMany(() => Post)
  posts: Post[];
}

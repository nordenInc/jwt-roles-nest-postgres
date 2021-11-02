import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { RolesGuard } from "src/auth/role-guard";
import { Roles } from "src/auth/roles-auth.decorator";
import { ValidationPipe } from "src/pipes/validation.pipe";
import { AddRoleDto } from "./dto/add-role.dto";
import { BaneUserDto } from "./dto/ban-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./users.model";
import { UsersService } from "./users.service";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: "User creation" })
  @ApiResponse({ status: 200, type: User })
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({ status: 200, type: [User] })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: "Assign role" })
  @ApiResponse({ status: 200, type: [User] })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post("/role")
  addRole(@Body() dto: AddRoleDto) {
    return this.userService.addRole(dto);
  }

  @ApiOperation({ summary: "Ban user" })
  @ApiResponse({ status: 200, type: [User] })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post("/ban")
  banUser(@Body() dto: BaneUserDto) {
    return this.userService.ban(dto);
  }
}

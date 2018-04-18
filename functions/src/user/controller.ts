import {
    JsonController,
    Get, Post, Put, Delete,
    Param,
    Body,
    HttpCode,
    OnUndefined
} from "routing-controllers";

import { Inject } from "typedi";

import { User } from "./model"
import { UserNotFoundError } from "./error"
import { UserService } from "./service";

@JsonController()
export class UserController {

    @Inject()
    userService: UserService;

    @Get()
    getAll() {
        return this.userService.findAll();
    }

    @Get("/:id")
    @OnUndefined(UserNotFoundError)
    getOne(@Param("id") id: string) {
        return this.userService.findById(id);
    }

    @Post()
    save(@Body() user: User) {
        return this.userService.save(user);
    }

    @Put("/:id")
    @OnUndefined(UserNotFoundError)
    async update(@Param("id") id: string, @Body() user: User) {
        return this.userService.update(id, user);
    }

    @Delete("/:id")
    @HttpCode(204)
    @OnUndefined(UserNotFoundError)
    async delete(@Param("id") id: string) {
        await this.userService.delete(id);
        return "delete"
    }

}
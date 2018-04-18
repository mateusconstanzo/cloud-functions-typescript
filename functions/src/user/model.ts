import {
    IsNotEmpty
} from "class-validator";

export class User {

    @IsNotEmpty()
    username: string = "";

    @IsNotEmpty()
    password: string = "";

}

export class UserEntity {

    id: string;

    username: string;

    password: string;

    constructor(id: string, username: string, password: string) {
        this.id = id;
        this.username = username;
        this.password = password;
    }

}
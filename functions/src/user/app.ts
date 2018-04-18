import {
    Router,
    Request,
    Response
} from "express";

import {
    json,
    urlencoded
} from "body-parser"

import { App } from "../app"
import { UserController } from "./controller"

class UserApp extends App {

    middleware(): Array<Function> {
        return [

        ];
    }

    controllers(): Array<Function> {
        return [
            UserController,
        ];
    }

}

export const userApp = new UserApp().express
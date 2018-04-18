import "reflect-metadata"
import * as express from "express";
import { Container } from "typedi";

import {
    createExpressServer,
    useContainer,
} from "routing-controllers";

import {
    json,
    urlencoded
} from "body-parser"

export abstract class App {

    public express: express.Application;

    constructor() {

        this.express = createExpressServer({
            cors: true,
            development: false,
            controllers: this.controllers()
        });

        this.injection();

    }

    private injection(): void {
        useContainer(Container);
    }

    abstract controllers(): Array<Function>;
    abstract middleware(): Array<Function>;

}
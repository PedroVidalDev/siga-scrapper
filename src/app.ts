import express, { Express } from "express";

export class App {
    private static instance: App;
    private expressApp: Express;

    private constructor() {
        this.expressApp = this.setupExpressApp();
    }

    private setupExpressApp(): Express {
        const expressApp = express();

        expressApp.use(cors)
    }
}
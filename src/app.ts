import cors from "cors";
import helmet from "helmet";
import express, { Express } from "express";
import router from "./routes/IndexRouter";
import { DatabaseConn } from "./config/database/DatabaseConn";

export class App {
    private static instance: App;
    private expressApp: Express;

    private constructor() {
        this.expressApp = this.setupExpressApp();
    }

    private setupExpressApp(): Express {
        const expressApp = express();

        expressApp.use(cors({
            origin: ["http://localhost:3000"],
            credentials: true
        }));

        expressApp.use(helmet());

        expressApp.use(express.json());

        expressApp.use(router);

        return expressApp;
    }

    public static getInstance(): App {
        if(!App.instance) {
            App.instance = new App();
        }

        return App.instance;
    }

    public getExpressApp(): Express {
        return this.expressApp;
    }

    public async run(port: number) {
        const dataSource = DatabaseConn.getInstance();
        await dataSource.initialize();

        return this.expressApp.listen(port, () => {
            console.log("Server start at port " + port);
        })
    }
}
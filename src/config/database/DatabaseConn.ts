import { DataSource } from "typeorm";
import { DisciplineModel } from "../../models/DisciplineModel";

export class DatabaseConn {
    private static instance: DataSource;

    private constructor(){}

    public static getInstance(): DataSource {
        if(!DatabaseConn.instance) {
            DatabaseConn.instance = new DataSource({
                type: 'postgres',
                host: process.env.POSTGRES_HOST,
                port: Number(process.env.POSTGRES_PORT),
                username: process.env.POSTGRES_USER,
                password: process.env.POSTGRES_PASSWORD,
                database: process.env.POSTGRES_DB,
                synchronize: process.env.NODE_ENV !== "prod",
                logging: true,
                entities: [DisciplineModel],
                migrations: [],
                subscribers: [],
            });

            DatabaseConn.instance.initialize()
                .then(() => {
                    console.log("Connection has been initialized")
                })
                .catch((error) => {
                    console.log("Error during the database initialization: ", error);
                })
        }
        return DatabaseConn.instance;
    }
}
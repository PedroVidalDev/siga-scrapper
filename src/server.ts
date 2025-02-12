import { App } from "./app";

const app = App.getInstance();
try{
    const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
    app.run(PORT);
} catch(error) {
    console.error("Failed to start server");
    process.exit(1);
}
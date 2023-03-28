import { connect, disconnect } from "./src/database/connection";

async function exec() {
    await connect();
    await disconnect();
}

exec();
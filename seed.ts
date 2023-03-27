import { connect, disconnect } from "./src/database/connection";

async function exec() {
    await connect();
    console.log("tu vieja 13");
    await disconnect();
}

exec()
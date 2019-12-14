import errorHandler from "errorhandler";
import app from "./app";
import {run} from './connectors/tasks';
import runViewTask from './connectors/RunViewTask';

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
const server = app.listen(app.get("port"), async () => {
    console.log(
        "  App is running at http://localhost:%d in %s mode",
        app.get("port"),
        app.get("env")
    );
   await run(runViewTask.id);
    console.log("  Press CTRL-C to stop\n");
});

export default server;
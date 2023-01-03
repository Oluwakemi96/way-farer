import 'dotenv/config';
import express from 'express';
import enums from './lib/enums/index';
import expressConfig from './config/express/index';


const app = express();
// const port = config.WAYFARER_NODE_ENV || 8080;
const port = 8080;
expressConfig(app);

app.listen(port);
logger.info(`${enums.CURRENT_TIME_STAMP} Application started on port ${port}`);

export default app;

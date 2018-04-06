import * as createError from 'http-errors';
import * as express from 'express';
import * as logger from 'morgan';
import * as Path from "path";

import indexRoutes from './routes/index';

class App {
    public express;

    constructor () {
        this.express = express();
        this.express.use(logger('dev'));
        this.express.use(express.static(Path.join(__dirname, '..', 'public')));
        console.log(Path.join(__dirname, '..', 'public'));
        this.mountRoutes();
    }

    private mountRoutes(): void {
        this.express.use('/', indexRoutes);
        this.express.use((req, res, next) => {
            next(createError(404));
        });
        this.express.use((err, req, res) => {
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};

            res.sendStatus(err.status || 500);
        });
    }
}

export default new App().express
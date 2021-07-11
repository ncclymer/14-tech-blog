const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const helpers = require('./utils/helpers');
const exhndlbrs = require('express-handlebars');
const hndlbrs = exhndlbrs.create({ helpers });
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 3002;
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const newSession = {
    secret: 'isitsecretisitsafe',
    cookie: {
        expires: 60 * 60 * 1000
    },
    resave: true,
    rolling: true,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    }),
};

app.use(session(newSession));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', hndlbrs.engine);
app.set('view engine', 'handlebars');
app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening on port 3002.'));
});
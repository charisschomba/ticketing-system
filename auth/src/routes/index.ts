import currentUser from './auth/currentUser';
import signin from "./auth/signin";
import signout from "./auth/signout";
import signup from "./auth/signup";

const routes = (app: any) => {
    app.use('/api/v1/users', currentUser);
    app.use('/api/v1/signin', signin);
    app.use('/api/v1/signup', signup);
    app.use('/api/v1/signout', signout);

};

export default routes;
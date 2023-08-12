import currentUser from "./auth/currentUser";
import signin from "./auth/signin";
import signout from "./auth/signout";
import signup from "./auth/signup";

const routes = (app: any) => {
  app.use("/api/v1/auth", currentUser);
  app.use("/api/v1/auth", signin);
  app.use("/api/v1/auth", signup);
  app.use("/api/v1/auth", signout);
};

export default routes;
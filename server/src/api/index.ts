import userRoutes from "./routes/user.routes";
import { loggerMiddleware } from "./middlewares/logger.middleware";
import { app } from "./init";
import { errorMiddleware } from "./middlewares/error.middleware";

const PORT = process.env.API_PORT || 5000;

app.use(loggerMiddleware);
app.use("/users", userRoutes);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`API running port ${PORT}`);
});

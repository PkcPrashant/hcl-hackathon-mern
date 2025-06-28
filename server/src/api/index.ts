import { app } from "./init";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import portfolioRoutes from "./routes/portfolio.routes";
import { errorMiddleware } from "./middlewares/error.middleware";
import { loggerMiddleware } from "./middlewares/logger.middleware";

const PORT = process.env.API_PORT || 8080;

app.use(loggerMiddleware);
app.use("/v1/auth", authRoutes);
app.use("/v1/users", userRoutes);
app.use("/v1/portfolio", portfolioRoutes);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`API running port ${PORT}`);
});

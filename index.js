import express from "express";
import carsRouter from "./routes/carsRouter.js";

const app = express();
app.use(express.json());

global.PORT = 3000;
global.FILE = "./data/car-list.json";

app.get('/', (_req, res) => {
    res.json({ message: 'Server is running!' });
})

app.use('/marcas', carsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

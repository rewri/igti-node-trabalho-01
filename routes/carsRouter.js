import express from "express";
import { readJsonFile, getCarsLength, orderAlphabetic, orderASC, orderDESC } from "../helpers.js";

const router = express.Router();

router.get("/", (_req, res) => {
    try {
        res.send(readJsonFile());
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get("/maisModelos", (_req, res) => {
    try {
        res.send(orderASC(orderAlphabetic(getCarsLength(readJsonFile()))));
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get("/menosModelos", (_req, res) => {
    try {
        res.send(orderDESC(orderAlphabetic(getCarsLength(readJsonFile()))));
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get("/listaMaisModelos/:limit?", (req, res) => {
    try {
        if (req.params.limit) {
            res.send(orderASC(orderAlphabetic(getCarsLength(readJsonFile()))).slice(0, req.params.limit));
        } else { 
            throw { "error": "No limit param" };
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get("/listaMenosModelos/:limit", (req, res) => {
    try {
        if (req.params.limit) {
            res.send(orderDESC(orderAlphabetic(getCarsLength(readJsonFile()))).slice(0, req.params.limit));
        } else {
            throw { "error": "No limit param" };
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post("/listaModelos", (req, res) => {
    try {
        const { nomeMarca } = req.body;
        if (nomeMarca) {
            res.send(JSON.parse(readJsonFile()).filter((row) => {
                return row.brand.toLowerCase() === nomeMarca.toLowerCase();
            }));
        } else {
            res.send({});
        }
    } catch (error) {
        res.status(500).send(JSON.parse(error));
    }
});

export default router;
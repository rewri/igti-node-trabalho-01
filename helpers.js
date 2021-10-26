import fs from "fs";

const { readFileSync } = fs;

const readJsonFile = () => readFileSync(global.FILE, "utf8");

const getCarsLength = (data) => {
    const totals = [];
    JSON.parse(data).map(({ brand, models }) => {
        totals.push({
            "brand": brand,
            "total": models.length
        });
    });
    return totals;
}

const orderASC = (data) => {
    return data.sort(function (a, b) {
        const keyA = a.total;
        const keyB = b.total;
        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;
        return 0;
    });
}

const orderDESC = (data) => {
    return data.sort(function (a, b) {
        const keyA = a.total;
        const keyB = b.total;
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
    });
}

const orderAlphabetic = (data) => data.sort((a, b) => a.brand.localeCompare(b.brand));

export { readJsonFile, orderASC, orderDESC, orderAlphabetic, getCarsLength };
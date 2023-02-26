function approximation(inpArray, xLabel, yLabel) {
    let x = R.map(x => Number(x[xLabel]), inpArray);
    let y = R.map(y => Number(y[yLabel]), inpArray);

    const sumX = x.reduce((prev, curr) => prev + curr, 0);
    const avgX = sumX / x.length;

    const xDifferencesToAverage = x.map((value) => avgX - value);
    const xDifferencesToAverageSquared = xDifferencesToAverage.map((value) => value ** 2);
    const xX = xDifferencesToAverageSquared.reduce((prev, curr) => prev + curr,0);

    const sumY = y.reduce((prev, curr) => prev + curr, 0);
    const avgY = sumY / y.length;

    const yDifferencesToAverage = y.map((value) => avgY - value);
    const xAndYDifferencesMultiplied = xDifferencesToAverage.map((curr, index) => curr * yDifferencesToAverage[index]);
    const xY = xAndYDifferencesMultiplied.reduce((prev, curr) => prev + curr, 0);

    const slope = xY / xX;
    const intercept = avgY - slope * avgX;
    const resultFun = (x) => intercept + slope * x;

    console.log(`Апроксимацiя: y = ${intercept.toFixed(2)} + ${slope.toFixed(2)} * x`);
    approximationError(resultFun, y, x);

    return resultFun;
}

function approximationError(func, y, x){
    let A = (1 / y.length) * R.reduce((acc, el) => acc + Math.abs((el[1] - func(el[0])) / el[1]), 0, R.zip(x, y));
    console.log("Середня помилка апроксимацiї: " + ((A.toFixed(2))*100) + " (%)");
}
// Calculate the average of all the numbers
const calculateMean = (values) => {return (values.reduce((sum, current) => sum + current)) / values.length;};

// Calculate variance
const calculateVariance = (values) => {
    const average = calculateMean(values);
    const squareDiffs = values.map((value) => {
        const diff = value - average;
        return diff * diff;
    });
    return calculateMean(squareDiffs);
};

const R = require('ramda');
const csvjson = require('csvjson');
const readFile = require('fs').readFile;

// Read CSV
readFile('Crime.csv', 'utf-8', (err, fileContent) => {
    if(err) {console.log(err); throw new Error(err);}
    let jsonObj = csvjson.toObject(fileContent);
    let y = R.map(x => Number(x["Total"]), jsonObj);

    //Середньоквадратичне відхилення та дисперсія
    let variance = calculateVariance(y);
    console.log("Середньоквадратичне відхилення: " + Math.sqrt(variance).toFixed(2));
    console.log("Дисперсія: " + variance.toFixed(2));

    //Виклик функції для апроксимації
    approximation(jsonObj, "Total", "Speedy");
});

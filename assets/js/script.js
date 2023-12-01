console.log("Console logs are required by the task!");

let firstGenerateButtonDom = document.querySelector(
    "#generate-random-number-first"
);
let firstGeneratedResultsDom = document.querySelector(
    "#generated-results-first"
);

let secondGenerateButtonDom = document.querySelector(
    "#generate-random-number-second"
);
let secondGeneratedResultsDom = document.querySelector(
    "#generated-results-second"
);

secondGenerateButtonDom.addEventListener("click", function () {
    let output = secondGenerateValueForCategory();

    secondGeneratedResultsDom.textContent = output;

    if (secondGeneratedResultsDom.classList.contains("hidden"))
        secondGeneratedResultsDom.classList.remove("hidden");
});

firstGenerateButtonDom.addEventListener("click", function () {
    let output = firstGenerateValueForCategory();

    firstGeneratedResultsDom.textContent = output;

    if (firstGeneratedResultsDom.classList.contains("hidden"))
        firstGeneratedResultsDom.classList.remove("hidden");
});

function secondGenerateValueForCategory() {
    let randomNumber = rand(0, 99);
    let output = "Generated number: " + randomNumber + " ";
    let category = 0;

    if (randomNumber < 6) {
        category = 1;
        output += "adjusted number: " + randomNumber * 3;
    } else if (randomNumber > 5 && randomNumber < 16) {
        category = 2;
        let newRandomNumber = randomNumber - 4;
        let squareOfRandom = newRandomNumber ** 2;

        output += "adjusted number: " + squareOfRandom;
    } else if (
        randomNumber > 15 &&
        randomNumber < 31 &&
        randomNumber % 5 === 0
    ) {
        category = 3;
        output += "adjusted number: " + (randomNumber + 10);
    } else if (
        randomNumber > 30 &&
        randomNumber < 46 &&
        randomNumber % 2 === 1
    ) {
        category = 4;
        output += "adjusted number: " + (100 - randomNumber);
    } else if (
        randomNumber > 46 &&
        randomNumber < 100 &&
        (numberUnitsAre(randomNumber, 6) || numberUnitsAre(randomNumber, 7))
    ) {
        category = 5;
        output += "adjusted number: " + randomNumber / 4;
    } else {
        category = 6;
        output += " Number didn't fit any category!";
    }

    if (category !== 6) {
        output += " Category: " + category;
    }

    console.log("second generation check: ", output);
    return output;
}

function numberUnitsAre(number, units) {
    if (getUnits(number) === units) {
        return true;
    }
    return false;
}

function firstGenerateValueForCategory() {
    let randomNumber = rand(0, 99);
    let output = "";
    let category = 0;

    if (randomNumber < 11) {
        category = 1;
        output += "Square of " + randomNumber + " is " + randomNumber ** 2;
    } else if (randomNumber > 10 && randomNumber < 20) {
        category = 2;
        output += "Generated number: " + randomNumber;
    } else if (
        randomNumber > 19 &&
        randomNumber < 50 &&
        randomNumber % 2 === 0
    ) {
        //Kategorija 3: 20 - 49  ir skaičius yra lyginis: Skaičiaus dešimtis atimti iš paties skaičiaus ir atspausdinti
        category = 3;
        let dozens = getDozens(randomNumber);
        output += `Generated number: ${randomNumber} adjusted number: ${
            randomNumber - dozens
        }`;
    } else if (
        randomNumber > 19 &&
        randomNumber < 50 &&
        randomNumber % 2 === 1
    ) {
        //Kategorija 4: 20 - 49  ir skaičius yra nelyginis: Skaičiaus vienetus pridėti prie paties skaičiaus ir padalinti iš 2. Galiausiai atspausdinti;
        category = 4;
        let units = getUnits(randomNumber);
        output +=
            "Generated number: " +
            randomNumber +
            " adjusted number: " +
            (randomNumber + units) / 2;
    } else if (randomNumber > 49 && randomNumber % 3 === 0) {
        category = 5;
        output +=
            "Generated number: " +
            randomNumber +
            " random string: " +
            generateRandomString(4);
    } else {
        category = 6;
        output +=
            "Generated number: " +
            randomNumber +
            " number doesn't fit any category!";
    }

    if (category != 6) {
        output += " Category: " + category;
    }

    console.log(output);
    return output;
}

function generateRandomString(length) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let result = "";

    for (let currentChar = 0; currentChar < length; currentChar++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }

    return result;
}

function getUnits(number) {
    let dozensAsUnits = getDozens(number);
    let dozensValue = dozensAsUnits * 10;

    return number - dozensValue;
}

function getDozens(number) {
    let currentDozen = 0;
    let foundDozens = false;

    while (foundDozens === false) {
        if (number - currentDozen * 10 > 9) {
            currentDozen++;
            continue;
        }

        foundDozens = true;
    }

    return currentDozen;
}

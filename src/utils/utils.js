/*
Quiz: {
    question: "",
    answers: [],
    correctAnswer: ""
}
*/
import axios from "axios";
const countryURL = `https://restcountries.eu/rest/v2/all`;

export const getCharacterBasedOnNumber = (num) => {
    let char;
    switch (num) {
        case 0:
            char = "A"
            break;
        case 1:
            char = "B"
            break;
        case 2:
            char = "C"
            break;
        case 3:
            char = "D"
            break;
        default:
            char = "N/A"
            break;
    }
    return char;
}

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

export const generateCapitalQuestion = async () => {
    try {
        const res = await axios.get(countryURL);
        const countries = res.data;
        const country = getRandomCountry(countries);

        const quiz = {
            question: `${country.capital} is the capital of`,
            correctAnswer: country.name,
            answers: shuffle([
                country,
                ...getRandomCountries(country, countries)
            ]),
            type: "capital"
        }

        return quiz;
    } catch (error) {
        console.log(error);
    }
}

export const getRandomCountry = (countries) => {
    var country = countries[Math.floor(Math.random() * countries.length)];
    return country
}

export const getRandomCountries = (outCountry, countries) => {
    let randomCountries = [];
    countries = countries.filter(country => {
        return country.name !== outCountry.name;
    })
    for (let index = 0; index < 3; index++) {
        randomCountries.push(getRandomCountry(countries));
    }
    return randomCountries;
}

export const generateFlagQuestion = async () => {
    try {
        const res = await axios.get(countryURL);
        const countries = res.data;
        const country = getRandomCountry(countries);

        const quiz = {
            question: `Which country does this flag belong to?  `,
            flagURL: country.flag,
            correctAnswer: country.name,
            answers: shuffle([
                country,
                ...getRandomCountries(country, countries)
            ]),
            type: "flag"
        }

        return quiz;
    } catch (error) {
        console.log(error);
    }
}

export const generateRandomQuestion = async () => {
    try {
        let randomNumber = Math.round(Math.random());
        let randomQuestion;

        switch (randomNumber) {
            case 0:
                randomQuestion = await generateCapitalQuestion();
                break;
            case 1:
                randomQuestion = await generateFlagQuestion();
                break;
            default:
                randomQuestion = await generateCapitalQuestion();
                break;
        }

        return randomQuestion;
    } catch (error) {
        console.log(error);
    }
}

export const generateQuestions = async (numberOfQuestions = 10) => {
    try {
        let listOfQuestions = [];
        for (let index = 0; index < numberOfQuestions; index++) {
            const question = await generateRandomQuestion();
            listOfQuestions.push(question);
        }
        return listOfQuestions;
    } catch (error) {
        console.log(error);
    }

}
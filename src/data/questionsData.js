const getCategoryData = async () => {
  const promise = await fetch(
    'https://raw.githubusercontent.com/alyanoyigor/image-data/master/images.json'
  );
  const json = promise.json();
  const data = await json;
  const artistsArr = data.filter((item, index) => index % 2 !== 0);
  const picturesArr = data.filter((item, index) => index % 2 === 0);
  return {
    categoryArtists: artistsArr,
    categoryPictures: picturesArr,
  };
};

const ROUNDS_AMOUNT = 12;
const getRandomInt = (max) => Math.floor(Math.random() * max);

const uniqueAuthor = (data, arr, rightAnswer, i = 0) => {
  if (i === 3) return;
  const randomNum = getRandomInt(data.length);
  const isUniqueAuthor = arr.find(
    (item) =>
      item.author === data[randomNum].author ||
      rightAnswer.author === data[randomNum].author
  );
  if (!isUniqueAuthor) {
    arr.push(data[randomNum]);
    i++;
  }
  uniqueAuthor(data, arr, rightAnswer, i);
};

const createQuestion = (answer, choices) => {
  const obj = {};
  obj.answer = answer;
  choices.forEach((choice, i) => (obj[`choice${i + 1}`] = choice));
  return obj;
};

export const createQuestions = async (category) => {
  const data = (await getCategoryData())[category];
  const splitData = splitArr(data, ROUNDS_AMOUNT);
  const questions = [];
  splitData.forEach((item) => {
    const roundQuestions = [];
    item.forEach((value) => {
      const rightAnswer = value;
      const answerChoices = [];
      uniqueAuthor(data, answerChoices, rightAnswer);
      answerChoices.push(rightAnswer);
      roundQuestions.push(createQuestion(rightAnswer, answerChoices));
    });
    questions.push(roundQuestions);
  });

  return questions;
};

const splitArr = (arr, chunks) =>
  [...Array(chunks)].map((_, num) =>
    arr.filter((pictureData, i) => i % chunks === num)
  );

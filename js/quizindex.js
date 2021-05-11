let qNumber = document.getElementById("number");
let currentQuestSet = 0;
// const container = document.querySelector(".quizContent");
const container = document.getElementById("Container");

const qtext = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitbtn = document.getElementById("btn");
const skipbtn = document.getElementById("skipbtn");
let score = 0;
let testurl = undefined;
const alloptions = document.querySelectorAll(".options");

let bodyArr;

var jsondata;

//Get the data from session storge

//Fetches the quiz data
async function getdata() {
  testurl = sessionStorage.getItem("url");
  console.log(testurl);
  const response = await fetch(
    testurl
    // "https://randomuser.me/api/?results=10"
  );
  const data = await response.json();
  return data;
}

let data = getdata();

//Loads the data
function loadQuizData(data) {
  deselectOptions();
  try {
    data.then((rsp) => {
      if (currentQuestSet < rsp.results.length) {
        //Current Question set
        element = rsp.results[currentQuestSet];
        qNumber.innerText = `${currentQuestSet + 1} of ${rsp.results.length}`;
        const question = element.question;
        const correct_answer = element.correct_answer;
        const otherOptions = element.incorrect_answers;
        const newAray = otherOptions.concat(correct_answer);
        // correctAns = correct_answer;

        // console.log(correctAns);
        newAray.sort(() => Math.random() - 0.5);
        qtext.innerHTML = question;
        a_text.innerHTML = newAray[0];
        b_text.innerHTML = newAray[1];
        c_text.innerHTML = newAray[2];
        d_text.innerHTML = newAray[3];
        submitbtn.value = "Save";
      } else {
        container.innerHTML = `<h2>
            Your final score is ${score} out of ${rsp.results.length}
          </h2>`;
        container.style.backgroundColor = "Transparent";
        container.style.textAlign = "center";
      }
    });
  } catch (error) {
    console.log(error);
  }
}

//Saves the result
submitbtn.addEventListener("click", () => {
  alloptions.forEach((eachAnswer) => {
    if (eachAnswer.checked) {
      // console.log(`radio id ${eachAnswer.id}`);
      submittedAns = document.querySelector(`.${eachAnswer.id}`).innerHTML;

      //matches the option entered with the correct result
      data.then(function (resultdrive) {
        cAns = resultdrive.results[currentQuestSet - 1].correct_answer;

        if (submittedAns === cAns) {
          score++;
        }
      });

      currentQuestSet++;
      loadQuizData(data);
    }
  });
});

// Skips the current question
skipbtn.addEventListener("click", () => {
  currentQuestSet++;
  loadQuizData(data);
  skipbtn.style.border = "none";
  getCorrectAnsforSelectedquest();
});

//Loads the first question
loadQuizData(data);

getCorrectAnsforSelectedquest();

function getCorrectAnsforSelectedquest() {
  data.then(function (resultdrive) {
    console.log(`c uest ${currentQuestSet}`);
    console.log(resultdrive.results[currentQuestSet].correct_answer);
  });
}

//DeSelects the option selected for previous question ,if any
function deselectOptions() {
  alloptions.forEach((option) => {
    if (option.checked) {
      option.checked = false;
    }
  });
}

window.onload = function () {
  document.getElementById("loading").style.display = "none";
};

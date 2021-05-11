const alltopics = document.querySelectorAll(".topics");
const startbtn = document.getElementById("btn");
let testurl = undefined;

function getSelectedtopics() {
  alltopics.forEach((topic) => {
    if (topic.checked) {
      console.log(topic.id);
      testurl = `https://opentdb.com/api.php?amount=10&category=${topic.id}`;
      sessionStorage.setItem("url", testurl);
    }
  });
}

startbtn.addEventListener("click", () => {
  getSelectedtopics();
  location.href = "quizindex.html";
});

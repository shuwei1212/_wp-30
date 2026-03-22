function getAverage(student) {
  let sum = 0;

  for (let i = 0; i < student.scores.length; i++) {
    sum += student.scores[i];
  }

  return sum / student.scores.length;
}

let student = {
  name: "小美",
  scores: [80, 90, 100]
};

console.log(getAverage(student));
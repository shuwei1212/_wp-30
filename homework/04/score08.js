let obj = {
  name: "小華",
  age: 25
};

let jsonStr = JSON.stringify(obj);
console.log(jsonStr);

let newObj = JSON.parse(jsonStr);
console.log(newObj.name);
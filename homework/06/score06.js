function myFilter(arr, callback) {
    let result = [];

    for (let item of arr) {
        if (callback(item)) {
            result.push(item);
        }
    }

    return result;
}

const numbers = [1, 5, 8, 12];

const filtered = myFilter(numbers, n => n > 7);

console.log(filtered);
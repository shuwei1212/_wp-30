const contents = [
    "Very long content here",
    "Another Very long content here",
    "3rd Very long content here"
];

contents.forEach(item => {
    console.log(item.substring(0, 10) + "...");
});
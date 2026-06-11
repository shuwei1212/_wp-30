function checkAdmin(role, callback) {

    if (role !== "admin") {
        callback("Access Denied");
    } else {
        callback(null, "Welcome");
    }

}

// 失敗案例
checkAdmin("user", (err, message) => {

    if (err) {
        console.log(err);
    } else {
        console.log(message);
    }

});

// 成功案例
checkAdmin("admin", (err, message) => {

    if (err) {
        console.log(err);
    } else {
        console.log(message);
    }

});
const path = require("path");
const fs = require("fs-extra");
const usersFilePath = path.resolve(__dirname,"../data/users.json");

//ToDo: Implement UserRepository methods
class UserRepository {

    async login(email, password) {
        const users = await this.getUsers();
        const loginUser = users.find(u => u.email == email && u.password == password);
        if (loginUser)
            return loginUser;
        else
            throw "Login failed. Email and/or password are invalid";
    }

    async getUsers(role) {
        let users = await fs.readJson(usersFilePath);
        if (role) {
            users = users.filter(u => u.role === role)
        }

        return users;
    }

    async addUser(user) {
        const users = await this.getUsers();
        user._id = users.length + 1;
        users.push(user);
        await this.saveUsers(users);
        return user;
    }

    // ToDo: Implement updateUser
    async updateUser(userId, user) {
    }

    async getUser(userId) {
        const users = await this.getUsers();
        return users.find(u => u._id == userId);
    }

    async saveUsers(users) {
        await fs.writeJSON(usersFilePath, users);
    }

    //ToDo: Load the users into the database if the
    // users collection is empty.
    initDb() {

    }
}

module.exports = new UserRepository();
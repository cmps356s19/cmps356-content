const userRepo = require('../repositories/UserRepository');

class UserService {
    async getCustomers(req, res) {
        try {
            const users = await userRepo.getUsers("Customer");
            res.status(200).json(users);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    async getUser(req, res) {
        try {
            const user = await userRepo.getUser(req.params.id);
            res.status(200).json(user);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    async addUser(req, res) {
        try {
            const user = await userRepo.addUser(req.body);
            res.status(201).json(user);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    async updateUser(req, res) {
        try {
            const userId = req.params.id;
            await userRepo.updateUser(userId, req.body);
            res.status(200).json("User updated.");
        } catch (err) {
            res.status(500).send(err);
        }
    }

    async login(req, res) {
        try {
            const user = await userRepo.login(req.query.email, req.query.password);
            res.status(200).json(user);
        } catch (err) {
            res.status(500).send(err);
        }
    }
}

module.exports = new UserService();
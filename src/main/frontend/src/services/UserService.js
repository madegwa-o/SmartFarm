import axios from 'axios';

class UserService {
    constructor() {
        this.apiBaseUrl = "http://localhost:8080/user";  // Set this to your backend's base URL
    }

    // Get all users
    getAllUsers() {
        return axios.get(`${this.apiBaseUrl}/get-all-users`);
    }

    // Get a user by ID
    getUserById(userId) {
        return axios.get(`${this.apiBaseUrl}/${userId}`);
    }

    getUserByRole(role) {
        return axios.get(`${this.apiBaseUrl}/role/${role}`)
    }

    // Create a new user
    createUser(user) {
        return axios.post(`${this.apiBaseUrl}/create`, user);
    }

    // Update an existing user
    updateUser(userId, user) {
        return axios.put(`${this.apiBaseUrl}/update/${userId}`, user);
    }

    // Delete a user by ID
    deleteUser(userId) {
        return axios.delete(`${this.apiBaseUrl}/delete/${userId}`);
    }
}

export default new UserService();

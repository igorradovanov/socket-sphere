/**
 * Represents a User.
 */
class User {
    /**
     * Creates an instance of User.
     * @param {string} id - The user's ID.
     * @param {string} name - The user's name.
     * @param {string} room - The room the user is in.
     */
    constructor(id, name, room) {
        this.id = id;
        this.name = name;
        this.room = room;
    }

    /**
     * Represents the state of users.
     * @type {Object}
     * @property {Array} users - The array of users.
     * @property {Function} setUsers - Sets the users array.
     */
    userState = {
        users: [],
        setUsers: function (newUsersArray) {
            this.users = newUsersArray;
        },
    };

    /**
     * Activates the user by adding them to the users array.
     */
    activateUser() {
        const user = {
            id: this.id,
            name: this.name,
            room: this.room
        }
        this.userState.setUsers([...this.userState.users.filter(user => user.id !== this.id), user])
    }

    /**
     * Deactivates the user by removing them from the users array.
     */
    deactivateUser() {
        this.userState.setUsers(this.userState.users.filter(user => user.id !== this.id))
    }

    /**
     * Gets a user by their ID.
     * @returns {Object} - The user object.
     */
    getUser() {
        return this.userState.users.find(user => user.id === this.id)
    }

    /**
     * Gets all users in a specific room.
     * @param {string} room - The room to filter users by.
     * @returns {Array} - An array of users in the specified room.
     */
    getUsersInRoom(room) {
        return this.userState.users.filter(user => user.room === room)
    }

    /**
     * Gets all active rooms.
     * @returns {Array} - An array of all active rooms.
     */
    getAllActiveRooms() {
        return Array.from(new Set(this.userState.users.map(user => user.room)))
    }
}

export { User };
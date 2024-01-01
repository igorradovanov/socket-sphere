"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
/**
 * Represents a User.
 */
var User = /** @class */ (function () {
    /**
     * Creates an instance of User.
     * @param {string} id - The user's ID.
     * @param {string} name - The user's name.
     * @param {string} room - The room the user is in.
     */
    function User(id, name, room, userState) {
        this.id = id;
        this.name = name;
        this.room = room;
        this.userState = userState;
    }
    /**
     * Activates the user by adding them to the users array.
     */
    User.prototype.activateUser = function () {
        var _this = this;
        var user = {
            id: this.id,
            name: this.name,
            room: this.room
        };
        this.userState.setUsers(__spreadArray(__spreadArray([], this.userState.users.filter(function (user) { return user.id !== _this.id; }), true), [user], false));
        console.log(this.userState.users);
    };
    /**
     * Deactivates the user by removing them from the users array.
     */
    User.prototype.deactivateUser = function () {
        var _this = this;
        this.userState.setUsers(this.userState.users.filter(function (user) { return user.id !== _this.id; }));
    };
    /**
     * Gets a user by their ID.
     * @returns {Object} - The user object.
     */
    User.prototype.getUser = function () {
        var _this = this;
        return this.userState.users.find(function (user) { return user.id === _this.id; });
    };
    /**
     * Gets all users in a specific room.
     * @param {string} room - The room to filter users by.
     * @returns {Array} - An array of users in the specified room.
     */
    User.prototype.getUsersInRoom = function (room) {
        return this.userState.users.filter(function (user) { return user.room === room; });
    };
    /**
     * Gets all active rooms.
     * @returns {Array} - An array of all active rooms.
     */
    User.prototype.getAllActiveRooms = function () {
        return Array.from(new Set(this.userState.users.map(function (user) { return user.room; })));
    };
    return User;
}());
exports.User = User;

const fs = require('fs');

module.exports = class Users {
    constructor(struct) {
        this.conf = struct.conf;
    }
    getUsers() {
        let response;
        switch (this.conf.users.type) {
            case 'file':
                response = this.getUsersFromFile(this.conf.users.path, 'utf8');
                break;
            default:
                break;
        }
        return response;
    }
    updateUsers(usersData) {
        let response;
        switch (this.conf.users.type) {
            case 'file':
                response = this.updateUsersFile(this.conf.users.path, usersData);
                break;
            default:
                break;
        }
        return response;
    }
    getUsersFromFile(path, charset) {
        return JSON.parse(fs.readFileSync(path, charset));
    }
    updateUsersFile(path, usersData) {
        usersData = JSON.stringify(usersData);
        fs.writeFileSync(path, usersData);
        return usersData;
    }
}
const db = require("../database/connect");

class User {
	constructor({ user_id, username, password, email }) {
		this.id = user_id;
		this.username = username;
		this.password = password;
		this.email = email;

	}

	static async getOneById(id) {
		const response = await db.query("SELECT * FROM users WHERE user_id = $1", [id]);
		if (response.rows.length != 1) {
			throw new Error("Unable to locate user.");
		}
		return new User(response.rows[0]);
	}

	static async getOneByUsername(username) {
		const response = await db.query("SELECT * FROM users WHERE username = $1", [username]);
        console.log(response.rows)
		if (response.rows.length != 1) {
			throw new Error("Unable to locate user.");
		}
		return new User(response.rows[0]);
	}

	static async getOneByToken(token) {
		const responseToken = await db.query("SELECT user_id FROM token WHERE token = $1", [token]);
		if (responseToken.rows.length != 1) {
			throw new Error("Unable to locate user.");
		}
		const user = await User.getOneById(responseToken.rows[0].user_id);
		return user;
	}

	static async create(data) {
		const { username, password, email } = data;
		const response = await db.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING user_id;", [username, email, password]);
	
		const newUser = new User(response.rows[0])
		
		return newUser;
	}
}

module.exports = User;
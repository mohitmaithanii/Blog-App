import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
	client = new Client();
	account;

	constructor() {
		// set the endpoint and project ID for the client
		this.client
			.setEndpoint(conf.appwriteUrl)
			.setProject(conf.appwriteProjectId);

		// create a new Appwrite account instance using the client
		this.account = new Account(this.client);
	}

	// Create new account
	async createAccount({ email, password, name }) {
		try {
			const userAccount = await this.account.create(
				ID.unique(), // generate a unique ID for the user
				email,
				password,
				name
			);

			if (userAccount) {
				// if the user account was created successfully
				return this.login({ email, password });
			} else {
				return userAccount;
			}
		} catch (error) {
			console.log("Appwrite service :: createAccount :: error", error);
		}
	}

	// Login account
	async login({ email, password }) {
		try {
			return await this.account.createEmailSession(email, password);
		} catch (error) {
			console.log("Appwrite service :: login :: error", error);
		}
	}

	// Get current user
	async getCurrentUser() {
		try {
			return await this.account.get();
		} catch (error) {
			console.log("Appwrite service :: getCurrentUser :: error", error);
		}

		return null;
	}

	// Logout
	async logout() {
		try {
			await this.account.deleteSessions();
		} catch (error) {
			console.log("Appwrite service :: logout :: error", error);
		}
	}
}

const authService = new AuthService();

export default authService;

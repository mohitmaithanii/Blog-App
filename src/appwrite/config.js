import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
	// Initialize a new Appwrite client
	client = new Client();
	databases;
	bucket;

	constructor() {
		// Set the Appwrite endpoint and project ID
		this.client
			.setEndpoint(conf.appwriteUrl)
			.setProject(conf.appwriteProjectId);

		// Set the Appwrite endpoint and project ID
		this.databases = new Databases(this.client);
		this.bucket = new Storage(this.client);
	}

	// Create a new post in the database
	async createPost({ title, slug, content, featuredImage, status, userId }) {
		try {
			return await this.databases.createDocument(
				conf.appwriteDatabaseId, // the ID of the database
				conf.appwriteCollectionId, // the ID of the collection
				slug, // the ID of the new document
				{
					title,
					content,
					featuredImage,
					status,
					userId,
				}
			);
		} catch (error) {
			console.log("Appwrite service :: createPost :: error", error);
		}
	}

	// Update an existing post in the database
	async updatePost(slug, { title, content, featuredImage, status }) {
		try {
			return await this.databases.updateDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				slug,
				{
					title,
					content,
					featuredImage,
					status,
				}
			);
		} catch (error) {
			console.log("Appwrite service :: updatePost :: error", error);
		}
	}

	// Delete a post from the database
	async deletePost(slug) {
		try {
			await this.databases.deleteDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				slug
			);
			return true;
		} catch (error) {
			console.log("Appwrite service :: deletePost :: error", error);
			return false;
		}
	}

	// Get a single post from the database
	async getPost(slug) {
		try {
			return await this.databases.getDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				slug
			);
		} catch (error) {
			console.log("Appwrite service :: getPost :: error", error);
			return false;
		}
	}

	// Get multiple posts from the database
	async getPosts(queries = [Query.equal("status", "active")]) {
		try {
			return await this.databases.listDocuments(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				queries
			);
		} catch (error) {
			console.log("Appwrite service :: getPosts :: error", error);
			return false;
		}
	}

	// Upload a file to the bucket
	async uploadFile(file) {
		try {
			return await this.bucket.createFile(
				conf.appwriteBucketId, // the ID of the bucket
				ID.unique(), // a unique ID for the file
				file // the file to upload
			);
		} catch (error) {
			console.log("Appwrite service :: uploadFile :: error", error);
			return false;
		}
	}

	// Delete a file from the bucket
	async deleteFile(fileId) {
		try {
			await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
			return true;
		} catch (error) {
			console.log("Appwrite service :: deleteFile :: error", error);
			return false;
		}
	}

	// Get a preview of a file in the bucket
	getFilePreview(fileId) {
		return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
	}
}

const service = new Service();
export default service;

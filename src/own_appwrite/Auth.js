import { Account, Client, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name, confirmPassword }) {
    try {
      const userInfo = await this.account.create(
        ID.unique(),
        email,
        password,
        name,
        confirmPassword
      );
      if (userInfo) {
        return this.login({ email, password });
      } else {
        return userInfo;
      }
    } catch (error) {
      console.log("error in createAccount!", error);
      throw error;
    }
  }
  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      console.log("error in login");
      throw error;
    }
  }
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("error in get current user");
      throw error;
    }
    return null;
  }
  async logOut() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log(error);
    }
  }

  async updateNamee(data) {
    try {
      return await this.account.updateName(data.name);
    } catch (error) {
      console.log("error in update user name", error);
    }
  }
 
}

const authService = new AuthService();
export default authService;

import { Client, Databases, ID, Query, Storage } from "appwrite";
import conf from "../conf/conf";

export class ConfigService {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.storage = new Storage(this.client);
    this.databases = new Databases(this.client);
  }

  async createPost({
    slug,
    imageId,
    title,
    content,
    status,
    userId,
    author,
    date,
    likes = 0,
    userLiked,
    email,
  }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          imageId,
          title,
          content,
          status,
          userId,
          author,
          date,
          likes,
          userLiked,
          email,
        }
      );
    } catch (error) {
      console.log("Appwrite serive :: createPost :: error", error);
      return false;
    }
  }
  async updatePost(slug, { title, content, featuredImage, status, author, email }) {
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
          author,
          email,
        }
      );
    } catch (error) {
      console.log("Appwrite serive :: updatePost :: error", error);
    }
  }

  async deletePostAndLikes(postId){
    try {
      // Fetch all likes associated with the post
      const likesResponse = await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteLikesCollectionId, [
        Query.equal('postId', postId)
      ]);
  
      // Delete each like
      const deleteLikePromises = likesResponse.documents.map(like => 
        this.databases.deleteDocument(conf.appwriteDatabaseId, 
          conf.appwriteLikesCollectionId, like.$id)
      );
      await Promise.all(deleteLikePromises);
  
      // Delete the post
      await this.databases.deleteDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId, postId); 
  
      console.log('Post and associated likes deleted successfully');
    } catch (error) {
      console.error('Error deleting post and likes:', error);
    }
  }; 

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite serive :: getPost :: error", error);
      return false;
    }
  }

  async getPosts(queries = []) {
    try {
      // Default query to fetch active posts
      const defaultQuery = Query.equal('status', 'active');

      // Combine default query with additional queries
      const allQueries = [defaultQuery, ...queries];

      // Fetch documents from the collection using combined queries
      const response = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        allQueries
      );
      return response
      
      // return response.documents;
    } catch (error) {
      console.error('Appwrite service :: getPosts :: error', error);
      return false;
    }
  }

  async createLike(likeId, userId, postId, userLiked) {
    try {
      const likeExists = await this.getLikesByUserAndPost(userId, postId);
      if (likeExists) {
        return;
      } else {
        this.databases.createDocument(
          conf.appwriteDatabaseId,
          conf.appwriteLikesCollectionId,
          likeId,
          {
            userId,
            postId,
            likeId,
            userLiked,
          }
        );
      }
    } catch (error) {
      console.log("Appwrite serive :: createLikes :: error  ", error);
    }
  }

  async getLikesByUserAndPost(userId, postId) {
    try {
      const query = [
        Query.equal("userId", userId),
        Query.equal("postId", postId),
      ];
      const result = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteLikesCollectionId,
        query
      );

      if (result.documents.length > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log("Appwrite serive :: getLikesByUserAndPost:: error  ", error);
    }
  }

  async displayLikes(postId) {
    try {
      const query = Query.equal("postId", postId);

      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteLikesCollectionId,
        query
      );
    } catch (error) {
      console.log("Appwrite serive :: displayLikes:: error  ", error);
    }
  }

  async deleteLike(likeId) {
    try {
      return await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteLikesCollectionId,
        likeId
      );
    } catch (error) {
      console.log("Appwrite serive :: deleteLike:: error  ", error);
    }
  }

  async updateLike(postId, newLikes) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        postId,
        {
          likes: newLikes,
        }
      );
    } catch (error) {
      console.log("Appwrite serive :: UpdateLike:: error  ", error);
    }
  }
  async updateLikedUsers(postId, users) {
    try {
      // Fetch the existing document first
      const document = await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        postId
      );

      // Initialize with empty array if not present
      const existingLikedUsers = document.userLiked || [];

      // Combine existing and new users
      const updatedLikedUsers = [...existingLikedUsers, users];
      console.log("updatedLikedUsers", updatedLikedUsers);

      // Update the document with the new list of liked users
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        postId,
        {
          userLiked: updatedLikedUsers,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updateLikedUsers:: error ", error);
    }
  }

  async deleteLikedUser(postId, user) {
    try {
      const document = await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        postId
      );
      const userLiked = document.userLiked;
      const filterUnlikeUser = userLiked.filter((like) => like !== user)

      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        postId,
        {
          userLiked: filterUnlikeUser,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: deleteLikedUser:: error ", error);
    }
  }



  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite serive :: uploadFile :: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deleteFile :: error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    try {
      return this.storage.getFilePreview(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.log("Appwrite serive :: previewFile :: error", error);
    }
  }
}

const configService = new ConfigService();
export default configService;

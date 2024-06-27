const conf = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
  appwriteProfileBucketId: String(import.meta.env.VITE_APPWRITE_PROFILEBUCKET_ID),
  appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  appwriteLikesCollectionId: String(
    import.meta.env.VITE_APPWRITE_LIKESCOLLECTION_ID
  ),
};

export default conf;

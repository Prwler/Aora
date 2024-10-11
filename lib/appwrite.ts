import { UnknownOutputParams } from "expo-router";
import { Client, Account, ID, Avatars, Databases, Query } from "react-native-appwrite";
export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.reactnative.aora",
  projectId: "66cdb1b7003d5bcafb0d",
  databaseId: "66cdb5bc001e30370d0e",
  userCollectionId: "66cdb5f60017a637703c",
  videoCollectionId: "66cdb659001a0ee6ae67",
  storageId: "66cdbcde0003da7b8a5c",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform)
;

// Register User
const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
export const createUser = async (email: string, password: string, username: string | undefined) => {
   try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    )
    if(!newAccount) throw Error;
    const avatarUrl = avatars.getInitials(username)
    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl
      }
    )
    return newUser;
   } catch (error: any) {
    throw new Error(error);
   }
}

export async function signIn(email: string, password: string) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error: any) {
    throw new Error(error);
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if(!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    )
    if(!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
}

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId
    )
    return posts.documents;
  } catch (error: any) {
    throw new Error(error);
  }
}

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );
    return posts.documents;
  } catch (error: any) {
    throw new Error(error);
  }
}

// export const searchPosts = async (query: any) => {
//   try {
//     const posts = await databases.listDocuments(
//       config.databaseId,
//       config.videoCollectionId,
//       [Query.search('title', query)]
//     );
//     return posts.documents;
//   } catch (error: any) {
//     throw new Error(error);
//   }
// };
export const searchPosts = async (searchTerm: string) => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.search("title", searchTerm)]
    );
     //console.log("Search response:", posts);
     if (posts.documents.length === 0) {
       console.log("No documents found matching the search term");
     }
    return posts.documents;
  } catch (error: any) {
    console.error("Error in searchPosts:", error);
    if (error.message.includes("requires a fulltext index")) {
      console.warn(
        "Fulltext index not set up for 'title'. Returning empty results."
      );
      return [];
    }
    throw error; // Re-throw other errors
  }
};
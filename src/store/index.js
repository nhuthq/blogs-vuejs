import { createStore } from 'vuex';
import {
  firestoreDB,
  firebaseAuth,
  doc,
  getDoc,
  getDocs,
  deleteDoc,
  collection,
} from '@/services/firebase/firebaseInit.js';

export const store = createStore({
  state: {
    blogPosts: [],
    samplePostCards: [
      {
        id: '1',
        title: 'Sample Post 1',
        content: 'Sample content 1',
        coverPhoto: 'codingnight',
        coverPhotoName: 'codingnight',
        isPublished: true,
        createdDate: '2025-07-04',
        lastEditedDate: '2025-07-04',
        author: {
          id: '1',
          name: 'John Doe',
          email: 'john.doe@example.com',
          age: 30,
        },
      },
      {
        id: '2',
        title: 'Sample Post 2',
        content: 'Sample content 2',
        coverPhoto: 'photographer',
        coverPhotoName: 'photographer',
        isPublished: true,
        createdDate: '2025-07-04',
        lastEditedDate: '2025-07-04',
        author: {
          id: '1',
          name: 'John Doe',
          email: 'john.doe@example.com',
          age: 30,
        },
      },
      {
        id: '3',
        title: 'Sample Post 3',
        content: 'Sample content 3',
        coverPhoto: 'phuquoc',
        coverPhotoName: 'phuquoc',
        isPublished: true,
        createdDate: '2025-07-04',
        lastEditedDate: '2025-07-04',
        author: {
          id: '1',
          name: 'John Doe',
          email: 'john.doe@example.com',
          age: 30,
        },
      },
      {
        id: '4',
        title: 'Sample Post 4',
        content: 'Sample content 4',
        coverPhoto: 'nhatrang',
        coverPhotoName: 'nhatrang',
        isPublished: true,
        createdDate: '2025-07-04',
        lastEditedDate: '2025-07-04',
        author: {
          id: '1',
          name: 'John Doe',
          email: 'john.doe@example.com',
          age: 30,
        },
      },
      {
        id: '5',
        title: 'Sample Post 5',
        content: 'Sample content 5',
        coverPhoto: 'hoian',
        coverPhotoName: 'hoian',
        isPublished: true,
        createdDate: '2025-07-04',
        lastEditedDate: '2025-07-04',
        author: {
          id: '1',
          name: 'John Doe',
          email: 'john.doe@example.com',
          age: 30,
        },
      },
      {
        id: '6',
        title: 'Sample Post 6',
        content: 'Sample content 6',
        coverPhoto: 'danang',
        coverPhotoName: 'danang',
        isPublished: true,
        createdDate: '2025-07-04',
        lastEditedDate: '2025-07-04',
        author: {
          id: '1',
          name: 'John Doe',
          email: 'john.doe@example.com',
          age: 30,
        },
      },
    ],
    postLoaded: null,

    user: null,
    editMode: null,
    profileId: null,
    profileAdmin: null,
    profileEmail: null,
    profileLastName: null,
    profileUserName: null,
    profileInitials: null,
    profileFirstName: null,

    blogTitle: '',
    blogHTMLContent: '',
    blogCoverPhotoName: '',

    blogPhotoPreview: false,
    blogCoverPhotoURL: null,
  },
  getters: {
    featureBlogs(state) {
      return state.blogPosts.slice(0, 2);
    },
    featureBlogsCard(state) {
      return state.blogPosts.slice(2, 10);
    },
  },
  mutations: {
    toggleEditPost(state, payload) {
      state.editPost = payload;
    },
    updateUser(state, payload) {
      state.user = payload;
    },
    setUserProfile(state, payload) {
      state.profileId = payload.id;
      state.profileEmail = payload.email;
      state.profileLastName = payload.lastName;
      state.profileUserName = payload.userName;
      state.profileFirstName = payload.firstName;
      state.profileAdmin = payload.isAdmin ?? false;
    },
    setProfileInitials(state) {
      state.profileInitials =
        state.profileFirstName.match(/(\b\S)?/g).join('') +
        state.profileLastName.match(/(\b\S)?/g).join('');
    },
    changeEmail(state, payload) {
      state.profileEmail = payload;
    },
    changeFirstName(state, payload) {
      state.profileFirstName = payload;
    },
    changeLastName(state, payload) {
      state.profileLastName = payload;
    },
    changeUserName(state, payload) {
      state.profileUserName = payload;
    },
    updateBlogTitle(state, payload) {
      state.blogTitle = payload;
    },
    updateBlogPhotoPreview(state, payload) {
      state.blogPhotoPreview = payload;
    },
    updateBlogHTMLContent(state, payload) {
      state.blogHTMLContent = payload;
    },
    updateBlogCoverPhotoURL(state, payload) {
      state.blogCoverPhotoURL = payload;
    },
    updateBlogCoverPhotoName(state, payload) {
      state.blogCoverPhotoName = payload;
    },
  },
  actions: {
    async getCurrentUser({ commit }) {
      const docRef = doc(firestoreDB, 'users', firebaseAuth.currentUser.uid);
      await getDoc(docRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();
            userData.id = firebaseAuth.currentUser.uid;
            commit('setUserProfile', userData);
            commit('setProfileInitials');
          } else {
            console.log('No such document!');
          }
        })
        .catch((error) => {
          console.log('Error getting document:', error);
        });
    },
    async getPosts({ state }) {
      const blogsSnapshot = await getDocs(collection(firestoreDB, 'blogs'));
      blogsSnapshot.forEach((doc) => {
        if (!state.blogPosts.some((post) => post.blogId === doc.id)) {
          const docData = doc.data();
          const data = {
            id: docData.blogId,
            title: docData.blogTitle,
            htmlContent: docData.blogHTML,
            coverPhoto: docData.blogCoverPhoto,
            coverPhotoName: docData.blogCoverPhotoName,
            authorID: docData.profileId,
            isPublished: docData.isPublished,
            createdDate: docData.createdDate,
            lastEditedDate: docData.lastEditedDate,
          };
          state.blogPosts.push(data);
        }
      });
      state.postLoaded = true;
    },
  },
  getters: {},
  modules: {},
});

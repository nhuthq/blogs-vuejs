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
    blogsFetched: null,

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
    blogCoverPhotoURL: null,
    blogPhotoPreview: false,
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
    toggleEditMode(state, payload) {
      state.editMode = payload;
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
    setBlogState(state, payload) {
      state.blogTitle = payload.title;
      state.blogHTMLContent = payload.htmlContent;
      state.blogCoverPhotoURL = payload.coverPhotoURL;
      state.blogCoverPhotoName = payload.coverPhotoName;
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
    filterBlog(state, payload) {
      state.blogPosts = state.blogPosts.filter(
        (post) => post.blogId !== payload
      );
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
    async getBlogs({ state }) {
      const blogsSnapshot = await getDocs(collection(firestoreDB, 'blogs'));
      blogsSnapshot.forEach((doc) => {
        if (!state.blogPosts.some((post) => post.blogId === doc.id)) {
          const docData = doc.data();
          const data = {
            id: docData.id,
            title: docData.title,
            shortDescription: docData.shortDescription,
            htmlContent: docData.htmlContent,
            coverPhotoURL: docData.coverPhotoURL,
            coverPhotoName: docData.coverPhotoName,
            authorID: docData.authorID,
            isPublished: docData.isPublished,
            createdDate: docData.createdDate,
            lastEditedDate: docData.lastEditedDate,
          };
          state.blogPosts.push(data);
        }
      });
      state.blogsFetched = true;
    },
    async updateBlog({ commit, dispatch }, payload) {
      commit('filterBlog', payload);
      await dispatch('getBlogs');
    },
    async deletePost({ commit }, payload) {
      await deleteDoc(doc(firestoreDB, 'blogs', payload)).then(() => {
        commit('filterBlog', payload);
      });
    },
  },

  modules: {},
});

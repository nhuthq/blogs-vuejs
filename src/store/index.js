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
    user: null,
    editMode: null,
    profileId: null,
    profileAdmin: null,
    profileEmail: null,
    profileLastName: null,
    profileUserName: null,
    profileInitials: null,
    profileFirstName: null,
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
  },
  actions: {
    async getCurrentUser({ commit }) {
      const docRef = doc(firestoreDB, 'users', firebaseAuth.currentUser.uid);
      await getDoc(docRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();

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
  },
  getters: {},
  modules: {},
});

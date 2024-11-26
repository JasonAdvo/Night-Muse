// src/store.js
import { createStore } from 'vuex';

const store = createStore({
	state: {
		isLadiesProfile: false, // Keeps track of whether we're on a lady's profile
		menuIcon: '/images/Menu.webp', // Default menu icon
		backImage: '/images/Back.svg', // Back icon for ladies profile
		isPopupVisible: true
	},
	mutations: {
		// Toggle the state of isLadiesProfile and update the menuIcon accordingly
		setButtonState(state) {
			state.isLadiesProfile = !state.isLadiesProfile;
			state.menuIcon = state.isLadiesProfile ? state.backImage : '/images/Menu.webp';
		},
		// Set the state for LadiesProfile and update the menu icon accordingly
		setLadiesProfile(state, value) {
			state.isLadiesProfile = value;
			state.menuIcon = value ? state.backImage : '/images/Menu.webp'; // Set the icon to back if profile is true
		},
		setPopUpState(state) {
			state.isPopupVisible = false;
		}
	},
	actions: {
		// Action to change button state
		changeButtonState({ commit }) {
			commit('setButtonState');
		},
		// Action to set LadiesProfile state
		setLadiesProfile({ commit }, value) {
			commit('setLadiesProfile', value);
		},
		changePopUpState({ commit }) {
			commit('setPopUpState')
		}
	},
	getters: {
		currentButtonState(state) {
			return state.isLadiesProfile;
		},
		currentMenuIcon(state) {
			return state.menuIcon;
		},
		currentPopUpState(state) {
			return state.isPopupVisible;
		}
	},
});

export default store;

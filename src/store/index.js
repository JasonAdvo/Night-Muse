// src/store.js
import { createStore } from 'vuex';

const store = createStore({
	state: {
		isLadiesProfile: JSON.parse(localStorage.getItem('isLadiesProfile')) || false, // Keeps track of whether we're on a lady's profile
		menuIcon: localStorage.getItem('menuIcon') || '/images/Menu.webp', // Default menu icon
		backImage: '/images/Back.svg', // Back icon for ladies profile
		isPopupVisible: true,
		isAdsVisible: true
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
			localStorage.setItem('isLadiesProfile', JSON.stringify(value));
			state.menuIcon = value ? state.backImage : '/images/Menu.webp'; // Set the icon to back if profile is true
			localStorage.setItem('menuIcon', state.menuIcon);
		},
		setPopUpState(state) {
			state.isPopupVisible = false;
		},
		setAdsState(state) {
			state.isAdsVisible = false;
		}
	},
	actions: {
		// Action to change button state
		setButtonState({ commit }) {
			commit('setButtonState');
		},
		// Action to set LadiesProfile state
		setLadiesProfile({ commit }, value) {
			commit('setLadiesProfile', value);
		},
		changePopUpState({ commit }) {
			commit('setPopUpState')
		},
		changeAdsState({ commit }) {
			commit('setAdsState')
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
		},
		currentAdsState(state) {
			return state.isAdsVisible;
		}
	},
});

export default store;

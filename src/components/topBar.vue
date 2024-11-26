<template>
	<div class="Topbar flex flex-between align-center px-1 bg-394264">
		<!-- Sidebar -->
		<div id="mySidenav" class="bg-1E233A" :class="['sidenav', { open: isOpen }]">
			<div class="px-2">
				<div class="flex gap-10 mb-1">
					<img src="/images/Logo.svg" alt="Logo">
					<img src="/images/Logo_Text.svg" alt="Logo Title">
				</div>
				<router-link to="/" class="bb-1-sidebar bt-1-sidebar">
					{{ $t('Side_Menu.Main') }}
				</router-link>
				<router-link to="/ladiesPage" class="bb-1-sidebar">
					{{ $t('Side_Menu.Ladies') }}
				</router-link>
				<a href="https://t.me/nightmus3" class="bb-1-sidebar">
					{{ $t('Side_Menu.Contact') }}
				</a>
			</div>
		</div>

		<!-- Overlay -->
		<div class="overlay" v-if="isOpen" @click="toggleNav"></div>

		<!-- Open Button -->
		<span class="flex flex-center align-center" style="font-size: 30px; cursor: pointer; width: 40px;"
			@click="toggleNav">
			<img style="width: 30px; height: 30px;" :src="menuIcon" alt="Menu Icon">
		</span>

		<!-- Page Title -->
		<div class="Page_Title mx-auto">
			<span class="color-white fs-24 fw-800">
				<!-- Dynamically change the title based on the current route -->
				{{ currentPageTitle }}
			</span>
		</div>

		<!-- Language Button -->
		<div class="language-dropdown" style="width: 40px;">
			<!-- <select class="fs-16 fw-600 background-white" @change="handleLanguageChange" v-model="selectedLanguage">
				<option value="en">English</option>
				<option value="zh">中文</option>
			</select> -->
		</div>

	</div>
</template>

<script>
import { switchLanguage } from '@/i18n';
import LadiesList from '/src/assets/Ladies/Ladies.json';
import { mapState, mapActions } from 'vuex';

export default {
	data() {
		return {
			isOpen: false, // Tracks sidebar state
			// menuImage: '/images/Menu.webp', // Default menu icon
			// backImage: '/images/Back.svg', // Back icon for closing
			// menuIcon: '/images/Menu.webp', // Current icon state
			selectedLanguage: this.$i18n.locale,
			Ladies: LadiesList,
		};
	},
	computed: {
		// Dynamically compute the page title based on the route
		currentPageTitle() {
			if (this.$i18n.locale === 'zh') {
				if (this.$route.name === 'Home') {
					return this.$t('Side_Menu.Main');
				} else if (this.$route.name === 'LadiesPage') {
					return this.$t('Side_Menu.Ladies');
				} else if (this.$route.name === 'ladiesProfile') {
					const ladyId = this.$route.params.id;
					const lady = this.Ladies[ladyId];
					return lady ? lady.name[this.$i18n.locale] : '';
				}
			} else {
				if (this.$route.name === 'Home_en') {
					return this.$t('Side_Menu.Main');
				} else if (this.$route.name === 'LadiesPage_en') {
					return this.$t('Side_Menu.Ladies');
				} else if (this.$route.name === 'ladiesProfile_en') {
					const ladyId = this.$route.params.id;
					const lady = this.Ladies[ladyId];
					return lady ? lady.name[this.$i18n.locale] : '';
				}
			}
			return '';
		},
		...mapState({
			isLadiesProfile: state => state.isLadiesProfile,
			menuIcon: state => state.menuIcon, // Bind the menuIcon to Vuex
		}),
		// Dynamically update the menu icon based on the profile state
		computedMenuIcon() {
			return this.isLadiesProfile ? this.backImage : this.menuImage;
		}

	},
	methods: {
		...mapActions({
			setLadiesProfile: 'setLadiesProfile',
		}),
		// Toggles sidebar visibility
		toggleNav() {
			if (this.isLadiesProfile) {
				// If on a lady's profile, navigate back to the ladiesPage
				this.setLadiesProfile(false); // Reset the profile state to false

				// Make sure the icon is updated
				this.$router.push({ name: 'LadiesPage' });
			} else {
				// Sidebar toggle behavior
				this.isOpen = !this.isOpen;
			}
		},
		handleLanguageChange(event) {
			const lang = event.target.value; // Get selected language code
			this.changeLanguage(lang); // Call the provided changeLanguage method
		},
		changeLanguage(lang) {
			const currentRoute = this.$router.currentRoute.value;
			let newPath = currentRoute.path;

			console.log('Current Path:', newPath);  // Debugging the current path

			// If the current path is the root '/', switch to '/en' if language is English, or to '/' for Chinese
			if (newPath === '/') {
				// If at root path and switching to English, set the path to '/en'
				newPath = lang === 'en' ? '/en' : '/';
			} else if (lang === 'en' && !newPath.startsWith('/en')) {
				// If switching to English and the path doesn't start with '/en', prepend '/en'
				newPath = `/en${newPath}`;
			} else if (lang === 'zh' && newPath.startsWith('/en')) {
				// If switching to Chinese and the path starts with '/en', remove '/en'
				newPath = newPath.replace(/^\/en/, '');
				// If the path becomes empty after removing '/en', set it to '/'
				if (newPath === '') {
					newPath = '/';
				}
			}

			console.log('New Path:', newPath);  // Debugging the new path

			// Push the new path after modification
			this.$router.push(newPath);

			// Call the switchLanguage function to handle locale changes
			switchLanguage(lang);
		}
	},
};
</script>

<style scoped>
body {
	font-family: "Lato", sans-serif;
	margin: 0;
}

.Topbar {
	height: 60px;
	background-color: #394264;
	padding: 0 16px;
	color: white;
}

.sidenav {
	height: calc(100% - 60px);
	width: 100%;
	/* Sidebar width */
	background-color: #1E233A;
	position: fixed;
	bottom: 0;
	left: -100%;
	/* Off-screen position */
	transition: transform 0.3s ease;
	/* Smooth slide animation */
	overflow-x: hidden;
	padding-top: 60px;
	z-index: 9999;
}

.sidenav.open {
	transform: translateX(100%);
	/* Slides sidebar into view */
}

.sidenav a {
	padding: 18px 10px;
	text-decoration: none;
	font-size: 20px;
	color: #8F97B5;
	display: block;
	transition: color 0.3s ease;
}

.overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	/* Semi-transparent black */
	z-index: 998;
	/* Below the navbar */
}

/* .sidenav a:hover {
	color: #ffffff;
} */

.language-dropdown select {
	border-radius: 15px;
	padding: 5px;
	outline: none;
}

@media screen and (min-width: 1024px) {
	.sidenav {
		width: 300px;
		left: -300px;
	}

	.sidenav.open {
		transform: translateX(300px);
		/* Slides sidebar into view */
	}
}
</style>

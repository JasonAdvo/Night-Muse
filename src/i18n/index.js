import { createI18n } from 'vue-i18n';
import zhMessages from './locales/zh.json';
import enMessages from './locales/en.json';
import router from '@/router'; // Import the router for dynamic route handling

// Function to detect the user's locale based on the current URL path
function detectUserLocale() {
	// Get the current path
	const path = window.location.pathname;

	// Check if the path includes '/en' for English
	if (path.includes('/en')) {
		return 'en';
	}

	// Default to Chinese ('zh') for all other paths
	return 'zh';
}

// Create the i18n instance with configuration
const i18n = createI18n({
	locale: detectUserLocale(), // Detect the initial locale
	fallbackLocale: 'zh', // Fallback to Chinese if a locale is missing
	messages: {
		zh: zhMessages,
		en: enMessages
	},
});

// Function to switch languages dynamically
export function switchLanguage(lang) {
	// Update the i18n locale
	i18n.global.locale = lang;

	// Store the user's language preference in localStorage
	localStorage.setItem('user-locale', lang);

	// Get the current route path
	const currentRoute = router.currentRoute.value;
	let newPath = currentRoute.path;

	if (newPath === '/') {
		// If the path is root '/', switch to '/en' if language is English, otherwise stay at '/'
		newPath = lang === 'en' ? '/en' : '/';
	} else if (lang === 'en') {
		// If switching to English, add '/en' to the path if it's not already there
		if (!newPath.startsWith('/en')) {
			newPath = `/en${newPath}`;
		}
	} else if (lang === 'zh') {
		// If switching to Chinese, remove '/en' from the start of the path
		newPath = newPath.replace(/^\/en/, ''); // Remove '/en' only if it appears at the start
	}

	// Update the URL with the new path
	router.push(newPath);
}

// Watch the route for changes and update the language dynamically
router.beforeEach((to, from, next) => {
	const defaultLocale = 'zh'; // Default language
	let locale;

	// Determine the locale based on the URL
	if (to.path.includes('/en')) {
		locale = 'en';
	} else {
		locale = defaultLocale;
	}

	// Update the i18n locale and sync it with localStorage
	i18n.global.locale = locale;
	localStorage.setItem('user-locale', locale);

	next(); // Proceed to the next route
});

// Export the i18n instance as the default export
export default i18n;

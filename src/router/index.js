import { createRouter, createWebHistory } from 'vue-router';
import mainPage from '@/views/mainPage.vue';
import ladiesPage from '@/views/ladiesPage.vue';
import ladiesProfile from '@/views/ladiesProfile.vue';

const routes = [
	{
		path: '/', // Default to Chinese (zh) for the base path
		name: 'Home',
		component: mainPage
	},
	{
		path: '/ladiesPage', // Chinese version of ladiesPage
		name: 'LadiesPage',
		component: ladiesPage
	},
	{
		// Dynamic route for ladiesProfile with `id` as a parameter
		path: '/ladiesProfile/:id', // This is the dynamic parameter for the lady's profile
		name: 'ladiesProfile',
		component: ladiesProfile,
		props: true, // Pass the route params as props to the component
	},
	// {
	// 	path: '/en', // English version of home
	// 	name: 'Home_en',
	// 	component: mainPage
	// },
	// {
	// 	path: '/en/ladiesPage', // English version of ladiesPage
	// 	name: 'LadiesPage_en',
	// 	component: ladiesPage
	// },
	// {
	// 	// Dynamic route for ladiesProfile with `id` as a parameter (English version)
	// 	path: '/en/ladiesProfile/:id', // English version with dynamic `id` parameter
	// 	name: 'ladiesProfile_en',
	// 	component: ladiesProfile,
	// 	props: true, // Pass the route params as props to the component
	// },
	// Add more routes as needed
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
	scrollBehavior(to, from, savedPosition) {
		// Always scroll to the top of the page when navigating
		return { top: 0 };
	}
});

// Navigation guard to sync locale
// router.beforeEach((to, from, next) => {
// 	const defaultLocale = 'zh'; // Default language
// 	let locale;

// 	if (to.path.startsWith('/en')) {
// 		locale = 'en';
// 	} else {
// 		locale = defaultLocale; // Fallback to zh
// 	}

// 	localStorage.setItem('user-locale', locale); // Save preference
// 	next();
// });

export default router;

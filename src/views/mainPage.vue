<template>
	<div>
		<popUp />
	</div>

	<div class="position-sticky top-0" style="z-index: 11;">
		<topBar />
	</div>

	<div v-if="currentAdsState" class="Btm-Popup_Container" style="width: 100px; z-index: 10;">
		<i class="ic-close-circle fas fa-times-circle d-flex justify-content-center rounded-circle top-0 pointer"
			@click="closePopup"></i>
		<a :href="'http://t.me/sweetchat20'">
			<img class="w-100" src="/images/758 Gaming.webp" alt="Join Us Now">
		</a>
	</div>

	<section class="mt-2">
		<div class="Main_Page_Top_Section w-100 d-flex flex-column justify-content-center align-items-center">

			<img src="/images/Main_Page_Logo_Text.svg" alt="Main Page Logo Text">

			<div class="color-1E233A fs-22 fw-bolder mt-3">
				{{ $t('Main_Page.Special') }}
			</div>

			<a class="text-decoration-none" href="https://t.me/nightmus3">
				<div class="Chat_Button bg-FEB92E br-6 d-flex justify-content-center align-items-center mt-4 pointer"
					style="width: 170px; height: 34px;">
					<div class="color-1E233A fs-16 fw-bold">
						{{ $t('Main_Page.Chat') }}
					</div>
				</div>
			</a>

		</div>
	</section>

	<section class="mt-4">
		<div class="Main_Page_Ladies_Section px-3">
			<div class="w-100 bg-1E233A position-sticky" style="top: 60px;">
				<div class=" color-8F97B5 fs-24 fw-bolder text-center">
					{{ $t('Main_Page.Today_Ladies') }}
				</div>
			</div>

			<div class="Ladies_Display_Container bg-394264 rounded-3 pt-half px-half pb-half mx-auto mt-4 mb-half">
				<div class="Ladies_Display row g-2">
					<div v-for="(item, index) in adjustedLadiesList" :key="index" :class="item.isFullWidth
						? 'col-12 pointer overflow-hidden text-center'
						: 'gallery-item col-6 col-sm-4 col-md-3 col-lg-2 pointer overflow-hidden'">

						<!-- Full-width image row -->
						<div v-if="item.isFullWidth" class="full-width-image rounded-3">
							<a :href="'http://t.me/sweetchat20'" target="_blank">
								<img :src="item.image" alt="Ads Image" class="w-100 rounded-3" />
							</a>
						</div>

						<!-- Normal lady info and image -->
						<div v-else class="bg-1E233A rounded-3 d-flex flex-column h-100"
							@click="goToLadyProfile(item.index)">
							<img class="rounded-top-3 w-100" v-lazy="item.lady.ImageList[0]" alt="Cover image"
								style="height: 80%; object-fit: cover;" />

							<div class="Info d-flex justify-content-center align-items-center color-white fs-18 fw-bold"
								style="height: 20%;">
								{{ item.lady.name[this.$i18n.locale] }}, {{ item.lady.age }}
							</div>
						</div>
					</div>
				</div>

				<div class="mt-3">
					<router-link to="/ladiesPage" class="text-decoration-none">
						<div class="More_Button bg-FEB92E br-6 d-flex justify-content-center align-items-center"
							style="height: 34px;">
							<div class="color-1E233A fs-16 fw-bold">
								更多佳丽
							</div>
						</div>
					</router-link>
				</div>
			</div>

		</div>
	</section>
</template>

<script>
import topBar from '@/components/topBar.vue';
import LadiesList from '/src/assets/Ladies/Ladies.json';
import popUp from '@/components/popUp.vue';
import { mapGetters } from 'vuex';

export default {
	components: {
		topBar,
		popUp
	},
	data() {
		return {
			Ladies: LadiesList, // Make sure Ladies is defined here
			ladyIndexMap: [],
			randomLadiesList: [],
			fullWidthImage: '/images/Announcement Bar.webp',
			isVisible: true,
		}
	},
	mounted() {
		this.shuffleLadiesList();
	},
	computed: {
		adjustedLadiesList() {
			const breakpoints = {
				xs: 4, // col-6
				sm: 6, // col-sm-4
				md: 8, // col-md-3
				lg: 12, // col-lg-2
			};

			// Dynamically determine current breakpoint
			const getBreakpoint = () => {
				if (window.matchMedia('(min-width: 992px)').matches) return 'lg';
				if (window.matchMedia('(min-width: 768px)').matches) return 'md';
				if (window.matchMedia('(min-width: 576px)').matches) return 'sm';
				return 'xs';
			};

			const breakpoint = getBreakpoint();
			const itemsPerRow = breakpoints[breakpoint];

			const adjustedList = [];
			this.randomLadiesList.forEach((lady, index) => {
				adjustedList.push({
					lady,
					isFullWidth: false,
					index: this.ladyIndexMap[index], // Use the original index mapping for correct redirection
				});

				// After each group of itemsPerRow, insert a full-width image
				if ((index + 1) % itemsPerRow === 0) {
					adjustedList.push({
						isFullWidth: true,
						image: this.fullWidthImage,
					});
				}
			});

			return adjustedList;
		},
		...mapGetters(['currentAdsState'])
	},
	methods: {
		goToLadyProfile(index) {
			// Navigate to the ladiesProfile page with the `id` of the selected lady
			this.$router.push({ name: 'ladiesProfile', params: { id: index } });

			this.$store.dispatch('setLadiesProfile', true);
		},
		shuffleLadiesList() {
			const first50Ladies = this.Ladies.slice(0, 50); // Take the first 50 ladies

			// Fisher-Yates shuffle
			for (let i = first50Ladies.length - 1; i > 0; i--) {
				// Generate a random index between 0 and i
				const j = Math.floor(Math.random() * (i + 1));

				// Swap elements at i and j
				[first50Ladies[i], first50Ladies[j]] = [first50Ladies[j], first50Ladies[i]];
			}

			const selectedLadies = first50Ladies.slice(0, 20);

			// Map the original indices of the selected ladies
			this.ladyIndexMap = selectedLadies.map(lady => this.Ladies.indexOf(lady));

			this.randomLadiesList = selectedLadies; // Store the new shuffled list
		},
		closePopup() {
			this.$store.dispatch('changeAdsState');
		}
	}
};

</script>

<style scoped>
.Main_Page_Top_Section {
	background-image: url('/images/Main_Page_Top_Bg.webp');
	background-size: 100% 100%;
	background-repeat: no-repeat;
	height: 300px;
}

.Chat_Button {
	transition: 0.5s;
}

.Chat_Button:hover {
	background: rgb(255, 170, 0);
	transform: scale(1.05);
}

.More_Button {
	transition: 0.5s;
}

.More_Button:hover {
	background: rgb(255, 170, 0);
	transform: scale(1.008);
}

.Btm-Popup_Container {
	position: fixed;
	left: 0;
	bottom: 20px;
	padding-top: 20px;
}

.ic-close-circle {
	padding: 4px;
	width: 20px;
	position: absolute;
	right: -15px;
}

.fa-times-circle::before {
	color: white;
	font-size: 20px;
}
</style>
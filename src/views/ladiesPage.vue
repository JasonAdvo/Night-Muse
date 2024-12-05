<template>
	<div class="sticky-top" style="z-index: 10;">
		<topBar />
	</div>

	<section class="mt-4">
		<div class="Main_Page_Ladies_Section px-3">
			<div class="Ladies_Display_Container bg-394264 rounded-3 pt-half px-half pb-half mx-auto mt-4 mb-half">
				<div class="Ladies_Display row g-2">
					<div v-for="(item, index) in adjustedLadiesList" :key="index" :class="item.isFullWidth
						? 'col-12 pointer overflow-hidden text-center'
						: 'd-flex flex-column col-6 col-sm-4 col-md-3 col-lg-2 pointer overflow-hidden'">

						<!-- Full-width image row -->
						<div v-if="item.isFullWidth" class="full-width-image rounded-3">
							<a :href="'http://t.me/sweetchat20'" target="_blank">
								<img :src="item.image" alt="Ads Image" class="w-100 rounded-3" />
							</a>
						</div>

						<!-- Normal lady info and image -->
						<div v-else class="bg-1E233A rounded-3 d-flex flex-column h-100"
							@click="goToLadyProfile(item.index)">
							<img class="rounded-top-3 w-100 object-fit-cover h-80" v-lazy="item.lady.ImageList[0]"
								alt="Cover image" />

							<div
								class="Info d-flex justify-content-center align-items-center color-white fs-18 fw-bold h-20">
								{{ item.lady.name[this.$i18n.locale] }}, {{ item.lady.age }}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

</template>

<script>
import topBar from '@/components/topBar.vue';
import LadiesList from '/src/assets/Ladies/Ladies.json';

export default {
	components: {
		topBar
	},
	data() {
		return {
			Ladies: LadiesList, // Make sure Ladies is defined here
			ladyIndexMap: [],
			randomLadiesList: [],
			fullWidthImageWeb: '/images/Ads_Banner.gif',
			fullWidthImageMobile: '/images/Ads_Banner_Mobile.gif',
		}
	},
	mounted() {
		this.shuffleLadiesList(); // Shuffle when the component is created
	},
	computed: {
		adjustedLadiesList() {
			const breakpoints = {
				xs: 10, // col-6
				sm: 15, // col-sm-4
				md: 20, // col-md-3
				lg: 30, // col-lg-2
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

			let imageChosen = this.fullWidthImageMobile;

			if (breakpoint === 'lg') {
				imageChosen = this.fullWidthImageWeb;
			}

			const adjustedList = [];
			let fullWidthImageInserted = false; // Track whether the full-width image is inserted

			this.randomLadiesList.forEach((lady, index) => {
				adjustedList.push({
					lady,
					isFullWidth: false,
					index: this.ladyIndexMap[index], // Use the original index mapping for correct redirection
				});

				// Insert a full-width image only once, after the first group of `itemsPerRow`
				if (!fullWidthImageInserted && (index + 1) % itemsPerRow === 0) {
					adjustedList.push({
						isFullWidth: true,
						image: imageChosen,
					});
					fullWidthImageInserted = true; // Ensure the image is inserted only once
				}
			});

			return adjustedList;
		},
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
				const j = Math.floor(Math.random() * (i + 1));
				[first50Ladies[i], first50Ladies[j]] = [first50Ladies[j], first50Ladies[i]];
			}

			// Map the original indices of the selected ladies
			this.ladyIndexMap = first50Ladies.map(lady => this.Ladies.indexOf(lady));

			this.randomLadiesList = first50Ladies; // Store the shuffled list
		}
	}
};

</script>

<style scoped></style>
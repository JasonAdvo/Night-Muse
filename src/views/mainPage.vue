<template>
	<div>
		<popUp />
	</div>

	<div style="position: sticky; top: 0; z-index: 10;">
		<topBar />
	</div>

	<section class="mt-2">
		<div class="Main_Page_Top_Section d-flex flex-column justify-content-center  align-items-center">

			<img src="/images/Main_Page_Logo_Text.svg" alt="Main Page Logo Text">

			<div class="color-1E233A fs-22 fw-800 mt-3">
				{{ $t('Main_Page.Special') }}
			</div>

			<a href="https://t.me/nightmus3" style="text-decoration: none;">
				<div class="Chat_Button bg-FEB92E br-6 d-flex justify-content-center  align-items-center mt-4 pointer"
					style="width: 170px; height: 34px;">
					<div class="color-1E233A fs-16 fw-700">
						{{ $t('Main_Page.Chat') }}
					</div>
				</div>
			</a>

		</div>
	</section>

	<section class="mt-4	">
		<div class="Main_Page_Ladies_Section px-3">
			<div class="w-100 bg-1E233A" style="position: sticky; top: 60px;">
				<div class=" color-8F97B5 fs-24 fw-800 text-center">
					{{ $t('Main_Page.Today_Ladies') }}
				</div>
			</div>

			<div class="Ladies_Display_Container bg-394264 br-13 pt-half px-half pb-half mx-auto mt-4 mb-half">
				<div class="Ladies_Display row g-2">
					<div v-for="(lady, index) in randomLadiesList" :key="index"
						class="gallery-item col-6 col-sm-4 col-md-3 col-lg-2 pointer" style="overflow: hidden;"
						@click="goToLadyProfile(ladyIndexMap[index])">

						<div class="bg-1E233A br-12 d-flex flex-column h-100">
							<img v-lazy="lady.ImageList[0]" alt="Cover image"
								style="width: 100%; height: 80%; object-fit: cover; border-top-left-radius: 12px; border-top-right-radius: 12px" />

							<div class="Info d-flex justify-content-center align-items-center color-white fs-18 fw-700"
								style="height: 20%;">
								<!-- Display the name and age based on the current locale -->
								{{ lady.name[this.$i18n.locale] }}, {{ lady.age }}
							</div>
						</div>
					</div>
				</div>

				<div class="mt-3">
					<router-link to="/ladiesPage" style="text-decoration: none;">
						<div class="More_Button bg-FEB92E br-6 d-flex justify-content-center align-items-center"
							style="height: 34px;">
							<div class="color-1E233A fs-16 fw-700">
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
		}
	},
	mounted() {
		this.shuffleLadiesList();
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
		}
	}
};

</script>

<style scoped>
.Main_Page_Top_Section {
	background-image: url('/images/Main_Page_Top_Bg.webp');
	background-size: 100% 100%;
	background-repeat: no-repeat;
	width: 100%;
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
</style>
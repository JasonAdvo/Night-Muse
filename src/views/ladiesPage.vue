<template>
	<div style="position: sticky; top: 0; z-index: 10;">
		<topBar />
	</div>

	<section class="mt-4">
		<div class="Main_Page_Ladies_Section px-3">
			<div class="Ladies_Display_Container bg-394264 br-13 pt-half px-half pb-half mx-auto mt-4 mb-half">
				<div class="Ladies_Display row g-2">
					<div v-for="(lady, index) in randomLadiesList" :key="index"
						class="gallery-item col-6 col-sm-4 col-md-3 col-lg-2 pointer" style=" overflow: hidden;"
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
			randomLadiesList: []
		}
	},
	mounted() {
		this.shuffleLadiesList(); // Shuffle when the component is created
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

			// Map the original indices of the selected ladies
			this.ladyIndexMap = first50Ladies.map(lady => this.Ladies.indexOf(lady));

			this.randomLadiesList = first50Ladies; // Store the new shuffled list
		}
	}
};

</script>

<style scoped></style>
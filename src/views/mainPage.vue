<template>
	<div>
		<popUp />
	</div>

	<div style="position: sticky; top: 0; z-index: 10;">
		<topBar />
	</div>

	<section class="mt-half">
		<div class="Main_Page_Top_Section flex flex-column flex-center align-center">

			<img src="/images/Main_Page_Logo_Text.svg" alt="Main Page Logo Text">

			<div class="color-1E233A fs-22 fw-800 mt-1">
				{{ $t('Main_Page.Special') }}
			</div>

			<a href="https://t.me/nightmus3" style="text-decoration: none;">
				<div class="Chat_Button bg-FEB92E br-6 flex flex-center align-center mt-half pointer"
					style="width: 170px; height: 34px;">
					<div class="color-1E233A fs-16 fw-700">
						{{ $t('Main_Page.Chat') }}
					</div>
				</div>
			</a>

		</div>
	</section>

	<section class="mt-half	">
		<div class="Main_Page_Ladies_Section px-1">
			<!-- style="position: sticky; top: 60px;" -->
			<div class="w-full bg-1E233A" style="position: sticky; top: 60px;">
				<div class=" color-8F97B5 fs-24 fw-800 text-center">
					{{ $t('Main_Page.Today_Ladies') }}
				</div>
			</div>

			<div class="Ladies_Display_Container bg-394264 br-13 pt-half px-half pb-half mx-auto mt-half mb-half">
				<div class="Ladies_Display grid grid-center flex-center">
					<div v-for="(lady, index) in randomLadiesList" :key="index"
						class="gallery-item bg-1E233A br-12 flex flex-column pointer"
						style="height: 250px; width: 100%; max-width: 200px; overflow: hidden;"
						@click="goToLadyProfile(ladyIndexMap[index])">
						<img style="width: 100%; max-width: 200px; height: 80%; object-fit: cover;"
							:src="lady.ImageList[0]" alt="Cover image" />

						<div class="Info flex flex-center align-center color-white fs-18 fw-700" style="height: 20%;">
							<!-- Display the name and age based on the current locale -->
							{{ lady.name[this.$i18n.locale] }}, {{ lady.age }}
						</div>
					</div>
				</div>

				<div class="mt-1">
					<router-link to="/ladiesPage" style="text-decoration: none;">
						<div class="More_Button bg-FEB92E br-6 flex flex-center align-center" style="height: 34px;">
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
		// console.log(this.Ladies)
	},
	methods: {
		goToLadyProfile(index) {
			// Navigate to the ladiesProfile page with the `id` of the selected lady
			this.$router.push({ name: 'ladiesProfile', params: { id: index } });

			this.$store.dispatch('setLadiesProfile', true);
		},
		shuffleLadiesList() {
			const first50Ladies = this.Ladies.slice(0, 50); // Take the first 50 ladies


			const shuffledLadies = this.shuffleArray(first50Ladies); // Shuffle the filtered list

			const selectedLadies = shuffledLadies.slice(0, 20); // Take the first 4 after shuffle

			// Map the original indices of the selected ladies
			this.ladyIndexMap = selectedLadies.map(lady =>
				this.Ladies.indexOf(lady)
			);

			this.randomLadiesList = selectedLadies; // Store the new shuffled list
		},
		// Shuffle the array using Fisher-Yates shuffle algorithm
		shuffleArray(array) {
			let shuffledArray = array.slice(); // Create a copy of the array
			for (let i = shuffledArray.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
			}
			return shuffledArray;
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

.Ladies_Display {
	grid-template-columns: repeat(2, 1fr);
	grid-gap: 12px;
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

@media screen and (min-width: 520px) {
	.Ladies_Display_Container {
		max-width: 80%;
	}

	.Ladies_Display {
		grid-template-columns: repeat(3, 1fr);
	}
}

@media screen and (min-width: 1024px) {

	.Ladies_Display {
		grid-template-columns: repeat(4, 1fr);
	}
}

@media screen and (min-width: 1600px) {

	.Ladies_Display {
		grid-template-columns: repeat(6, 1fr);
	}
}
</style>
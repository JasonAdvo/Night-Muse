<template>
	<div style="position: sticky; top: 0;">
		<topBar />
	</div>

	<div class="px-1 pt-1-half mx-auto" style="min-height: 100vh; max-width: 500px;">

		<div class="flex flex-between">

			<div class="w-48" style="height: 250px;">

				<img class="br-8" style="width: 100%; height: 100%; object-fit: cover;"
					:src="`/images/Ladies_Gallery/${parseInt(this.$route.params.id) + 1}/1.webp`"
					:alt="`Cover image for folder ${parseInt(this.$route.params.id) + 1}`">

			</div>

			<div class="w-48 flex flex-column flex-between" style="height: 250px;">

				<div class="fs-18 fw-600 color-8F97B5">
					名字 ：{{ lady.name[this.$i18n.locale] }}
				</div>

				<div class="fs-18 fw-600 color-8F97B5">
					年龄 ：{{ lady.age }}
				</div>

				<div class="fs-18 fw-600 color-8F97B5">
					三围 ：{{ lady.parameter }}
				</div>

				<div class="fs-18 fw-600 color-8F97B5">
					国际 ：{{ lady.nation[this.$i18n.locale] }}
				</div>

				<div class="flex fs-18 fw-600 color-8F97B5">
					语言 ：
					<div class="fs-18 fw-600 color-8F97B5" v-for="(lang, index) in lady.language" :key="index">
						{{ lang[this.$i18n.locale] }}
						<span v-if="index < lady.language.length - 1">, </span>
					</div>
				</div>
			</div>
		</div>

		<div class="fs-16 fw-400 color-8F97B5 LH-30 mt-1">
			简介：{{ lady.Description[this.$i18n.locale] }}
		</div>

		<!-- First Image -->
		<div v-if="imageExists('2')" class="mt-1-half" style="height: 400px;">
			<img class="" style="width: 100%; height: 100%; object-fit: cover;"
				:src="`/images/Ladies_Gallery/${parseInt(this.$route.params.id) + 1}/2.webp`"
				:alt="`Cover image for folder ${parseInt(this.$route.params.id) + 1}`">
		</div>

		<!-- Second Image -->
		<div v-if="imageExists('3')" class="mt-1" style="height: 400px;">
			<img class="" style="width: 100%; height: 100%; object-fit: cover;"
				:src="`/images/Ladies_Gallery/${parseInt(this.$route.params.id) + 1}/3.webp`"
				:alt="`Cover image for folder ${parseInt(this.$route.params.id) + 1}`">
		</div>

		<!-- Third Image -->
		<div v-if="imageExists('4')" class="mt-1" style="height: 400px;">
			<img class="" style="width: 100%; height: 100%; object-fit: cover;"
				:src="`/images/Ladies_Gallery/${parseInt(this.$route.params.id) + 1}/4.webp`"
				:alt="`Cover image for folder ${parseInt(this.$route.params.id) + 1}`">
		</div>

		<!-- Chat Button -->
		<a href="https://t.me/nightmus3" style="text-decoration: none;">
			<div class="mt-1">
				<div class="w-full">
					<div class="bg-FEC72E br-11 pointer Chat_Button" style="padding: 8px 0;">
						<div class="flex flex-center align-center">
							<div class="fs-24 fw-700 color-1E233A">
								和我聊天吧
							</div>
						</div>
					</div>
				</div>
			</div>
		</a>

		<!-- 热门推荐 -->
		<div class="mt-2">
			<div class="w-full">
				<div class="text-center">
					<div class="color-8F97B5 fs-24 fw-800">
						热门推荐
					</div>
				</div>
			</div>

			<div class="Ladies_Display_Container bg-394264 br-13 pt-half px-half pb-half mx-auto mt-half mb-half">
				<div class="Ladies_Display grid grid-center flex-center">
					<div v-for="(lady, index) in randomLadiesList" :key="index"
						class="gallery-item bg-1E233A br-12 flex flex-column pointer"
						style="height: 250px; width: 100%; max-width: 200px; overflow: hidden;"
						@click="goToLadyProfile(ladyIndexMap[index])">
						<img style="width: 100%; max-width: 200px; height: 80%; object-fit: cover;"
							:src="`/images/Ladies_Gallery/${ladyIndexMap[index] + 1}/1.webp`"
							:alt="`Cover image for folder ${ladyIndexMap[index] + 1}`" />
						<div class="Info flex flex-center align-center color-white fs-18 fw-700" style="height: 20%;">
							<!-- Display the name and age based on the current locale -->
							{{ lady.name[this.$i18n.locale] }}, {{ lady.age }}
						</div>
					</div>
				</div>
			</div>
		</div>

	</div>

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
			imageStatus: {
				'2': true, // Image 2 is available by default
				'3': true, // Image 3 is available by default
				'4': true  // Image 4 is available by default
			},
			Ladies: LadiesList, // Make sure Ladies is defined here
			ladyIndexMap: [],
			randomLadiesList: [], // This will store the shuffled ladies
			previousIndex: null
		};
	},
	props: ['id'], // The `id` is passed as a prop from the route
	computed: {
		lady() {
			return LadiesList[this.$route.params.id]; // Access the lady using the `id` from the route
		},
	},
	methods: {
		imageExists(imageNumber) {
			const imageUrl = `/images/Ladies_Gallery/${parseInt(this.$route.params.id) + 1}/${imageNumber}.webp`;

			// Create a new image element to check if it loads successfully
			const img = new Image();
			img.onload = () => {
				this.imageStatus[imageNumber] = true; // Image is available
			};
			img.onerror = () => {
				this.imageStatus[imageNumber] = false; // Image is not available
			};

			// Start loading the image (without appending it to the DOM)
			img.src = imageUrl;

			// Return the image status
			return this.imageStatus[imageNumber];
		},
		goToLadyProfile(index) {
			// Navigate to the ladiesProfile page with the `id` of the selected lady
			this.$router.push({ name: 'ladiesProfile', params: { id: index } });
		},
		shuffleLadiesList() {
			const first50Ladies = this.Ladies.slice(0, 50); // Take the first 50 ladies

			// Exclude the previously selected lady
			const filteredLadies = first50Ladies.filter((_, index) => index !== this.previousIndex);

			const shuffledLadies = this.shuffleArray(filteredLadies); // Shuffle the filtered list
			const selectedLadies = shuffledLadies.slice(0, 4); // Take the first 4 after shuffle

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
	},
	created() {
		this.shuffleLadiesList(); // Shuffle when the component is created
	},
	watch: {
		// Watch for route changes and reshuffle when `id` changes
		'$route.params.id': function (newId) {
			this.previousIndex = parseInt(newId);
			this.shuffleLadiesList();
		}
	}
};


</script>


<style scoped>
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
</style>
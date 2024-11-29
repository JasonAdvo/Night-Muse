<template>
	<div class="sticky-top" style="z-index: 10;">
		<topBar />
	</div>

	<div class="px-3 pt-1-half mx-auto min-vh-100" style="max-width: 500px;">

		<div class="d-flex justify-content-between" style="height: 250px;">

			<div class="w-48">

				<img v-lazy="lady.ImageList[0]" class="br-8 w-100 h-100" alt="Cover image" style="object-fit: cover;" />

			</div>

			<div class="w-48 d-flex flex-column justify-content-between">

				<div class="fs-16 fw-600 color-8F97B5">
					名字 ：{{ lady.name[this.$i18n.locale] }} ( {{ lady.name['en'] }} )
				</div>

				<div class="fs-16 fw-600 color-8F97B5">
					年龄 ：{{ lady.age }}
				</div>

				<div class="fs-16 fw-600 color-8F97B5">
					三围 ：{{ lady.parameter }}
				</div>

				<div class="fs-16 fw-600 color-8F97B5">
					国际 ：{{ lady.nation[this.$i18n.locale] }}
				</div>

				<div class="d-flex fs-16 fw-600 color-8F97B5">
					语言 ：
					<div class="fs-16 fw-600 color-8F97B5" v-for="(lang, index) in lady.language" :key="index">
						{{ lang[this.$i18n.locale] }}
						<span v-if="index < lady.language.length - 1">, </span>
					</div>
				</div>
			</div>
		</div>

		<div class="fs-16 fw-400 color-8F97B5 LH-30 mt-3">
			简介：{{ lady.Description[this.$i18n.locale] }}
		</div>

		<!-- Image List -->
		<div class="mt-4">
			<div class="mt-3" v-for="(Image, Index) in lady.ImageList.slice(1, 4)" :key="Index" style="height: 60vh	;">

				<img class="w-100 h-100" v-lazy="Image" style="object-fit: cover;" alt="Lady Image">

			</div>
		</div>

		<!-- Chat Button -->
		<a class="text-decoration-none" href="https://t.me/nightmus3">
			<div class="mt-3">
				<div class="w-100">
					<div class="bg-FEC72E rounded-3 pointer Chat_Button" style="padding: 8px 0;">
						<div class="d-flex justify-content-center  align-items-center">
							<div class="fs-24 fw-bold color-1E233A">
								和我聊天吧
							</div>
						</div>
					</div>
				</div>
			</div>
		</a>

		<!-- 热门推荐 -->
		<div class="mt-4">
			<div class="w-100">
				<div class="text-center">
					<div class="color-8F97B5 fs-24 fw-bolder">
						热门推荐
					</div>
				</div>
			</div>

			<div class="Ladies_Display_Container bg-394264 rounded-3 pt-half px-half pb-half mx-auto mt-4 mb-half">
				<div class="Ladies_Display row g-2 ">
					<div v-for="(lady, index) in randomLadiesList" :key="index"
						class="gallery-item col-6 pointer overflow-hidden"
						@click="goToLadyProfile(ladyIndexMap[index])">

						<div class="bg-1E233A rounded-3 d-flex flex-column h-100">
							<img class="rounded-top-3 w-100" style="height: 80%; object-fit: cover;"
								v-lazy="lady.ImageList[0]" alt="Cover image" />
							<div class="Info d-flex justify-content-center  align-items-center color-white fs-18 fw-bold"
								style="height: 20%;">
								<!-- Display the name and age based on the current locale -->
								{{ lady.name[this.$i18n.locale] }}, {{ lady.age }}
							</div>
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
		goToLadyProfile(index) {
			// Navigate to the ladiesProfile page with the `id` of the selected lady
			this.$router.push({ name: 'ladiesProfile', params: { id: index } });
		},
		shuffleLadiesList() {
			const first50Ladies = this.Ladies.slice(0, 50); // Take the first 50 ladies

			// Exclude the previously selected lady
			const filteredLadies = first50Ladies.filter((_, index) => index !== this.previousIndex);

			// Fisher-Yates shuffle
			for (let i = filteredLadies.length - 1; i > 0; i--) {
				// Generate a random index between 0 and i
				const j = Math.floor(Math.random() * (i + 1));

				// Swap the elements at i and j
				[filteredLadies[i], filteredLadies[j]] = [filteredLadies[j], filteredLadies[i]];
			}

			// Take the first 4 from the shuffled list
			const selectedLadies = filteredLadies.slice(0, 4);

			// Map the original indices of the selected ladies
			this.ladyIndexMap = selectedLadies.map(lady => this.Ladies.indexOf(lady));

			this.randomLadiesList = selectedLadies; // Store the new shuffled list
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
.Chat_Button {
	transition: 0.5s;
}

.Chat_Button:hover {
	background: rgb(255, 170, 0);
	transform: scale(1.05);
}
</style>
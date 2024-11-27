<template>
	<div style="position: sticky; top: 0; z-index: 10;">
		<topBar />
	</div>

	<section class="mt-half	">
		<div class="Main_Page_Ladies_Section px-1">
			<!-- style="position: sticky; top: 60px;" -->
			<div class="w-full bg-1E233A" style="position: sticky; top: 60px;">
				<div class="color-8F97B5 fs-24 fw-800 text-center">
					{{ $t('Main_Page.Today_Ladies') }}
				</div>
			</div>

			<div class="Ladies_Display_Container bg-394264 br-13 pt-half px-half pb-half mx-auto mt-half mb-half">
				<div class="Ladies_Display grid grid-center flex-center">
					<div v-for="(lady, index) in Ladies.slice(0, 50)" :key="index"
						class="gallery-item bg-1E233A br-12 flex flex-column pointer"
						style="height: 250px; width: 100%; max-width: 200px; overflow: hidden;"
						@click="goToLadyProfile(index)">
						<img style="width: 100%; max-width: 200px; height: 80%; object-fit: cover;"
							:src="`/images/Ladies_Gallery/${index + 1}/1.webp`"
							:alt="`Cover image for folder ${index + 1}`" />

						<div class="Info flex flex-center align-center color-white fs-18 fw-700" style="height: 20%;">
							<!-- Display the name and age based on the current locale -->
							{{ lady.name[this.$i18n.locale] }}, {{ lady.age }}
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
			Ladies: LadiesList // Make sure Ladies is defined here
		}
	},
	methods: {
		goToLadyProfile(index) {
			// Navigate to the ladiesProfile page with the `id` of the selected lady
			this.$router.push({ name: 'ladiesProfile', params: { id: index } });

			this.$store.dispatch('setLadiesProfile', true);
		},
	}
};

</script>

<style scoped>
.Ladies_Display {
	grid-template-columns: repeat(2, 1fr);
	grid-gap: 12px;
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
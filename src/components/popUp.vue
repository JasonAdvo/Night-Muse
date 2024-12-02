<template>
	<div>
		<!-- Overlay and Pop-up -->
		<div v-if="currentPopUpState"
			class="overlay d-flex justify-content-center align-items-center w-100 h-100 fixed-top"
			@click.self="closePopup">
			<div class="popup position-relative">
				<img class="w-100" src="/images/Pop_Up.webp" alt="Pop up Banner-Night Muse">

				<div class="position-absolute w-80 start-50 translate-middle-x" style="bottom: 35px">
					<div @click.self="closePopup"
						class="bg-EC404B br-7 d-flex justify-content-center align-items-center color-white fs-16 fw-400 pointer"
						style="padding: 6px 0;">
						进入
					</div>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'PopupOverlay',
	computed: {
		...mapGetters(['currentPopUpState'])
	},
	mounted() {
		if (this.currentPopUpState == true) {
			document.body.style.overflow = 'hidden'; // Disable scrolling when pop-up appears
		}
	},
	methods: {
		closePopup() {
			this.$store.dispatch('changePopUpState');
			document.body.style.overflow = ''; // Restore scrolling when pop-up is closed
		}
	},
	beforeDestroy() {
		document.body.style.overflow = ''; // Ensure scrolling is restored if the component is destroyed
	}
};
</script>

<style scoped>
/* Overlay Style */
.overlay {
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 1000;
}

/* Pop-up Style */
.popup {
	width: 80%;
	max-width: 400px;
}
</style>

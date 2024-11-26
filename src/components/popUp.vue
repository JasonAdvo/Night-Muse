<template>
	<div>
		<!-- Overlay and Pop-up -->
		<div v-if="currentPopUpState" class="overlay" @click.self="closePopup">
			<div class="popup relative">
				<img class="w-full" src="/images/Pop_Up.webp" alt="Pop up Banner-Night Muse">

				<div class="absolute w-80" style="left: 50%; transform: translateX(-50%); bottom: 35px">
					<div @click.self="closePopup"
						class="bg-EC404B br-7 flex flex-center align-center color-white fs-16 fw-400 pointer"
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
	data() {
		return {
			// isPopupVisible: true // Set to true to show the pop-up on page load
		};
	},
	computed: {
		...mapGetters(['currentPopUpState'])
	},
	mounted() {
		document.body.style.overflow = 'hidden'; // Disable scrolling when pop-up appears
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
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	/* Semi-transparent background */
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
}

/* Pop-up Style */
.popup {
	width: 80%;
	max-width: 400px;
}
</style>

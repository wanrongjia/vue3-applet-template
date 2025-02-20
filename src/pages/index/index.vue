<template>
	<view class="content">
		<!-- <image :src="$ICON('/shareBg.png')" /> -->
	</view>
	<MyTabbar />
	<ShareCom v-if="showShare" ref="ShareComRef" @closed="showShare = false" />
</template>

<script lang="ts" setup>
import api from "@/api"
import ShareCom from "./components/ShareCom.vue"
const showShare: Ref<boolean> = ref(false)
const ShareComRef: Ref<InstanceType<typeof ShareCom> | null> = ref(null)
onMounted(() => {
	// showShare.value = true
	// nextTick(() => {
	// 	ShareComRef.value?.open()
	// })
	console.log(api.auth)
})
</script>
<style lang="scss" scoped>
.content {
	height: 300vh;
}
</style>

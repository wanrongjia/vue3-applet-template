<template>
	<u-navbar :fixed="fixed" :titleStyle="titleStyle" :title="title" :placeholder="placeholder" :bgColor="bgColor"
		@leftClick="back" :leftIconColor="leftIconColor">
		<template #left>
			<up-icon name="home" size="22" :color="leftIconColor" v-if="isFirst" />
			<up-icon name="arrow-left" size="20" :color="leftIconColor" v-else />
		</template>
	</u-navbar>
</template>

<script setup>
const props = defineProps({
	title: {
		type: String,
		default: ''
	},
	fixed: {
		type: Boolean,
		default: true
	},
	placeholder: {
		type: Boolean,
		default: false
	},
	leftIconColor: {
		type: String,
		default: '#303133'
	},
	titleColor: {
		type: String,
		default: '#000000'
	},
	bgColor: {
		type: String,
		default: 'transparent'
	}
})
const titleStyle = computed(() => {
	return {
		fontWeight: 500,
		fontSize: '34rpx',
		color: props.titleColor
	}
})
const isFirst = computed(() => uni.$u.pages().length === 1)
const back = () => {
	if (uni.$u.pages().length === 1) {
		uni.switchTab({ url: '/pages/index/index' })
		return
	}
	uni.navigateBack();
}
</script>

<style lang="scss" scoped></style>

<template>
	<u-button @click="main">点击</u-button>
	<view>{{ system.count }}</view>
</template>

<script setup>
	import { pages } from 'virtual:uni-pages'
	import { useSystem } from "@/stores/system";
	import sysConfig from "@/config"
	const system = useSystem()
	const main = async () => {
		console.log(pages)
		// let href = `${location.href.split('#')[0]}`
		// let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${sysConfig.APP_ID}&redirect_uri=${encodeURIComponent(href)}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
		// console.log(url)
		// window.location.href = url
	}
</script>

<style lang="scss" scoped></style>

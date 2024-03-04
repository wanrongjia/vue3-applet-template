<template>
	<u-button @click="main">点击</u-button>
	<view>{{ system.count }}</view>
</template>

<script setup>
	import { useSystem } from "@/stores/system";
	import api from "@/api"
	const system = useSystem()
	const main = async () => {
		const res = await api.auth.login.post({})
	}
</script>

<style lang="scss" scoped></style>

<template>
	<u-button @click="main">点击</u-button>
	<view>{{ system.count }}</view>
</template>

<script setup>
import { useSystemStore } from "@/stores";
const system = useSystemStore();
const main = async () => {
	system.increment();
};
</script>

<style lang="scss" scoped></style>

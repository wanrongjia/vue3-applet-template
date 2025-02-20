<template>
	<view class="popup" v-if="visible" @touchmove.stop.prevent @click="$emit('closed')">
		<view class="panel" @touchmove.stop.prevent @click.stop>
			<view class="panel-card">
				<view class="panel-card-qrcode">
					<u-image width="660rpx" height="1060rpx" :src="tempImage" @touchmove.stop.prevent />
				</view>
				<canvas class="panel-card-qrcode" style="position:fixed;left:100%;" canvas-id="qrcode"></canvas>
			</view>
			<view class="panel-closed" @click.stop="save">保存海报</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { buildIcon } from '@/utils/icon';
import { drawRoundImage, drawEllipsisText, drawLine, drawRoundedBorder, drawMultilineEllipsisText } from "@/utils/CanvasTools"
import UQRCode from 'uqrcodejs';
const visible: Ref<boolean> = ref(false)
const tempImage: Ref<string> = ref("")
const $instance: Ref<ComponentPublicInstance | null> = ref(getCurrentInstance()!.proxy)
const save = () => {
	uni.showToast({
		title: "请长按保存相册",
		icon: 'none'
	})
}
const open = () => {
	visible.value = true
	uni.showLoading({
		title: "海报生成中",
		mask: true
	})
	nextTick(() => {
		handlerOpen()
	})
}
const getImageInfo = (src: string) => {
	return new Promise((resolve, reject) => {
		uni.getImageInfo({
			src,
			success: (res) => resolve(res),
			fail: (res) => reject(res)
		})
	});
}

const handlerOpen = async () => {
	const album: Array<any> = await Promise.all([
		getImageInfo(buildIcon("/shareBg.png")),
		getImageInfo(buildIcon("/demo.png"))
	])
	// 获取uQRCode实例
	let qr = new UQRCode();
	// 设置二维码内容
	qr.data = `${location.origin}/pages/index/index${uni.$u.queryParams({})}`;
	// 设置二维码大小，必须与canvas设置的宽高一致
	qr.size = uni.$u.getPx('330rpx');
	// 设置边框
	qr.margin = uni.$u.getPx('14rpx');
	// 调用制作二维码方法
	qr.make();
	// 获取canvas上下文
	let ctx = uni.createCanvasContext('qrcode', $instance.value); // 如果是组件，this必须传入
	// 设置uQRCode实例的canvas上下文
	qr.canvasContext = ctx;
	// 调用绘制方法将二维码图案绘制到canvas上
	qr.drawCanvas();
	uni.canvasToTempFilePath({
		x: 0,
		y: 0,
		width: uni.$u.getPx('330rpx'),
		height: uni.$u.getPx('330rpx'),
		destWidth: uni.$u.getPx('330rpx'),
		destHeight: uni.$u.getPx('330rpx'),
		canvasId: 'qrcode',
		success: async (res) => {
			/* 绘制背景 */
			ctx.drawImage(album[0].path, 0, 0, uni.$u.getPx('660rpx'), uni.$u.getPx('1060rpx'))
			/* 绘制二维码 */
			ctx.drawImage(res.tempFilePath, uni.$u.getPx('460rpx'), uni.$u.getPx('790rpx'), uni.$u.getPx('134rpx'), uni.$u.getPx('134rpx'))
			/* 绘制主图 */
			drawRoundImage({
				ctx,
				imgPath: album[1].path,
				x: uni.$u.getPx('30rpx'),
				y: uni.$u.getPx('30rpx'),
				w: uni.$u.getPx('600rpx'),
				h: uni.$u.getPx('600rpx'),
				radii: {
					lt: uni.$u.getPx('24rpx'),
					rt: uni.$u.getPx('24rpx'),
					rb: 0,
					lb: 0
				}
			})
			/* 绘制二维码边框 */
			drawRoundedBorder({
				ctx,
				rect: {
					x: uni.$u.getPx('456rpx'),
					y: uni.$u.getPx('786rpx'),
					width: uni.$u.getPx('144rpx'),
					height: uni.$u.getPx('144rpx')
				},
				radius: uni.$u.getPx('10rpx'),
				style: {
					color: 'gold',
				}
			})
			/* 绘制标题 */
			drawEllipsisText({
				ctx,
				text: '【1.8米 预售1月20日发货】2025年春联情深深【金蛇迎春吃好钱多】两件套',
				x: uni.$u.getPx('60rpx'),
				y: uni.$u.getPx('660rpx'),
				maxWidth: uni.$u.getPx('540rpx'),
				style: {
					font: `${uni.$u.getPx('28rpx')}px PingFang SC bold`,
				}
			})
			/* 绘制分割线 */
			drawLine({
				ctx,
				startPoint: {
					x: uni.$u.getPx('60rpx'),
					y: uni.$u.getPx('746rpx')
				},
				endPoint: {
					x: uni.$u.getPx('600rpx'),
					y: uni.$u.getPx('746rpx')
				},
				color: '#E5E5E5'
			})
			/* 绘制头像 */
			drawRoundImage({
				ctx,
				imgPath: album[1].path,
				x: uni.$u.getPx('60rpx'),
				y: uni.$u.getPx('786rpx'),
				w: uni.$u.getPx('52rpx'),
				h: uni.$u.getPx('52rpx'),
				radii: {
					lt: uni.$u.getPx('26rpx'),
					rt: uni.$u.getPx('26rpx'),
					rb: uni.$u.getPx('26rpx'),
					lb: uni.$u.getPx('26rpx')
				}
			})
			/* 绘制用户名 */
			drawEllipsisText({
				ctx,
				text: '张三',
				x: uni.$u.getPx('132rpx'),
				y: uni.$u.getPx('792rpx'),
				maxWidth: uni.$u.getPx('286rpx'),
				style: {
					font: `${uni.$u.getPx('28rpx')}px PingFang SC bold`,
				}
			})
			/* 绘制提示 */
			drawMultilineEllipsisText({
				ctx,
				text: '觉得这个很不错，推荐给你，祝你万事如意',
				x: uni.$u.getPx('132rpx'),
				y: uni.$u.getPx('840rpx'),
				maxWidth: uni.$u.getPx('286rpx'),
				maxLines: 2,
				style: {
					font: `${uni.$u.getPx('22rpx')}px PingFang SC normal`,
					fillStyle: '#999999',
					lineHeight: uni.$u.getPx('30rpx'),
				}
			})
			/* 生成图片 */
			ctx.draw(false, () => {
				uni.canvasToTempFilePath({
					x: 0,
					y: 0,
					width: uni.$u.getPx('660rpx'),
					height: uni.$u.getPx('1060rpx'),
					destWidth: uni.$u.getPx('2640rpx'),
					destHeight: uni.$u.getPx('4240rpx'),
					canvasId: 'qrcode',
					success: (result) => {
						uni.hideLoading()
						tempImage.value = result.tempFilePath

					},
					fail: () => {
						uni.hideLoading()
						uni.showToast({
							title: '生成图片失败',
							icon: 'none'
						})
					}
				}, $instance.value)
			})
		},
		fail: () => {
			uni.hideLoading()
			uni.showToast({
				title: '生成图片失败',
				icon: 'none'
			})
		}
	}, $instance.value)
}
defineExpose({ open })
</script>
<style lang="scss" scoped>
.popup {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	height: 100vh;
	width: 100%;
	z-index: 999;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
}

.panel {
	position: relative;

	&-card {
		margin-bottom: 60rpx;

		&-qrcode {
			width: 660rpx;
			height: 1060rpx;
		}
	}

	&-closed {
		width: 240rpx;
		height: 60rpx;
		background: $li-color-primary;
		border-radius: 8rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 400;
		font-size: 26rpx;
		color: #FFFFFF;
		line-height: 36rpx;
		margin: 0 auto;
	}

}
</style>

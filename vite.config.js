import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import UniPages from '@uni-helper/vite-plugin-uni-pages'
import ViteRestart from 'vite-plugin-restart'
import AutoImport from 'unplugin-auto-import/vite'

const envBase = `${process.cwd()}\\env`
// https://vitejs.dev/config/
export default ({ mode }) =>
	defineConfig({
		plugins: [
			UniPages({
				subPackages: []
			}),
			uni(),
			AutoImport({
				imports: ['vue', 'uni-app'],
			}),
			ViteRestart({
				// 通过这个插件，在修改vite.config.js文件则不需要重新运行也生效配置
				restart: ['vite.config.js'],
			}),
		],
		envDir: resolve(__dirname, 'env'),
		resolve: {
			// 配置别名
			alias: {
				'@': resolve(__dirname, 'src')
			}
		},
		css: {
			// css预处理器
			preprocessorOptions: {
				scss: {
					// 因为uni.scss可以全局使用，这里根据自己的需求调整
					// additionalData: '@import "./src/styles/global.scss";',
				}
			}
		},
		// 开发服务器配置
		server: {
			host: '0.0.0.0',
			port: loadEnv(mode, envBase).VITE_APP_PORT,
			// 请求代理
			proxy: {
				// 个人习惯，这里就用/dev作为前缀了
				'/api': {
					target: loadEnv(mode, envBase).VITE_APP_API_BASEURL,
					changeOrigin: true,
					// 路径重写，去掉/dev
					rewrite: (path) => path.replace(/^\/api/, '')
				}
			}
		},
		build: {
			// 禁用 gzip 压缩大小报告，以提升构建性能
			brotliSize: false,
			/** 配置h5打包js,css,img分别在不同文件夹start */
			assetsDir: 'static/img/',
			rollupOptions: {
				output: {
					chunkFileNames: 'static/js/[name]-[hash].js',
					entryFileNames: 'static/js/[name]-[hash].js',
					assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
				}
			}
			/** 配置h5打包js,css,img分别在不同文件夹end */
		},
		esbuild: {
			pure: ['console.log'],
			drop: ['debugger']
		}
	})

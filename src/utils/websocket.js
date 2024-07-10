import { useSystemStore } from "@/stores/system"
import sysConfig from "@/config"
const System = useSystemStore();
function pickJsonObj(value) {
	try {
		return JSON.parse(value)
	} catch (e) {
		return null;
	}
}

class WebSocketClient {
	constructor(url) {
		this.url = url;
		this.socket = null;
		this.isReconnecting = false;
		this.reconnectInterval = 3000; // 重连间隔，单位毫秒
		this.heartBeatInterval = 5000; // 心跳间隔，单位毫秒
		this.pingTimeoutDuration = 3000; // 超过这个时间，后端没有返回pong，则判定后端断线了。
		this.heartBeatTimer = null;
		this.destroy = false; // 是否销毁
	}

	connect() {
		this.socket = uni.connectSocket({
			url: this.url,
			header: {
				[sysConfig.TOKEN_NAME]: System.token || ''
			},
			complete: () => { }
		});
		this.initEventListeners();
	}

	initEventListeners() {
		this.socket.onOpen((res) => {
			// WebSocket连接已打开
			this.onConnected();
			this.startHeartBeat();
		});
		this.socket.onMessage((res) => {
			const obj = pickJsonObj(res.data);
			if (obj.type === 'PING') {
				this.resetPingTimeout();
				return
			}
			switch (obj.code) {
				case 401: {
					this.close();
					System.CLEAR_LOGIN_INFO();
					break;
				}
				case 3: {
					this.close();
					break;
				}
				case 0: {
					this.onMessage(res.data);
					this.resetPingTimeout(); // 重置计时
					break;
				}
				default: {
					this.onMessage(res.data);
					break;
				}
			}
		});

		this.socket.onClose((res) => {
			// WebSocket连接已关闭
			if (this.destroy) {
				this.onClosed()
				return;
			}
			this.stopHeartBeat();
			if (!this.isReconnecting) {
				this.reconnect();
			}
		});
	}

	sendMessage(message, callback = function () { }) {
		if (!System.token) {
			return callback(false)
		}
		if (this.socket) {
			this.socket.send({
				data: message
			});
			return callback(true)
		} else {
			this.connect();
			setTimeout(() => {
				this.socket.send({
					data: message
				});
				return callback(true)
			}, 1500)
		}
	}

	onMessage(message) {
		// 处理收到的消息
		console.log('message:', message)
	}

	startHeartBeat() {
		this.heartBeatTimer = setInterval(() => {
			this.sendMessage(JSON.stringify({
				type: 'ping'
			})); // 发送ping消息
			this.pingTimeout = setTimeout(() => {
				// 未收到pong消息，尝试重连...
				this.reconnect();
			}, this.pingTimeoutDuration);
		}, this.heartBeatInterval);
	}

	stopHeartBeat() {
		if (this.heartBeatTimer) {
			clearInterval(this.heartBeatTimer);
		}
	}

	reconnect() {
		if (!System.token) {
			return
		}
		this.isReconnecting = true;
		setTimeout(() => {
			this.onReconnect();
			this.connect();
			this.isReconnecting = false;
		}, this.reconnectInterval);
	}

	resetPingTimeout() {
		clearTimeout(this.pingTimeout); // 重置计时
	}

	close() {
		this.destroy = true;
		this.stopHeartBeat();
		if (this.socket) {
			this.socket.close();
			this.socket = null;
		}
	}
	/**
	 * 重连时触发
	 */
	onReconnect() {
		console.log('尝试重连...')
	}
	/**
	 * 连接成功时触发
	 */
	onConnected() {
		console.log('WebSocket连接已打开');
	}
	/**
	 * 断开时触发
	 */
	onClosed() {
		console.log('已断开连接')
	}
}

export default WebSocketClient;

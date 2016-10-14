var ws;
var timeout = true;

function sendmsg(msgSend) {
	var qrCode = msgSend;
	//	console.log(msgSend)
	if (!window.WebSocket) {
		alert("WebSocket not supported by this browser!");
	}
	ws = new WebSocket("ws://111.175.187.206:7000");
	//		ws = new WebSocket("ws://27.17.52.59:2017");
	//	ws = new WebSocket("ws://192.168.1.196:2017");
	//		ws = new WebSocket("ws://111.175.187.206:5006");
	ws.onclose = function(event) {
		mui.toast("onclose");
	};
	ws.onmessage = function(event) {
		var jsonData = event.data.substring(0, event.data.length - 1);
		console.log(jsonData);
		var obj = JSON.parse(jsonData);
		if (obj.data.signalName == "client_bind") {
			if (localStorage.getItem("zhiling") == "取车") {
				//				alert(qrCode)
				setTimeout(function() {
					if (timeout == true) {
						mui.toast("超时")
						clicked("../xuding/xuding.html", true, false)
							//						window.location.href = "../xuding/xuding.html";
					}
				}, 20000)

				var data = {
					"signalName": "takeCar",
					"qrCode": qrCode,
					"vehicleNo": localStorage.getItem("VehicleNo"),
					"orderId": localStorage.getItem("OrderID"),
					"account": localStorage.getItem("username"),
					"SystemNo": localStorage.getItem("SystemNo")
				};
				var msg = {
					"key": "client_message_lease",
					"sendType": "1",
					"receiver": "",
					"data": data,
					"timestamp": "",
					"sender": ""
				};
				var msgSend11 = JSON.stringify(msg) + "\b";
				mui.toast("发送指令中")
//				console.log(msgSend11)
				ws.send(msgSend11)
				return;
			}

		} else {
			timeout = false;

			switch (parseInt(obj.data.value)) {
				case 1:
					mui.toast("失败")
					break;
				case 2:
					mui.toast("消息有误")
					break;
				case 3:
					mui.toast("不支持")
					break;
				case 4:
					mui.toast("不在线")
					break;
				default:
					break;
			}
			if (localStorage.getItem("zhiling") == "取车") {
				setTimeout(function() {
					clicked("../index.html", true, false)

				}, 1000)
			} else {
				if (document.getElementById(localStorage.getItem("OrderID"))) {
					document.getElementById(localStorage.getItem("OrderID")).disabled = false;
				}
			}
		}

		if (obj.data.signalName == "returnCarReply") {
			if (obj.data.value == 0) {
				mui.toast("还车成功")
				if (obj.key == "client_message_lease") {
					returncar();
				}

				//					window.location.reload();
			} else {
				document.getElementById(localStorage.getItem("OrderID")).disabled = false;
				mui.toast("还车失败")
			}
		}
		if (obj.data.signalName == "pushDoorReply") {
			if (obj.data.value == 0) {
				mui.toast("开门成功");
				setTimeout(function() {
					clicked("../index.html", true, false)
				}, 1000)
//				mui.openWindow("../index.html");
			} else {
				document.getElementById(localStorage.getItem("OrderID")).disabled = false;
				mui.toast("开门失败")
			}
			

		}
		if (obj.data.signalName == "shutDownReply") {
			if (obj.data.value == 0) {
				mui.toast("锁门成功");
				setTimeout(function() {
					clicked("../index.html", true, false)
				}, 1000)
				
//				mui.openWindow("../index.html");

//									window.location.reload();
			} else {
				mui.toast("锁门失败")
				document.getElementById(localStorage.getItem("OrderID")).disabled = false;
			}

		}
		if (obj.data.signalName == "takeCarReply") {
			if (obj.data.value == 0) {
				mui.toast("取车成功")
				setTimeout(function() {
					clicked("../index.html", true, false)
				}, 1000)

				//				window.location.reload();
				//					window.location.href = "../xuding/xuding.html";
			} else {
				//					window.location.href = "../xuding/xuding.html";
				mui.toast("取车失败")
				setTimeout(function() {
						clicked("../xuding/xuding.html", true, false)
					}, 1000)
					//					document.getElementById(localStorage.getItem("OrderID")).disabled = false;
			}

		}

	}

	ws.onopen = function(event) {
		//		alert("2");
		console.log("onopen")
			//WebSocket Status:: Socket Open
			//// 发送一个初始化消息
		var data1 = {
			"deviceModel": "",
			"account": localStorage.getItem("username"),
			"channel": "",
			"deviceId": "",
			"permissionLevel": "200"
		}
		var msg1 = {
			"key": "client_bind",
			"timestamp": "1461312678523",
			"sendType": "3",
			"data": data1
		}
		var msgSend1 = JSON.stringify(msg1) + "\b";
		ws.send(msgSend1);
		//	ws.send("{\"key\":\"client_bind\",\"timestamp\":1461312678523,\"sendType\":\"3\",\"data\":{\"deviceModel\":\"Google Chrome\",\"account\":\"admin\",\"channel\":\"Chrome\",\"deviceId\":\"Google Chrome 38.0.2125.101 m\",\"permissionLevel\":\"200\"}}");
		//					ws.send("{\"key\":\"client_bind\",\"sendType\":\"1\",\"receiver\":\"null\",\"timestamp\":\"1461319030\",\"data\":{\"deviceModel\":\"iPhone\",\"channel\":\"IOS\",\"account\":\"admin\",\"deviceId\":\"AD7625E7-2619-4140-92B6-2E931E48314C\"}}");
		//		ws.send(msgSend);

	};
	ws.onerror = function(event) {
		mui.toast("错误");
		console.log('Client received a message', event);
	};

}
/*
 * 
 */
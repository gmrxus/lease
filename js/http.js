//function netRequest(myUrl, myData) {
//	
//	mui.ajax({
//		data: myData,
//		dataType: 'text', //服务器返回json格式数据
//		url: myUrl,
//		type: 'post', //HTTP请求类型
//		timeout: 10000, //超时时间设置为10秒；
//		success: function(data) {
//			//服务器返回响应，根据响应结果，分析是否登录成功；
//			var jsondata1 = jsondatastr(data);
//			console.log(data);
//	
//			if (typeof(getdata)=="undefined") {
//			 return;
//			}
//			getdata(jsondata1);
//			
//			
////			  alert(data);
//		},
//		error: function(xhr, type, errorThrown) {
//			//异常处理；
//			alert(type);
////			mui.toast(type);
// 
//		},
//	});
//
//}

//查询用户信息
var GetMemberInfoData = function(loginName, status, equalsOrlikes) {
		var myData = {
			loginName: loginName,
			status: status,
			equalsOrlikes: equalsOrlikes
		};
		var myUrl = HEAD + BODY + "GetMemberInfo";
		return netRequest(myUrl, myData);
	}
	//网点信息
function GetServiceNetworkInfo(networkName, networkAddress, companyName, equalsOrlikes, networkID, companyID) {
	var myData = {

		networkName: "",
		networkAddress: "",
		CompanyName: "",
		equalsOrlikes: "",
		networkID: "",
		CompanyID: ""

	};
	var myUrl = HEAD + BODY + "/GetServiceNetworkInfo";
	netRequest(myUrl, myData);
}
//站点管理－查询（）
function GetServiceNetworkForApp(pageIndex, pageSize, loginName, networkName) {
	var myData = {

		pageIndex: pageIndex,
		pageSize: pageSize,
		loginName: loginName,
		networkName: networkName
	};

	var myUrl = HEAD + "/lease/WebService2.asmx" + "/GetServiceNetworkForApp";

	netRequest(myUrl, myData);
}
//获得城市列表
function GetProvinceCity(argCondition, argIsFilterCitiesWithoutNetwork, argLoginName) {

	var myData = {
		argLoginName: argLoginName,
		argCondition: "",
		argIsFilterCitiesWithoutNetwork: "false"

	};

	var myUrl = HEAD + Basis + "/GetProvinceCity";

	netRequest(myUrl, myData);
	//	alert(myUrl);
}
//获得指定城市及其下的网店
function GetNetworkInCity(argLoginName,argCityId, argBlurAddr, argBlurNetworkName) {

	var myData = {
		argLoginName: argLoginName,
		argCityId: argCityId,
		argBlurAddr: argBlurAddr,
		argBlurNetworkName: argBlurNetworkName

	};

	var myUrl = HEAD + Basis + "/GetNetworkInCity";

	netRequest(myUrl, myData);
}
//获取指定时间内可预定车辆
function GetAvailableVehicles(argTakeCarNetworkName, argReturnCarNetworkName, argBookTime, argReturnTime) {

	var myData = {

		argTakeCarNetworkName: argTakeCarNetworkName,
		argReturnCarNetworkName: argReturnCarNetworkName,
		argBookTime: argBookTime,
		argReturnTime: argReturnTime
	};

	var myUrl = HEAD + BODY + "/GetAvailableVehicles";

	netRequest(myUrl, myData);
}

/**
 * 登陆
 * @param {Object} username
 * @param {Object} password
 */
function login(username, psd) {
	var myData = {
		loginName: username,
		passWord: psd,
		checkType: 1,
		argLeaseType: 2
	};
	var myUrl = HEAD + BODY + LOGIN;
	netRequest(myUrl, myData);

}
//根据车牌预定车辆
function BookVehicleByNo2(argLoginName, argVehicleNo, argValuationType, argTakeTime, argReturnTime, argOrderStatus, argCouponIdsJsonString, argDeductibleTypeID, argTakeCarNetworkId, argExpectReturnCarNetworkId) {
	var myData = {
		argLoginName: argLoginName,
		argVehicleNo: argVehicleNo,
		argValuationType: argValuationType,
		argTakeTime: argTakeTime,
		argReturnTime: argReturnTime,
		argOrderStatus: argOrderStatus,
		argCouponIdsJsonString: argCouponIdsJsonString,
		argDeductibleTypeID: argDeductibleTypeID,
		argTakeCarNetworkId: argTakeCarNetworkId,
		argExpectReturnCarNetworkId: argExpectReturnCarNetworkId
	};

	var myUrl = HEAD + BODY + "/BookVehicleByNo2";
	//	alert(myUrl)
	//console.log(myUrl)
	netRequest(myUrl, myData);
}
//根据车型预定车辆
//function BookVehicleByNo2(argLoginName,argVehicleNo,argValuationType,argTakeTime,argReturnTime,argOrderStatus,argCouponIdsJsonString,argDeductibleTypeID,argExpectReturnCarNetworkId) {
//var myData={
//			argLoginName: argLoginName,
//			argVehicleNo: argVehicleNo,
//			argValuationType: argValuationType,
//			argTakeTime: argTakeTime,
//			argReturnTime:argReturnTime,
//			argOrderStatus:argOrderStatus,
//			argCouponIdsJsonString:argCouponIdsJsonString,
//			argDeductibleTypeID:argDeductibleTypeID,
//			argExpectReturnCarNetworkId:argExpectReturnCarNetworkId
//	};
//	var myUrl=HEAD+BODY+"BookVehicleByNo2";
//	netRequest(myUrl,myData);
//}

//预定费用
function GetReservationCost(argVehicleType, argValuationType, argKMs, argTakeTime, argReturnTime, argCouponIdsJsonString, argDeductibleTypeId, argTakeCarNetworkId, argReturnCarNetworkId) {

	var myData = {

		argVehicleType: argVehicleType,
		argValuationType: argValuationType,
		argKMs: argKMs,
		argTakeTime: argTakeTime,
		argReturnTime: argReturnTime,
		argCouponIdsJsonString: argCouponIdsJsonString,
		argDeductibleTypeId: argDeductibleTypeId,
		argTakeCarNetworkId: argTakeCarNetworkId,
		argReturnCarNetworkId: argReturnCarNetworkId

	};

	var myUrl = HEAD + BODY + "/GetReservationCost";
	netRequest(myUrl, myData);
}
//当前会员的剩余金额是否能够预定车辆
function IsMoneyAvaliableBookVehicleByVehicleNo(argLoginName, argVehicleNo) {
	var myData = {
		argLoginName: argLoginName,
		argVehicleNo: argVehicleNo,
	};
	var myUrl = HEAD + BODY + "/IsMoneyAvaliableBookVehicleByVehicleNo";
	netRequest(myUrl, myData);

}
//得到价格策略
function getPricePolicy(typeName, valuationTypeDesc, equals, vehicleTypeIDandValuationType, companyID) {
	var myData = {

		typeName: typeName,
		valuationTypeDesc: valuationTypeDesc,
		equals: equals,
		vehicleTypeIDandValuationType: vehicleTypeIDandValuationType,
		companyID: companyID
	};

	var myUrl = HEAD + BODY + "/GetPricePolicy";
	netRequest(myUrl, myData);
}
//根据车型得到价格策略
function getPricePolicyByTypeName(typeName) {
	var myData = {

		typeName: typeName,
	};

	var myUrl = HEAD + BODY + "/GetPricePolicyByTypeName";
	netRequest(myUrl, myData);
}
//根据登录名查询优惠券信息
function getCouponByLoginName(argLoginName) {
	var myData = {
		argLoginName: argLoginName,
	};
	var myUrl = HEAD + BODY + "/GetCouponByLoginName";
	netRequest(myUrl, myData);

}
//续订
function renewCar(argOrderId, argRenewReturnTime, argRenewKMs, argformerKMs) {
	var myData = {

		argOrderId: argOrderId,
		argRenewReturnTime: argRenewReturnTime,
		argRenewKMs: argRenewKMs,
		argformerKMs: argformerKMs

	};

	var myUrl = HEAD + BODY + "/RenewCar";
	netRequest(myUrl, myData);
}
//续订费用
function getRenewCost(argOrderId, argRenewReturnTime, argRenewKMs, argformerKMs) {
	var myData = {

		argOrderId: argOrderId,
		argRenewReturnTime: argRenewReturnTime,
		argRenewKMs: argRenewKMs,
		argformerKMs: argformerKMs

	};

	var myUrl = HEAD + BODY + "/GetRenewCost";
	netRequest(myUrl, myData);
}
//根据车牌号获取基本保险费、手续费
function GetCommissionCostBeforeBookVehicle(argVehicleNo) {

	var myData = {

		argVehicleNo: argVehicleNo

	};

	var myUrl = HEAD + "/lease/WsLeaseOrderBusiness.asmx" + "/GetCommissionCostBeforeBookVehicle";
	netRequest(myUrl, myData);
}
//退订
function CancelReservationApplyForApp(argOrderId, argApplyTime) {
	var myData = {

		argOrderId: argOrderId,
		argApplyTime: argApplyTime

	};

	var myUrl = HEAD + BODY + "/CancelReservationApplyForApp";
	netRequest(myUrl, myData);
}
//退订（是否允许提交退订申请）
function IsAllowedCancelReservationApplyForApp(argOrderId) {
	var myData = {

		argOrderId: argOrderId

	};

	var myUrl = HEAD + "/Lease/WebService1.asmx" + "/IsAllowedCancelReservationApplyForApp";
	netRequest(myUrl, myData);
}

//退订费用
function GetCancelReservationCost(argOrderID) {
	var myData = {

		argOrderID: argOrderID

	};

	var myUrl = HEAD + BODY + "/GetCancelReservationCost";
	netRequest(myUrl, myData);
}
//查询消费记录
function getConsumeCostHistoryByOrderId(argOrderId) {
	var myData = {

		argOrderId: argOrderId

	};

	var myUrl = HEAD + BODY + "/GetConsumeCostHistoryByOrderId";
	netRequest(myUrl, myData);
}

//修改订单信息（还车时间、还车网点）
function ChangeOrderOfReturnCarInfo(argOrderId, argRenewReturnCarTime, argExpectReturnCarNetworkId) {
	var myData = {

		argOrderId: argOrderId,
		argRenewReturnCarTime: argRenewReturnCarTime,
		argExpectReturnCarNetworkId: argExpectReturnCarNetworkId

	};

	var myUrl = HEAD + "/Lease/WsLeaseOrderBusiness.asmx" + "/ChangeOrderOfReturnCarInfo";
	netRequest(myUrl, myData);
}
//查询异地/异店还车费用
function GetDifferentCityNetworkCost(argTakeCarNetworkId, argReturnCarNetworkId) {
	var myData = {

		argTakeCarNetworkId: argTakeCarNetworkId,
		argReturnCarNetworkId: argReturnCarNetworkId

	};

	var myUrl = HEAD + "/Lease/WsLeaseOrderBusiness.asmx" + "/GetDifferentCityNetworkCost";
	netRequest(myUrl, myData);
}
//不计免赔
function GetExcludingDeductibleType() {
	var myData;
	var myUrl = HEAD + BODY + "/GetExcludingDeductibleType";
	netRequest(myUrl);
}
//查询不计免赔费用
function GetExcludingDeductibleMoney(argDeductibleType, argMinutes) {
	var myData = {

		argDeductibleType: argDeductibleType,
		argMinutes: argMinutes

	};

	var myUrl = HEAD + "/Lease/WsLeaseBasis.asmx" + "/GetExcludingDeductibleMoney";
	netRequest(myUrl, myData);
}
//取车时间限制
function TakingCarsLimits(argOrderId, argCurrentClientTime) {
	var myData = {

		argOrderId: argOrderId,
		argCurrentClientTime: argCurrentClientTime

	};

	var myUrl = HEAD + "/Lease/WebService1.asmx" + "/TakingCarsLimits";
	netRequest(myUrl, myData);
}
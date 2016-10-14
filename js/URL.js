//var HEAD = "http://27.17.52.59:2024";
//var HEAD =  "http://192.168.1.197:2031"

var HEAD = "http://111.175.187.206:2031";
var IMG_URL = "http://111.175.187.206:2029/"; //图片地址
//var HEAD = "http://192.168.1.197:2031"
var BODY = "/lease/WebService1.asmx";
var BODY_TEL = "/lease/WsLeaseBasisForApp.asmx"; //客服电话
var BODY_MONEY = "/Lease/WsMemberInfo.asmx";
var BODY_DAYS = "/Lease/WsLeaseBasisForApp.asmx"; //提取押金天数接口地址
var Basis = "/lease/WsLeaseBasis.asmx";
var BODY_BILL = "/Lease/WebServiceBillManage.asmx";
var BILL = "/GetLimitsUnBillingAmount"; //查询该用户可获取发票的总金额
var GET_BILL = "/ApplyForBilling"; //获取发票
var ADD_BILL_TITLE = "/InsertBillTitleInfo"; //新增发票抬头
var GET_BILL_TITLE = "/GetBillTitleInfoData"; //查询已设置的发票抬头
var UPDATE_BILL_TITLE = "/UpdateBillTitleInfo"; //修改抬头
var DEL_BILL_TITLE = "/DeleteBillTitleInfo"; //删除抬头
var ADD_BILL_ADDRESS = "/InsertDeliveryInfo"; //新增发票收货地址
var GET_BILL_ADDRESS = "/GetDeliveryInfoData"; //获取发票收货地址
var UPDATE_BILL_ADDRESS = "/UpdateDeliveryInfo"; //修改发票收货地址
var DEL_BILL_ADDRESS = "/DeleteDeliveryInfo"; //删除发票收货地址

var BODY_REGULATION = "/Commons/WebServiceBasis.asmx/GetIllegalForApp"; //获取违章信息

//var BODY = "/lease/WebService2.asmx";
var LOGIN = "/Login"; //登陆
var REGISTER = "/InsertMemberInfo"; //注册
var GETSERVICENET = "/GetServiceNetworkInfo"; //获取服务网点
var GET_ALLOW_CAR = "/GetAvailableVehicles";
var GET_PRICE_POLICY = "/GetPricePolicy"; //获取价格策略
var ORDER_NO = "/BookVehicleByNo2";
var ORDER_TYPE = "/BookVehicleByType2";
var ORDER_LIST = "/RetrieveOrderInfoByLoginName"; //订单列表
var UPDATE_INFO = "/UpdateMemberInfoByLoginName"; //修改会员信息
var SELECT_CAR = "/GetSystemTime";
var CHANGE_PSD = "/ChangePassword"; //修改会员密码
var GET_QUESTION = "/GetPasswordQuestion"; //获取密保问题
var SET_QUESTION = "/SetPasswordQuestion"; //设置密保问题
var TESTING_QUESTION = "/IsValidPasswordQuestionAnswer"; //验证密保问题
var RESET_PSD = "/ResetPassword"; //重置密码
var UPLOADING_IMG = "/SaveFileIOS"; //上传图片(2张)
var ORDER_DETIAL = "/GetCostSettlement"; //获取订单的所有信息,如果已经支付,包含支付信息
var TRANSFER = "/ApplyForDrawCash"; //提现
var COUPON = "/GetCouponByLoginName"; //根据登陆名获取优惠券信息
var GET_ORDER_FOR_ID = "/RetrieveOrderInfoByOrderId"; //根据订单id获取该订单的详细信息
var GET_INSURE_COST = "/GetExcludingDeductibleInfoByOrderId"; //根据订单id获取不计免赔信息
var GET_MEMORY_MONEY = "/GetMemberAccountAvaiableMoney"; //根据有会员账号获取该会员的余额
var GET_CONSUME_HISTORY = "/GetConsumeCostHistoryByOrderId"; //根据订单号查询消费的相信信息
var GET_TIXIAN_HISTORY = "/ApplyForDrawCashHistoryRecord"; //根据登录名获取提现记录
var GET_DAYS = "/GetSystemParamSetGlobalDefinedParams"; //提取押金最小天数TRANSFER
var GET_TEL = "/GetSystemParamSetGlobalDefinedParams"; //获取客服电话

var jsondatastr;
jsondatastr = function(str) {
	var s = str.indexOf("<");
	var end = str.indexOf(">");
	var jsondata = str.substring(s, end + 1)
	jsondata = str.replace(jsondata, "");
	var endof = jsondata.indexOf(">");
	if(endof >= 0) {

		return jsondatastr(jsondata);
	} else {
		//			jsondata = eval('(' + jsondata + ')');
		jsondata = JSON.parse(jsondata);
		return jsondata;
	}
}

function stringJson(str) {

	var s = str.indexOf("<");
	var end = str.indexOf(">");
	var jsondata = str.substring(s, end + 1)
	jsondata = str.replace(jsondata, "");
	var endof = jsondata.indexOf(">");
	if(endof >= 0) {

		return stringJson(jsondata);
	} else {
		//			jsondata = eval('(' + jsondata + ')');
		//			jsondata = JSON.parse(jsondata);

		return jsondata;
	}
}
/**
 * 公有网络请求方法 
 * @param {Object} myUrl
 * @param {Object} myData
 */
function netRequest(myUrl, myData) {

	mui.ajax({
		data: myData,
		dataType: 'text', //服务器返回json格式数据
		url: myUrl,
		type: 'post', //HTTP请求类型
		timeout: 10000, //超时时间设置为10秒；
		success: function(data) {

			//服务器返回响应，根据响应结果，分析是否登录成功；
			var jsondata1 = jsondatastr(data);
			console.log(data);
			if(myUrl!=HEAD + BODY_BILL + UPDATE_BILL_ADDRESS) {
				if(typeof(getdata) == "undefined") {
					return;
				}
			}

			getdata(jsondata1, myUrl, data);

			//			  alert(data);
		},
		error: function(xhr, type, errorThrown) {
			console.log(errorThrown);
			//异常处理；

			//			console.log(type);
			//			console.log(xhr);
			//
			//			mui.toast(errorThrown);
			//			alert(type);
			//			return errorThrown;
		}
	});
}
/**
 
netRequest(url,1);
var array1;
function getdata(data,url,depth){
	if(depth==1){
		array1=data.JSON.parse(data)
	}
}
*/
/**
 * 获取密保问题 
 * 
 	{
      "QuestionId" : "0E0A941A-5A93-4F8B-83E0-DDC618D1BDAA",
      "QuestionDesc" : "您中学班主任的姓名是?",
      "IsUserDefined" : "False"
    },
    {
      "QuestionId" : "4FD7BD0F-0EB2-469C-A65F-205EBB107830",
      "QuestionDesc" : "您配偶的姓名是?",
      "IsUserDefined" : "False"
    },
    {
      "QuestionId" : "037BB4AA-C0C9-4013-954D-9E21A8F26C7D",
      "QuestionDesc" : "您父亲的姓名是?",
      "IsUserDefined" : "False"
    },
    {
      "QuestionId" : "14E73697-F4C8-4DF0-B83F-9C3C3D23D387",
      "QuestionDesc" : "您母亲的姓名是?",
      "IsUserDefined" : "False"
    }
 */
//function getQuestion(loginname) {
//	var myUrl = HEAD + BODY + GET_QUESTION;
//	var myData = {
//		argLoginName: loginname,
//		argLoginType: "1"
//	};
//	getTheQuestion(myUrl, myData);
//
//	function getTheQuestion(myUrl, myData) {
//
//		mui.ajax({
//			data: myData,
//			dataType: 'text', //服务器返回json格式数据
//			url: myUrl,
//			type: 'post', //HTTP请求类型
//			timeout: 10000, //超时时间设置为10秒；
//			success: function(data) {
//				//服务器返回响应，根据响应结果，分析是否登录成功；
//				var jsondata1 = jsondatastr(data);
//				return jsondata1;
//			},
//			error: function(xhr, type, errorThrown) {
//				//异常处理；
//				mui.toast(errorThrown);
//				
//			}
//		});
//	}
//}

//function netRequest1(myUrl, myData,netRequestListener) {
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
//			console.log(data.toString());
//			netRequestListener.getdata(jsondata1);
//
//			//			  alert(data);
//		},
//		error: function(xhr, type, errorThrown) {
//			//异常处理；
//			mui.toast(errorThrown);
//			//			alert(type);
//			//			return errorThrown;
//		}
//	});
//}
// function netRequestListener(data){
// 	this.data=data;
// 	
// }

/*
  {
  "DriverLicenseIMGPath" : "",
  "IDCardIMGPath2" : "",
  "IDCardID" : "420000198001010006",
  "MemberId" : "14",
  "Password" : "penghao",
  "Sex" : "True",
  "MemberType" : "1",
  "AuthDate" : "2015\/9\/18 0:00:00",
  "LoginName" : "penghao",
  "DriverLicenseNo" : "420000198001010006",
  "TrueName" : "&#x8;彭浩",
  "Email" : "714984169@qq.com",
  "IDCardIMGPath" : "",
  "BankCardNo" : "1",
  "RegisterDate" : "2015\/9\/18 0:00:00",
  "Remark" : "测试11",
  "OrganizationID" : "",
  "LevelID" : "2",
  "DriverLicenseIMGPath2" : "",
  "Status" : "0",
  "LastLogin" : "2016\/6\/1 9:25:53",
  "Telephone" : "13871328834",
  "PersonalIMGPath" : "IMG_Member\/46825831-a68e-4558-b3be-68a09fcb6076.png"
}
 */
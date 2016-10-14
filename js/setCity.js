var cityId = ""; //省市父ID
var depth = 0; //省市节点深度
var provinceData;
var cityData;
var countyData;
var selectedCountyId = "";
var selectedCityId = ""; //修改时，获取选中的城市ID
var selectedProvinceId = ""; //修改时，获取选中的省市ID

var param; //参数

$(function() {
	getProvinceCityCounty(); //获取数据
	// createProvinceCityDropDown(provinceData, cityData, countyData, "insert");  //新增时调用   初始化下拉框

	//getProvinceIdCityByIdCounty(rowData.CityID);    //修改前，获取省、市、区的ID    //获取省市区的ID
	//createProvinceCityDropDown(provinceData, cityData, countyData, "updata");  //修改时调用

});
//分别获取数据库省、市、区域数据
function getProvinceCityCounty() {
	ajaxGetProvinceCityCountyData("1");
	ajaxGetProvinceCityCountyData("2");
	ajaxGetProvinceCityCountyData("3");
}
//根据层级 获取数据库省市区域数据的方法
function ajaxGetProvinceCityCountyData(depth) {

	//调用接口
	$.postLoading('/Manage/GetProvinceCityCounty', {
		depth: depth
	}, function(jsonData) {

		if (depth == "1") provinceData = JSON.parse(jsonData);
		else if (depth == "2") cityData = JSON.parse(jsonData);
		else if (depth == "3") countyData = JSON.parse(jsonData);
	});

};

fun
//获取选中行的 省、市、县/区的ID
function getProvinceIdCityByIdCounty(countyId) {
	selectedCountyId = countyId;
	if (provinceData != null && cityData != null && countyData != null) {

		$.each(countyData, function(k, v) {
			if (v.cityId == selectedCountyId) {
				selectedCityId = v.parentid;
			}
		});
		$.each(cityData, function(k, v) {
			if (v.cityId == selectedCityId) {
				selectedProvinceId = v.parentid;
			}
		});
	}
}
//创建 新增/修改 面板中的“区域选择”下拉框
function createProvinceCityDropDown(provinceJson, cityJson, countyJson, title) {
	$("#selProvince option:gt(0)").remove();
	$("#selCity option:gt(0)").remove();
	$("#selDistrict option:gt(0)").remove();
	$.each(provinceJson, function(k, p) {
		var option;
		if (title == "updata" && selectedProvinceId != "" && p.cityId == selectedProvinceId) {
			option = "<option selected='selected' value='" + p.cityId + "'>" + p.name + "</option>";
		} else {
			option = "<option value='" + p.cityId + "'>" + p.name + "</option>";
		}

		$("#selProvince").append(option);
	});
	if (title == "updata") {
		$.each(cityJson, function(k, p) {
			if (p.parentid == selectedProvinceId) {
				var option;
				if (selectedCityId != "" && p.cityId == selectedCityId) {
					option = "<option selected='selected' value='" + p.cityId + "'>" + p.name + "</option>";
				} else {
					option = "<option value='" + p.cityId + "'>" + p.name + "</option>";
				}
				$("#selCity").append(option);
			}
		});
		$.each(countyJson, function(k, p) {
			if (p.parentid == selectedCityId) {
				var option;
				if (selectedCountyId != "" && p.cityId == selectedCountyId) {
					option = "<option selected='selected' value='" + p.cityId + "'>" + p.name + "</option>";
				} else {
					option = "<option value='" + p.cityId + "'>" + p.name + "</option>";
				}
				$("#selDistrict").append(option);
			}
		});
	}
	$("#selProvince").change(function() {
		var selValue = $(this).val();
		$("#selCity option:gt(0)").remove();
		$("#selDistrict option:gt(0)").remove();
		$.each(cityJson, function(k, p) {
			// 直辖市处理.|| p.parent == selValue，直辖市为当前自己
			if (p.cityId == selValue || p.parentid == selValue) {
				var option = "<option value='" + p.cityId + "'>" + p.name + "</option>";
				$("#selCity").append(option);
			}
		});
	});
	$("#selCity").change(function() {
		var selValue = $(this).val();
		$("#selDistrict option:gt(0)").remove();
		$.each(countyJson, function(k, p) {
			if (p.parentid == selValue) {
				var option = "<option value='" + p.cityId + "'>" + p.name + "</option>";
				$("#selDistrict").append(option);
			}
		});
	});
}

//
//                  <div>
//                      <select id="selProvince">
//                          <option value="0">--请选择省份--</option>
//                      </select>
//                      <select id="selCity">
//                          <option value="0">--请选择城市--</option>
//                      </select>
//                      <select id="selDistrict">
//                          <option value="0">--请选择区/县--</option>
//                      </select>
//
//                  </div>
(function() {
	var infoverfiy1 = ruleset.createDataObject("infoverfiy");
	infoverfiy1.set("datasource", "身份验证");
	infoverfiy1.set("name", "姓名是否一致");
	infoverfiy1.set("state", "无数据");

	var infoverfiy2 = ruleset.createDataObject("infoverfiy");
	infoverfiy2.set("datasource", "身份验证");
	infoverfiy2.set("name", "身份证是否一致");
	infoverfiy2.set("state", "无数据");

	var infoverfiy3 = ruleset.createDataObject("infoverfiy");
	infoverfiy3.set("datasource", "运营商");
	infoverfiy3.set("name", "姓名是否与手机号一致");
	infoverfiy3.set("state", "无数据");

	var infoverfiy4 = ruleset.createDataObject("infoverfiy");
	infoverfiy4.set("datasource", "运营商");
	infoverfiy4.set("name", "身份证是否与手机号一致");
	infoverfiy4.set("state", "无数据");

	var infoverfiy5 = ruleset.createDataObject("infoverfiy");
	infoverfiy5.set("datasource", "消费数据");
	infoverfiy5.set("name", "银行卡是否有效");
	infoverfiy5.set("state", "无数据");

	var infoverfiy6 = ruleset.createDataObject("infoverfiy");
	infoverfiy6.set("datasource", "消费数据");
	infoverfiy6.set("name", "身份证是否与银行卡一致");
	infoverfiy6.set("state", "无数据");

	var infoverfiy7 = ruleset.createDataObject("infoverfiy");
	infoverfiy7.set("datasource", "信用报告");
	infoverfiy7.set("name", "配偶身份证是否一致");
	infoverfiy7.set("state", "无数据");

	var infoverfiy8 = ruleset.createDataObject("infoverfiy");
	infoverfiy8.set("datasource", "淘宝网");
	infoverfiy8.set("name", "手机号是否为淘宝用户");
	infoverfiy8.set("state", "无数据");

	var infoverfiy9 = ruleset.createDataObject("infoverfiy");
	infoverfiy9.set("datasource", "淘宝网");
	infoverfiy9.set("name", "淘宝是否实名登记");
	infoverfiy9.set("state", "无数据");

})();
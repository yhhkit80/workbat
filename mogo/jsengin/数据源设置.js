var ruleset;
(function() {
	var checkpoints = customer.getDataObject("CHECKPOINTS");
	print(checkpoints);
	if (checkpoints) {
		var Dianhuabang = checkpoints.getBoolean("Dianhuabang") == true? "已采集" : "未采集";
		var IDVerification = checkpoints.getBoolean("IDVerification") == true? "已采集" : "未采集";
		var LaolaiReport = checkpoints.getBoolean("LaolaiReport") == true? "已采集" : "未采集";
		var MobileReport = checkpoints.getBoolean("MobileReport") == true? "已采集" : "未采集";
		var ShixinReport = checkpoints.getBoolean("ShixinReport") == true? "已采集" : "未采集";
		var ZhixingReport = checkpoints.getBoolean("ZhixingReport") == true? "已采集" : "未采集";
		var busiCustInfo = checkpoints.getBoolean("busiCustInfo") == true? "已采集" : "未采集";
		var creditReport = checkpoints.getBoolean("creditReport") == true? "已采集" : "未采集";
		var unionpay = checkpoints.getBoolean("unionpay") == true? "已采集" : "未采集";
		var CARLOANBLACK = checkpoints.getBoolean("CARLOANBLACK") == true? "已采集" : "未采集";
		var P2PBLACK = checkpoints.getBoolean("P2PBLACK") == true? "已采集" : "未采集";

		ruleset = response.createDataObject("ruleset");

		var datasorce7 = ruleset.createDataObject("datasource");
		datasorce7.set("name", "用户信息");
		datasorce7.set("state", busiCustInfo);
		
		var datasorce11 = ruleset.createDataObject("datasource");
		datasorce11.set("name", "车贷黑名单");
		datasorce11.set("state", CARLOANBLACK);
		
		var datasorce10 = ruleset.createDataObject("datasource");
		datasorce10.set("name", "P2P网贷黑名单");
		datasorce10.set("state", P2PBLACK);
		
		var datasorce8 = ruleset.createDataObject("datasource");
		datasorce8.set("name", "信用报告");
		datasorce8.set("state", creditReport);
		
		var datasorce6 = ruleset.createDataObject("datasource");
		datasorce6.set("name", "法院执行");
		datasorce6.set("state", ZhixingReport);

		var datasorce5 = ruleset.createDataObject("datasource");
		datasorce5.set("name", "法院失信");
		datasorce5.set("state", ShixinReport);

		var datasorce3 = ruleset.createDataObject("datasource");
		datasorce3.set("name", "社会赖账");
		datasorce3.set("state", LaolaiReport);
		
		var datasorce2 = ruleset.createDataObject("datasource");
		datasorce2.set("name", "身份验证");
		datasorce2.set("state", IDVerification);
		
		var datasorce1 = ruleset.createDataObject("datasource");
		datasorce1.set("name", "互联网手机卫士");
		datasorce1.set("state", Dianhuabang);

		var datasorce4 = ruleset.createDataObject("datasource");
		datasorce4.set("name", "移动运营商数据");
		datasorce4.set("state", MobileReport);

		var datasorce9 = ruleset.createDataObject("datasource");
		datasorce9.set("name", "银联卡消费数据");
		datasorce9.set("state", unionpay);
		
		var datasorce10 = ruleset.createDataObject("datasource");
		datasorce10.set("name", "淘宝网");
		datasorce10.set("state", "未采集");

	}
})();
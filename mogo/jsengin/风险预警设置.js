(function() {
	var datasourceList = ruleset.getList("datasource");
	
	var checkpoints = customer.getDataObject("CHECKPOINTS");
	
	var Dianhuabang = checkpoints.getBoolean("Dianhuabang");
	var IDVerification = checkpoints.getBoolean("IDVerification");
	var LaolaiReport = checkpoints.getBoolean("LaolaiReport");
	var MobileReport = checkpoints.getBoolean("MobileReport");
	var ShixinReport = checkpoints.getBoolean("ShixinReport");
	var ZhixingReport = checkpoints.getBoolean("ZhixingReport");
	var busiCustInfo = checkpoints.getBoolean("busiCustInfo");
	var creditReport = checkpoints.getBoolean("creditReport");
	var unionpay = checkpoints.getBoolean("unionpay");
	var CARLOANBLACK = checkpoints.getBoolean("CARLOANBLACK");
	var P2PBLACK = checkpoints.getBoolean("P2PBLACK");

	for (var i = 0; i < datasourceList.size(); i++) {
		var datasource = datasourceList.get(i);
		var name = datasource.getString("name");
		
		if (name == "法院失信") {
			var riskwarn = ruleset.createDataObject("riskwarn");
			riskwarn.set("name", "身份证");
			riskwarn.set("riskrule", "法院失信");
			if (ShixinReport == true) {
				var fayuanshixinList = customer.getList("FAYUAN_SHIXIN");
				if (fayuanshixinList != null && fayuanshixinList.size() > 0) {
					riskwarn.set("state", "高危");
				} else {
					riskwarn.set("state", "未出现");
				}
			} else {
				riskwarn.set("state", "无数据");
			}
		}
		
		if (name == "法院执行") {
			var riskwarn = ruleset.createDataObject("riskwarn");
			riskwarn.set("name", "身份证");
			riskwarn.set("riskrule", "法院执行");
			if (ZhixingReport == true) {
				var fayuanzhixingList = customer.getList("FAYUAN_ZHIXING");
				if (fayuanzhixingList != null && fayuanzhixingList.size() > 0) {
					riskwarn.set("state", "高危");
				} else {
					riskwarn.set("state", "未出现");
				}
			} else {
				riskwarn.set("state", "无数据");
			}
		}
		

		if (name == "车贷黑名单") {
			var riskwarn1 = ruleset.createDataObject("riskwarn");
			var riskwarn2 = ruleset.createDataObject("riskwarn");
			var riskwarn3 = ruleset.createDataObject("riskwarn");
			riskwarn1.set("riskrule", "车贷黑名单");
			riskwarn1.set("name", "身份证");

			riskwarn2.set("riskrule", "车贷黑名单");
			riskwarn2.set("name", "手机号");

			riskwarn3.set("riskrule", "车贷黑名单");
			riskwarn3.set("name", "户籍地址");
			if (CARLOANBLACK == true) {
				var carloanblackList = customer.getList("CARLOANBLACK");
				if (carloanblackList != null && carloanblackList.size() > 0) {
					riskwarn1.set("state", "未出现");
					riskwarn2.set("state", "未出现");
					riskwarn3.set("state", "未出现");
					for (var i = 0; i < carloanblackList.size(); i++) {
						var carloanblack = carloanblackList.get(i);
						var certno = carloanblack.getString("CERTNO");
						var phoneno = carloanblack.getString("PHONENO");
						var registryaddr = carloanblack.getString("REGISTRYADDR");
						if (request.getString("acertNo") == certno) {
							riskwarn1.set("state", "高危");
						}
						if (customer.getString("PHONE") == phoneno) {
							riskwarn2.set("state", "高危");
						}
						if (customer.getString("CENSUS_ADDR") == registryaddr) {
							riskwarn3.set("state", "高危");
						}
					}
				} else {
					riskwarn1.set("state", "未出现");
					riskwarn2.set("state", "未出现");
					riskwarn3.set("state", "未出现");
				}
			} else {
				riskwarn1.set("state", "无数据");
				riskwarn2.set("state", "无数据");
				riskwarn3.set("state", "无数据");
			}
		}
		
		
		if (name == "P2P网贷黑名单") {
			var riskwarn = ruleset.createDataObject("riskwarn");
			riskwarn.set("riskrule", "P2P网贷黑名单");
			riskwarn.set("name", "身份证");

			if (P2PBLACK == true) {
				var P2PBLACK = customer.getList("P2PBLACK");
				if (P2PBLACK != null && P2PBLACK.size() > 0) {
					riskwarn.set("state", "未出现");
					for (var i = 0; i < P2PBLACK.size(); i++) {
						var P2PBLACKONE = P2PBLACK.get(i);
						var certno = P2PBLACKONE.getString("CERTNO");
						if (request.getString("acertNo") == certno) {
							riskwarn.set("state", "高危");
						}
					}
				} else {
					riskwarn.set("state", "未出现");
				}
			} else {
				riskwarn.set("state", "无数据");
			}
		}
	}
})();
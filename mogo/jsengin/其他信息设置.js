(function() {
	// 电话信息
	var phoneinfo4 = ruleset.createDataObject("phoneinfo");
	phoneinfo4.set("name", "入网时间");
	phoneinfo4.set("state", "无数据");
	
	var phoneinfo1 = ruleset.createDataObject("phoneinfo");
	phoneinfo1.set("name", "帐户余额");
	phoneinfo1.set("state", "无数据");

	var phoneinfo2 = ruleset.createDataObject("phoneinfo");
	phoneinfo2.set("name", "实时话费");
	phoneinfo2.set("state", "无数据");

	var phoneinfo3 = ruleset.createDataObject("phoneinfo");
	phoneinfo3.set("name", "当前套餐");
	phoneinfo3.set("state", "无数据");

	// 消费
	var consumption1 = ruleset.createDataObject("consumption");
	consumption1.set("name", "每月还贷能力");
	consumption1.set("state", "无数据");

	var consumption2 = ruleset.createDataObject("consumption");
	consumption2.set("name", "是否有房");
	consumption2.set("state", "无数据");

	var consumption3 = ruleset.createDataObject("consumption");
	consumption3.set("name", "房产预估购买时间");
	consumption3.set("state", "无数据");

	var consumption4 = ruleset.createDataObject("consumption");
	consumption4.set("name", "房产估值（万元）");
	consumption4.set("state", "无数据");

	var consumption5 = ruleset.createDataObject("consumption");
	consumption5.set("name", "有无汽车");
	consumption5.set("state", "无数据");

	var consumption6 = ruleset.createDataObject("consumption");
	consumption6.set("name", "汽车预估购买时间");
	consumption6.set("state", "无数据");

	var consumption7 = ruleset.createDataObject("consumption");
	consumption7.set("name", "汽车估值（万元）");
	consumption7.set("state", "无数据");

	var consumption8 = ruleset.createDataObject("consumption");
	consumption8.set("name", "常驻城市");
	consumption8.set("state", "无数据");
	// 交易
	var transaction1 = ruleset.createDataObject("transaction");
	transaction1.set("name", "月均交易金额");
	transaction1.set("state", "无数据");

	var transaction2 = ruleset.createDataObject("transaction");
	transaction2.set("name", "月均交易笔数");
	transaction2.set("state", "无数据");

	var transaction3 = ruleset.createDataObject("transaction");
	transaction3.set("name", "单笔1万以上的交易数");
	transaction3.set("state", "无数据");

	var transaction4 = ruleset.createDataObject("transaction");
	transaction4.set("name", "单笔5万以上的交易数");
	transaction4.set("state", "无数据");

	var transaction5 = ruleset.createDataObject("transaction");
	transaction5.set("name", "夜消费金额占比");
	transaction5.set("state", "无数据");

	var transaction6 = ruleset.createDataObject("transaction");
	transaction6.set("name", "网购月数");
	transaction6.set("state", "无数据");

	var transaction7 = ruleset.createDataObject("transaction");
	transaction7.set("name", "网购主要品类");
	transaction7.set("state", "无数据");

})();
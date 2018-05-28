/**
 * Created by huzm on 15-08-21. 定义节点的属性
 * 
 */
define([ "dojo/_base/declare", "./FlowNode" ], function(declare, FlowNode) {
	return declare("riskrule.DesignNode", FlowNode, {
		onDblclick : function() {
			var type = this.data.type;// java,script,equals,call
			if (type == "request")
				return declareRequest();
			if (type == "response")
				return declareResponse();
			// FIXME 根据不同的节点类型应该提供不同的修改界面
			var title = this.data.title;// 节点标题
			var className = this.data.className;// java节点对应的java全限定名
			var method = this.data.method;// java节点对应的方法名
			var script = this.data.script;// script节点对应脚本
			var flowid = this.data.flowid;// call节点调用时指定的节点编号
			var params = this.data.params;// 节点的输入参数
			var desc = this.data.desc;// 描述
			var out = this.data.out;// 节点的输出结果
			// TODO: 弹出对话框以针对以上参数进行修改，type类型不可修改

			var json = '';
			if (params == null || params == '') {
				json = '{"total":0,"rows":[]}';
			} else {
				json = '{"total":' + params.length + ',"rows":' + JSON.stringify(params) + '}';
			}
			var data = $.parseJSON(json);
			
			if (type == "script") {
				$.viewGrid('script_table');
				$('#script_table').datagrid('loadData', data);
				$('#script').val(script);
				$('#script_desc').val(desc);
				$('#script_title').textbox('setValue', title);
				$('#script_window').window('open');
				$('#script_tabs').tabs('select','脚本');
			} else if (type == "java") {
				$.viewGrid('java_table');
				$('#java_table').datagrid('loadData', data);
				$('#className').textbox('setValue', className);
				$('#method').textbox('setValue', method);
				$('#java_desc').val(desc);
				$('#java_title').textbox('setValue', title);
				$('#java_window').window('open');
				$('#java_tabs').tabs('select','Java');
			} else if (type == "equals") {
				$.viewGrid('equals_table');
				$('#equals_table').datagrid('loadData', data);
				$('#equals_desc').val(desc);
				$('#equals_title').textbox('setValue', title);
				$('#equals_window').window('open');
				$('#equals_tabs').tabs('select','设置');
			} else if (type == "call") {
				$("#call_flow").combobox('reload');
				$("#call_flow").combobox('setValue',flowid);
				$('#call_desc').val(desc);
				$('#call_title').textbox('setValue', title);
				$('#call_window').window('open');
				$('#call_tabs').tabs('select','设置');
			} 
			
			flowNode = this;
		},
		cut : function() {
			if (this.data.type == "request")
				return;
			if (this.data.type == "response")
				return;
			this.select(false);
			for ( var key in this.links) {
				this.links[key].unlink();
			}
			for ( var index in designer.flow.nodes) {
				var data = designer.flow.nodes[index];
				if (data == this.data) {
					delete designer.flow.nodes[index];
					delete designer.nodes[data.id];
				}
			}
			designer.surface.remove(this.group);
		}
	});
});
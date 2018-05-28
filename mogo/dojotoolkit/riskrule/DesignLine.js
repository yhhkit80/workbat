/**
 * Created by huzm on 15-08-21.
 * 定义连线的属性
 */
define(["dojo/_base/declare","./FlowLine"],function(declare,FlowLine){
  return declare("riskrule.FlowNode",FlowLine,{
    onDblclick:function(){
      var condition=this.data.condition;
      //TODO:弹出窗口以修改连线条件语句
      $('#line_window').window('open');
      $("#line_condition").textbox('setValue', condition);
      
      loadParms();
      $.viewArgs();
      lineNode=this;
    },
    cut:function(){
      this.select(false);
      this.unlinkFrom();
      this.unlinkTo();
      this.designer.surface.remove(this.line);
      this.designer.surface.remove(this.leftArrow);
      this.designer.surface.remove(this.rightArrow);
      for ( var index in designer.flow.lines) {
        var data = designer.flow.lines[index];
        if (data == this.data) {
          delete designer.flow.lines[index];
          delete designer.lines[data.id];
        }
      }
    }
  });
});
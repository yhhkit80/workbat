/**
 * Created by huzm on 15-08-04.
 * 根据给定的流程节点数据结构渲染一个节点图元
 */
define(["dojo/_base/declare","wiki/gfx/ComplexIcon"],function(declare,ComplexIcon){
  return declare("riskrule.FlowNode",ComplexIcon,{
    /**
     * 该函数用来为父类构造器重载时，重新设置构造参数
     * @param designer
     * @param data
     * @returns {*[]}
     */
    preamble:function(designer,data){
      this.designer=designer;
      this.data=data;
      return [designer.surface,{
        x:data.view.x,
        y:data.view.y,
        width:data.view.width,
        height:data.view.height,
        src:dojo.baseUrl+"../riskrule/resources/"+data.type+".png",
        text:data.title
      }];
    },
    constructor:function(designer,data){
      this.designer=designer;
      this.data=data;
      this.links=[];
    },
    /**
     * 用于纪录与其相连的线，以在移动时同步刷新连线
     * @param line
     */
    link:function(line){
      for(var key in this.links){
        if(this.links[key]==line)return;
      }
      this.links.push(line);
    },
    unlink:function(line){
      for(var key in this.links){
        if(this.links[key]==line){
          delete this.links[key];
        }
      }
    },
    onDblclick:function(){
    },
    onMoved:function(){
      this.data.view.x=this.shape.x;
      this.data.view.y=this.shape.y;
      for(var key in this.links){
        this.links[key].paint();
      }
    },
    onSelect:function(selected){
      if(selected){
        if(this.designer.selectTarget&&this.designer.selectTarget!=this)this.designer.selectTarget.select(false);
        this.designer.selectTarget=this;
      }else this.designer.selectTarget=undefined;
      this.text.setShape({
        text : this.data.title
      });
    }
  });
});
/**
 * Created by huzm on 15-08-04.
 * 根据给定的流程连线数据结构渲染一条连线
 */
define(["dojo/_base/declare","wiki/gfx/ComplexLine"],function(declare,ComplexLine){
  var ConStroke={
      color:"blue",
      width:6,
      style:"solid",
      cap:"round"
    };
  return declare("riskrule.FlowNode",ComplexLine,{
    /**
     * 该函数用来为父类构造器重载时，重新设置构造参数
     * @param designer
     * @param data
     * @returns {*[]}
     */
    preamble:function(designer,data){
      this.designer=designer;
      this.data=data;
      return [designer.surface];
    },
    constructor:function(designer,data){
      this.designer=designer;
      this.data=data;
      var view=this.data.view;
      if(!view)view={
        "from":{
          "x":100,
          "y":172,
          "r":10
        },
        "to":{
          "x":300,
          "y":402,
          "r":10
        }
      };
      this.from(view.from.x,view.from.y,view.from.r);
      this.to(view.to.x,view.to.y,view.to.r);
    },
    _getStroke:function(){
      if(!this.data.condition)return this.inherited(arguments);
      return ConStroke;
    },
    _compute:function(){
      if(this.fromNode){
        this.shape.from={
          x:this.fromNode.data.view.x,
          y:this.fromNode.data.view.y,
          r:this.fromNode.data.view.width/2+5
        }
      }
      if(this.toNode){
        this.shape.to={
          x:this.toNode.data.view.x,
          y:this.toNode.data.view.y,
          r:this.toNode.data.view.width/2+5
        }
      }
      this.inherited(arguments);
    },
    onDblclick:function(){
    },
    onSelect:function(selected){
      if(selected){
        if(this.designer.selectTarget&&this.designer.selectTarget!=this)this.designer.selectTarget.select(false);
        this.designer.selectTarget=this;
      }else this.designer.selectTarget=undefined;
    },
    linkFrom:function(node){
      if(this.toNode==node)return false;
      if(this.toNode)for(var index in this.designer.lines){
        var line=this.designer.lines[index];
        if(line==this)continue;
        if(line.fromNode==node&&line.toNode==this.toNode)return false;
      }
      this.data.from=node.data.id;
      this.fromNode=node;
      node.link(this);
      this.paint();
      return true;
    },
    unlink:function(node){
      if(this.fromNode==node)this.unlinkForm();
      if(this.toNode==node)this.unlinkTo();
    },
    unlinkFrom:function(){
      this.data.from=undefined;
      if(this.fromNode){
        this.fromNode.unlink(this);
        this.fromNode=undefined;
        this.paint();
      }
    },
    linkTo:function(node){
      if(this.fromNode==node)return false;
      if(this.fromNode)for(var index in this.designer.lines){
        var line=this.designer.lines[index];
        if(line==this)continue;
        if(line.toNode==node&&line.fromNode==this.fromNode)return false;
      }
      this.data.to=node.data.id;
      this.toNode=node;
      node.link(this);
      this.paint();
      return true;
    },
    unlinkTo:function(){
      this.data.to=undefined;
      if(this.toNode){
        this.toNode.unlink(this);
        this.toNode=undefined;
        this.paint();
      }
    },
    onFromMoved:function(x,y){
      this.data.view.from.x=x;
      this.data.view.from.y=y;
      var nodes=this.designer.nodes;
      for(var key in nodes){
        var node=nodes[key];
        var view=node.data.view;
        if((view.x-view.width/2<x)&&(x<view.x+view.width/2)){
          if((view.y-view.height/2<y)&&(y<view.y+view.height/2)){
            if(node.data.type=="response")continue;
            if(this.linkFrom(node))
              return;
          }
        }
      }
      this.unlinkFrom();
    },
    onToMoved:function(x,y){
      this.data.view.to.x=x;
      this.data.view.to.y=y;
      var nodes=this.designer.nodes;
      for(var key in nodes){
        var node=nodes[key];
        var view=node.data.view;
        if(view.x-view.width/2<x&&x<view.x+view.width/2){
          if(view.y-view.height/2<y&&y<view.y+view.height/2){
            if(node.data.type=="request")continue;
            if(this.linkTo(node))
              return;
          }
        }
      }
      this.unlinkTo();
    }
  });
});
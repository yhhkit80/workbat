/**
 * Created by huzm on 15-08-02.
 * 创建流程设计器，从提供的函数中加载初始流程定义并渲染。
 */
define(["dojo/_base/declare","dojox/gfx","./DesignNode","./DesignLine"],function(declare,GFX,DesignNode,DesignLine){
  return declare("riskrule.FlowDesigner",null,{
    constructor:function(props,node){
      this.config=props;
      this.config.width=this.config.width|2880;
      this.config.height=this.config.height|1800
      this.surface=GFX.createSurface(node,this.config.width,this.config.height);
    },
    cut:function(){
      if(this.selectTarget)this.selectTarget.cut();
    },
    get:function(){
      return this.flow;
    },
    /**
     * 从给定的load函数加载流程定义并渲染
     * @private
     */
    load:function(data){
      this.flow=data;
      this.nodes={};
      this.lines={};
      this._loadNodes();
      this._loadLines();
    },
    /**
     * 加载并渲染所有的节点定义
     * @private
     */
    _loadNodes:function(){
      for(var key in this.flow.nodes){
        var nodeData=this.flow.nodes[key];
        if(!nodeData){
          delete this.flow.nodes[key];
          continue;
        }
        var nodeid=nodeData.id;
        var node=new DesignNode(this,nodeData);
        this.nodes[nodeid]=node;
      }
    },
    /**
     * 加载并渲染所有的连线，连线在节点之后渲染是为了真正绑定到节点对象上
     * @private
     */
    _loadLines:function(){
      for(var key in this.flow.lines){
        var lineData=this.flow.lines[key];
        if(!lineData)continue;
        var lineid=lineData.id;
        var line=new DesignLine(this,lineData);
        this.lines[lineid]=line;
        var from=this.nodes[lineData.from];
        if(from)line.linkFrom(from);
        var to=this.nodes[lineData.to];
        if(to)line.linkTo(to);
      }
    },
    createLine:function(x,y){
      var lineid;
      for(var i=1;i<10000;i++){
        lineid="line_";
        if(i<1000)lineid+='0';
        if(i<100)lineid+='0';
        if(i<10)lineid+='0';
        lineid+=i;
        if(!this.lines[lineid])break;
      }
      var lineData={
        "id": lineid,
        "condition": "",
        "view": {
          "from":{
            "x": x-100,
            "y": y,
            "r":10
          },
          "to":{
            "x": x+100,
            "y": y,
            "r":10
          }
        }
      };
      this.flow.lines.push(lineData);
      var line=new DesignLine(this,lineData);
      this.lines[lineid]=line;
    },
    createNode:function(type,x,y){
      var nodeid;
      for(var i=1;i<10000;i++){
        nodeid="node_";
        if(i<1000)nodeid+='0';
        if(i<100)nodeid+='0';
        if(i<10)nodeid+='0';
        nodeid+=i;
        if(!this.nodes[nodeid])break;
      }
      var nodeData={
        "id": nodeid,
        "title": type,
        "type": type,
        "className": "",
        "method": "",
        "script": "",
        "view": {
          "x": x,
          "y": y,
          "width": 48,
          "height": 48
        },
        "param": [],
        "out": null
      };
      this.flow.nodes.push(nodeData);
      var node=new DesignNode(this,nodeData);
      this.nodes[nodeid]=node;
    }
  });
});
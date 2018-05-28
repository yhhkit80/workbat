/**
 * Created by huzm on 15-08-01.
 * 提供缩进显示的线条实现，在(x1,y1)和(x2,y2)之间的连线上两端分别『砍掉』r1长度和r2长度
 * 这通常用于避免与目标连接物重叠连线。
 */
define(["dojo/_base/declare"],function(declare){
  return declare("wiki.gfx.IndentLine",null,{
    constructor:function(surface){
      this.surface=surface;
      this.shape={}
    },
    _getStroke:function(){
      return {
        color:"green",
        width:6,
        style:"solid",
        cap:"round"
      };
    },
    _show:function(){
      var shape=this.shape;
      if(!shape.line)return;
      var gfxLineShape={
        x1:shape.line.fromX,
        y1:shape.line.fromY,
        x2:shape.line.toX,
        y2:shape.line.toY
      };
      if(this.line)this.line.setShape(gfxLineShape);
      else{
        this.line=this.surface.createLine(gfxLineShape).setStroke(this._getStroke()).moveToBack();
        this.line.data=this;
        this.line.on("click",function(e){
          e.gfxTarget.data.onClick(e);
        });
        this.line.on("dblclick",function(e){
          e.gfxTarget.data.onDblclick(e);
        });
      }
    },
    _compute:function(){
      var shape=this.shape;
      if(!shape.from)return;
      if(!shape.to)return;
      if(!shape.line)shape.line={};
      var line=shape.line;
      line.fromRadian=Math.atan((shape.to.y-shape.from.y)/(shape.to.x-shape.from.x));
      if(shape.from.x>shape.to.x)line.fromRadian+=Math.PI;
      line.fromAngle=line.fromRadian*180/Math.PI;
      line.toRadian=line.fromRadian+Math.PI;
      line.toAngle=360-line.fromAngle;
      line.fromX=shape.from.x+Math.cos(line.fromRadian)*shape.from.r;
      line.fromY=shape.from.y+Math.sin(line.fromRadian)*shape.from.r;
      line.toX=shape.to.x+Math.cos(line.toRadian)*shape.to.r;
      line.toY=shape.to.y+Math.sin(line.toRadian)*shape.to.r;
    },
    paint:function(){
      this._compute();
      this._show();
    },
    from:function(x,y,r){
      if(r==undefined)r=0;
      var shape=this.shape;
      if(!shape.from)shape.from={};
      shape.from.x=x;
      shape.from.y=y;
      shape.from.r=r;
      this.paint();
    },
    to:function(x,y,r){
      if(r==undefined)r=0;
      var shape=this.shape;
      if(!shape.to)shape.to={};
      shape.to.x=x;
      shape.to.y=y;
      shape.to.r=r;
      this.paint();
    },
    setStroke:function(stroke){
      this.line.setStroke(stroke);
    },
    onClick:function(e){
    }
  });
});
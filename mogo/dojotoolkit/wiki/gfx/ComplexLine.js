/**
 * Created by huzm on 15-08-01.
 * 提供复合型的连线实现，连线包含单向剪头和两个牵引点
 */
define(["dojo/_base/declare","dojox/gfx/Moveable","./IndentLine"],function(declare,Moveable,IndentLine){
  var DefaultStroke={
    color:"green",
    width:6,
    style:"solid",
    cap:"round"
  };
  var ConStroke={
      color:"blue",
      width:6,
      style:"solid",
      cap:"round"
    };
  var SelectedStroke={
    color:"red",
    width:5,
    style:"solid",
    cap:"round"
  };
  return declare("wiki.gfx.ComplexLine",IndentLine,{
    constructor:function(surface){
    },
    _show:function(){
      this.inherited(arguments);
      var shape=this.shape;
      if(!shape.line)return;
      var leftArrowShape={
        x1:shape.line.toX+Math.cos(shape.line.toRadian+Math.PI/5)*15,
        y1:shape.line.toY+Math.sin(shape.line.toRadian+Math.PI/5)*15,
        x2:shape.line.toX,
        y2:shape.line.toY
      };
      var rightArrowShape={
        x1:shape.line.toX+Math.cos(shape.line.toRadian-Math.PI/5)*15,
        y1:shape.line.toY+Math.sin(shape.line.toRadian-Math.PI/5)*15,
        x2:shape.line.toX,
        y2:shape.line.toY
      };
      if(this.leftArrow)this.leftArrow.setShape(leftArrowShape);
      else this.leftArrow=this.surface.createLine(leftArrowShape).setStroke(this._getStroke());
      if(this.rightArrow)this.rightArrow.setShape(rightArrowShape);
      else this.rightArrow=this.surface.createLine(rightArrowShape).setStroke(this._getStroke());
    },
    onClick:function(){
      this.select(true);
    },
    isSelected:function(){
      this.selected;
    },
    _createFromPoint:function(){
      if(this.fromPoint)return;
      var shape=this.shape;
      this.fromPoint=this.surface.createCircle({
        cx:shape.from.x,
        cy:shape.from.y,
        r:8
      }).setFill("red");
      this.fromPoint.data=this;
      var moveable=new Moveable(this.fromPoint);
      moveable.onMove=function(mover,shift){
        var dim=mover.shape.getParent().getDimensions();
        this.onMoving(mover,shift);
        this.shape.applyLeftTransform(shift);
        this.onMoved(mover,shift);
      }
      moveable.onMoved=function(mover,shift){
        var shape=mover.shape.getShape();
        var transform=mover.shape.getTransform()||{dx:0,dy:0};
        var x=shape.cx+transform.dx;
        var y=shape.cy+transform.dy;
        mover.shape.data.from(x,y,10);
        mover.shape.data.onFromMoved(x,y);
      };
      moveable.onMoveStop=function(mover,shift){
        var dim=mover.shape.getParent().getDimensions();
        var from=mover.shape.data.shape.from;
        if(from.x<from.r)from.x=from.r;
        if(from.x>dim.width-from.r)from.x=dim.width-from.r;
        if(from.y<from.r)from.y=from.r;
        if(from.y>dim.height-from.r)from.y=dim.height-from.r;
        mover.shape.data.paint();
        mover.shape.data.select(true);
      }
    },
    _createToPoint:function(){
      if(this.toPoint)return;
      var shape=this.shape;
      this.toPoint=this.surface.createCircle({
        cx:shape.to.x,
        cy:shape.to.y,
        r:8
      }).setFill("red");
      this.toPoint.data=this;
      var moveable=new Moveable(this.toPoint);
      moveable.onMove=function(mover,shift){
        var dim=mover.shape.getParent().getDimensions();
        this.onMoving(mover,shift);
        this.shape.applyLeftTransform(shift);
        this.onMoved(mover,shift);
      }
      moveable.onMoved=function(mover,shift){
        var shape=mover.shape.getShape();
        var transform=mover.shape.getTransform()||{dx:0,dy:0};
        var x=shape.cx+transform.dx;
        var y=shape.cy+transform.dy;
        mover.shape.data.to(x,y,10);
        mover.shape.data.onToMoved(x,y);
      };
      moveable.onMoveStop=function(mover,shift){
        var dim=mover.shape.getParent().getDimensions();
        var to=mover.shape.data.shape.to;
        if(to.x<to.r)to.x=to.r;
        if(to.x>dim.width-to.r)to.x=dim.width-to.r;
        if(to.y<to.r)to.y=to.r;
        if(to.y>dim.height-to.r)to.y=dim.height-to.r;
        mover.shape.data.paint();
        mover.shape.data.select(true);
      }
    },
    select:function(flag){
      this.selected=flag;
      if(flag){
        this.line.moveToFront();
        this.setStroke(SelectedStroke);
        this.leftArrow.setStroke(SelectedStroke);
        this.rightArrow.setStroke(SelectedStroke);
        if(this.fromPoint){
          this.fromPoint.setShape({
            cx:this.shape.from.x,
            cy:this.shape.from.y,
            r:8
          }).setTransform({dx:0,dy:0});
          this.surface.add(this.fromPoint);
        }else this._createFromPoint();
        if(this.toPoint){
          this.toPoint.setShape({
            cx:this.shape.to.x,
            cy:this.shape.to.y,
            r:8
          }).setTransform({dx:0,dy:0});
          this.surface.add(this.toPoint);
        }
        else this._createToPoint();
      }else{
        this.line.moveToBack();
        this.setStroke(this._getStroke());
        this.leftArrow.setStroke(this._getStroke());
        this.rightArrow.setStroke(this._getStroke());
        if(this.fromPoint)this.surface.remove(this.fromPoint);
        if(this.toPoint)this.surface.remove(this.toPoint);
      }
      this.onSelect(flag);
    },
    toggleSelect:function(){
      this.select(!this.selected);
    },
    onSelect:function(selected){
    },
    onFromMoved:function(x,y){
    },
    onToMoved:function(x,y){
    }
  });
});
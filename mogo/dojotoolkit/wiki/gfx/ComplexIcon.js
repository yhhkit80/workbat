/**
 * Created by huzm on 15-08-01.
 * 提供复合型图标实现
 */
define(["dojo/_base/declare","dojox/gfx/Moveable"],function(declare,Moveable){
  return declare("wiki.gfx.ComplexIcon",null,{
    /**
     * @param surface 画板或由其创建的group
     * @param shape {
     *     x:
     *     y:(x,y)共同决定了复合型图标的中心点，其位置参考了widht/2,height/2
     *     width:图标的宽度
     *     height:图标的高度
     *     src:图片路径
     *     text:在图片下方居中显示文字
     *   }
     */
    constructor:function(surface,shape){
      this.surface=surface;
      this.shape=shape;
      this.group=surface.createGroup();
      {//渲染图片
        this.image=this.group.createImage({
          x:this.shape.x-this.shape.width/2,
          y:this.shape.y-this.shape.height/2,
          width:this.shape.width,
          height:this.shape.height,
          src:this.shape.src
        }).moveToFront();
        this.image.data=this;
      }
      {//添加文字
        this.text=this.group.createText({
          x:this.shape.x,
          y:this.shape.y+this.shape.height/2+12,
          align:"middle",
          text:this.shape.text
        }).setStroke({
          color:"black"
        }).setFont({
          size:12,
          style:"bold"
        });
        this.text.data=this;
      }
      {//添加选择框
        this.rect=this.group.createRect({
          x:this.shape.x-this.shape.width/2-1,
          y:this.shape.y-this.shape.height/2-1,
          width:this.shape.width+2,
          height:this.shape.height+2
        }).setStroke({
          color:"red",
          width:1,
          style:"solid",
          cap:"round"
        });
        this.rect.data=this;
        this.select(false);
      }
      {//添加移动支持
        this.group.data=this;
        this.moveable=new Moveable(this.group);
        this.moveable.onMove=function(mover,shift){
          var data=this.shape.data;
          var dim=this.shape.getParent().getDimensions();
          if(data.shape.x+shift.dx<0)return;
          if(data.shape.y+shift.dy<0)return;
          if(data.shape.x+shift.dx>dim.width)return;
          if(data.shape.y+shift.dy>dim.height)return;
          this.onMoving(mover,shift);
          this.shape.applyLeftTransform(shift);
          this.onMoved(mover,shift);
        }
        this.moveable.onMoved=function(e,tar){
          var data=e.shape.data;
          var shape=data.image.getShape();
          var transform=e.shape.getTransform();
          data.shape.x=shape.x+transform.dx+data.shape.width/2;
          data.shape.y=shape.y+transform.dy+data.shape.width/2;
          data.onMoved();
        };
      }
      {
        this.group.on("click",function(e){
          e.gfxTarget.data.onClick(e);
        });
        this.group.on("dblclick",function(e){
          e.gfxTarget.data.onDblclick(e);
        });
        this.group.on("contextmenu",function(e){
          e.gfxTarget.data.onContextmenu(e);
          dojo.stopEvent(e);
        });
      }
    },
    setText:function(text){
      this.shape.text=text;
      this.text.setShape({
        x:this.shape.x,
        y:this.shape.y+this.shape.height/2+12,
        align:"middle",
        text:this.shape.text
      });
    },
    getShape:function(){
      return this.shape;
    },
    isSelected:function(){
      this.this.selected;
    },
    select:function(flag){
      this.selected=flag;
      if(flag)this.group.add(this.rect);
      else this.group.remove(this.rect);
      this.onSelect(flag);
    },
    toggleSelect:function(){
      this.select(!this.selected);
    },
    onClick:function(e){
      this.select(true);
    },
    onDblclick:function(e){
    },
    onMoved:function(){
    },
    onContextmenu:function(e){
    },
    onSelect:function(selected){
    }
  });
});
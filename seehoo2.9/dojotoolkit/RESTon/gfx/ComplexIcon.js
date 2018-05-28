define(["dojo/_base/declare","dojox/gfx/Moveable"],function(t,e){return t(null,{constructor:function(t,h){this.surface=t;this.shape=h;this.group=t.createGroup();{this.image=this.group.createImage({x:this.shape.x-this.shape.width/2,y:this.shape.y-this.shape.height/2,width:this.shape.width,height:this.shape.height,src:this.shape.src}).moveToFront();this.image.data=this}{this.text=this.group.createText({x:this.shape.x,y:this.shape.y+this.shape.height/2+12,align:"middle",text:this.shape.text}).setStroke({color:"black"}).setFont({size:12,style:"bold"});this.text.data=this}{this.rect=this.group.createRect({x:this.shape.x-this.shape.width/2-1,y:this.shape.y-this.shape.height/2-1,width:this.shape.width+2,height:this.shape.height+2}).setStroke({color:"red",width:1,style:"solid",cap:"round"});this.rect.data=this;this.select(false)}{this.group.data=this;this.moveable=new e(this.group);this.moveable.onMove=function(t,e){var h=this.shape.data;var s=this.shape.getParent().getDimensions();if(h.shape.x+e.dx<0)return;if(h.shape.y+e.dy<0)return;if(h.shape.x+e.dx>s.width)return;if(h.shape.y+e.dy>s.height)return;this.onMoving(t,e);this.shape.applyLeftTransform(e);this.onMoved(t,e)};this.moveable.onMoved=function(t,e){var h=t.shape.data;var s=h.image.getShape();var i=t.shape.getTransform();h.shape.x=s.x+i.dx+h.shape.width/2;h.shape.y=s.y+i.dy+h.shape.width/2;h.onMoved()}}{this.group.on("click",function(t){t.gfxTarget.data.onClick(t)});this.group.on("dblclick",function(t){t.gfxTarget.data.onDblclick(t)});this.group.on("contextmenu",function(t){t.gfxTarget.data.onContextmenu(t);dojo.stopEvent(t)})}},setText:function(t){this.shape.text=t;this.text.setShape({x:this.shape.x,y:this.shape.y+this.shape.height/2+12,align:"middle",text:this.shape.text})},getShape:function(){return this.shape},isSelected:function(){this.this.selected},select:function(t){this.selected=t;if(t)this.group.add(this.rect);else this.group.remove(this.rect);this.onSelect(t)},toggleSelect:function(){this.select(!this.selected)},onClick:function(t){this.select(true)},onDblclick:function(t){},onMoved:function(){},onContextmenu:function(t){},onSelect:function(t){}})});
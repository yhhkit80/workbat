/**
 * Created by huzm on 15-09-13.
 */
define(["dojo/_base/declare", "dojox/gfx","./Axis", "./Rotate"], function (declare,GFX, Axis, Rotate) {
    return declare("wiki.gfx.SurroundButton", null, {
        constructor: function (surface, x, y, r) {
            this.r = r;
            this.group = surface.createGroup();
            this.axis = new Axis(x, y);
            this.buttons = [];
            this.rotate = new Rotate(this.group, x, y);
        },
        load: function (datas) {
            this.buttons = [];
            var size=0;
            for (var i in datas) {
                var data = datas[i];
                if (data)size++;
            }
            var perAngle=360/size;
            for (var i in datas) {
                var data = datas[i];
                if (data){
                    var angle=perAngle*i;
                    var point=this.axis.forAngle(angle,this.r);
                    var img=this.group.createImage({
                        src:data.src,
                        width:data.width,
                        height:data.height
                    }).setStroke({width:0})
                        .setTransform([GFX.matrix.translate(point.x-data.width/2,point.y-data.height/2)
                                    ,GFX.matrix.rotategAt(angle,data.width/2,data.height/2)]);
                    img.data=data;
                    img.on("click",function(e){
                        e.gfxTarget.data.onClick(e);
                    });
                    this.buttons.push(img);
                }
            }
            var sb=this;
            var pos=0;
            setTimeout(function(){
                sb.rotate.rotateg(pos);
                pos+=8;
                if(pos<360)setTimeout(arguments.callee,10);
            },0);
        }
    });
})
;
/**
 * Created by huzm on 15-09-22.
 * 绘制扇形
 */
define(["dojo/_base/declare", "wiki/gfx/Axis"], function (declare, AXIS) {
    return {
        create:function(surface,shape){
            var axis=new AXIS(shape.cx,shape.cy);
            var start1=axis.forAngle(shape.a1,shape.r1);
            var start2=axis.forAngle(shape.a1,shape.r2);
            var end1=axis.forAngle(shape.a2,shape.r1);
            var end2=axis.forAngle(shape.a2,shape.r2);
            var path=surface.createPath();
            path.moveTo(start1.x,start1.y)
                .arcTo(shape.r1,shape.r1,shape.a1,false,true,end1.x,end1.y)
                .lineTo(end2.x,end2.y)
                .arcTo(shape.r2,shape.r2,shape.a2,false,false,start2.x,start2.y)
                .lineTo(start1.x,start1.y);
            return path;
        }
    }
});
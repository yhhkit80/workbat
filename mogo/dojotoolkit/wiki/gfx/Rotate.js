/**
 * Created by huzm on 15-09-11.
 */
define(["dojo/_base/declare","./Axis","dojox/gfx","dojox/gfx/Moveable"], function (declare,Axis,GFX,Moveable) {
    return declare("wiki.gfx.Rotate", null, {
        constructor: function (move,cx,cy,target) {
            if(target==undefined)target=[move];
            this.move=move;
            this.target=target;
            this.axis=new Axis(cx,cy);
            console.log(move);
            var surface=move.parent;
            this.container=surface._parent;
            this._init();
        },
        _init:function(){
            var rotate=this;
            var matrix=this.move._getRealMatrix()||{dx:0,dy:0};
            var moveable = new Moveable(this.move);
            moveable.onMoveStart = function (mover, shift) {
                var pos=dojo.position(rotate.container);
                this.startAngle = rotate.axis.getAngle(mover.lastX-matrix.dx-pos.x, mover.lastY-matrix.dy-pos.y) - (rotate.currentAngle || 0);
                rotate.onRotateStart(this.startAngle);
            };
            moveable.onMove = function (mover, shift) {
              var pos=dojo.position(rotate.container);
                var currentAngle = rotate.axis.getAngle(mover.lastX + shift.dx-matrix.dx-pos.x, mover.lastY + shift.dy-matrix.dy-pos.y);
                var angle = currentAngle - this.startAngle;
                rotate.rotateg(angle);
                rotate.onRotate(angle);
            };
            moveable.onMoveStop = function (mover) {
                var pos=dojo.position(rotate.container);
                var currentAngle = rotate.axis.getAngle(mover.lastX-matrix.dx-pos.x, mover.lastY-matrix.dy-pos.y);
                var angle = currentAngle - this.startAngle;
                rotate.rotateg(angle);
                rotate.onRotateStop(angle);
            };
        },
        rotateg:function(angle){
            this.currentAngle=angle;
            for(var i in this.target){
                this.target[i].setTransform([GFX.matrix.rotategAt(angle, this.axis.x, this.axis.y)]);
            }
        },
        onRotateStart:function(angle){
        },
        onRotate:function(angle){
        },
        onRotateStop:function(angle){
        }
    });
});
/**
 * Created by huzm on 15-09-05.
 */
define(["dojo/_base/declare"], function (declare) {
    return declare("wiki.gfx.Axis", null, {
        constructor: function (x, y) {
            if (y == undefined) {
                y = x.y;
                x = x.x;
            }
            this.x = x;
            this.y = y;
        },
        getAngle: function (x, y) {
            var radian = this.getRadian(x, y);
            return this.radianToAngle(radian);
        },
        getRadian: function (x, y) {
            if (y == undefined) {
                y = x.y;
                x = x.x;
            }
            if(x==this.x&&y==this.y)return 0;
            var radian = Math.atan((y - this.y) / (x - this.x)) + Math.PI / 2;
            if (x < this.x)return radian + Math.PI;
            else return radian;
        },
        forAngle: function (angle, r) {
            var radian = this.angleToRadian(angle);
            return this.forRadian(radian, r);
        },
        forRadian: function (radian, r) {
            return {
                x: this.x + Math.cos(radian-Math.PI/2) * r,
                y: this.y + Math.sin(radian-Math.PI/2) * r
            }
        },
        goTo:function(r,x,y){
            if (y == undefined) {
                y = x.y;
                x = x.x;
            }
            var radian=getRadian(x,y);
            return forRadian(r);
        },
        farAway:function(r,x,y){
            if (y == undefined) {
                y = x.y;
                x = x.x;
            }
            var radian=getRadian(x,y);
            radian=(radian+Math.PI)%(Math.PI*2);
            return {
                x: x + Math.cos(radian-Math.PI/2) * r,
                y: y + Math.sin(radian-Math.PI/2) * r
            }
        },
        radianToAngle: function (radian) {
            return radian * 180 / Math.PI;
        },
        angleToRadian: function (angle) {
            return angle * Math.PI / 180;
        },
        distance:function(x,y) {
            var rx=(x-this.x)*(x-this.x);
            var ry=(y-this.y)*(y-this.y);
            return Math.sqrt(rx+ry);
        },
        angleLess:function(angle1,angle2){
          var less=angle1-angle2;
          less%=360;
          if(less>180)less-=360;
          if(less<-180)less+=360;
          return less;
        },
        angleLessAbs:function(angle1,angle2){
          return Math.abs(this.angleLess(angle1,angle2));
        }
    });
});
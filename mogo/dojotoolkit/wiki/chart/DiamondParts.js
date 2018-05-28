/**
 * Created by huzm on 15-09-03.
 */
define(["dojo/_base/declare", "wiki/gfx/Axis", "dojox/gfx", "wiki/gfx/Rotate"], function (declare, AXIS, GFX, ROTATE) {
    //外周线条样式
    var RoundStroke = {
        color: [80, 80, 80, 0.3],
        style: "solid",
        cap: "round",
        width: 1
    };
    var BgFill = [80, 80, 80, 0.1];
    //内部坐标线样式
    var AxisStroke = {
        color: "gray",
        style: "dot",
        cap: "round",
        width: 1
    };
    //有效面积外框样式
    var AreaStroke = {
        color: "#08b180",
        style: "solid",
        cap: "round",
        width: 1
    };
    //有效面积填充颜色
    var AreaFill = [5, 201, 144, 0.5];
    return declare(null, {
        constructor: function (props, node) {
            this.config = props;
            this.config.width = this.config.width || 480;
            this.config.height = this.config.height || 480;
            this.surface = GFX.createSurface(node, this.config.width, this.config.height);
            this.center = {
                x: this.config.width / 2,
                y: this.config.height / 2
            };
            this.axis = new AXIS(this.center);
            this.radius = Math.min(this.config.width, this.config.height) / 2 - 20;
            this.pointers=[];
            this._init();
        },
        _init: function () {
            var $this=this;
            this.group = this.surface.createGroup();
            this.rotate = new ROTATE(this.group, this.center.x, this.center.y);
            this.rotate.onRotate=function(angle){
              angle=(540-angle)%360;
              if(angle<0)angle+=360;
              var min=360;
              var select;
              for(var i=0;i<$this.pointers.length;i++){
                var p=$this.pointers[i];
                var a=$this.axis.angleLessAbs(p.angle,angle);
                if(a<min){
                  min=a;
                  select=i;
                }
              }
              if($this.selected!=undefined){
                if($this.selected!=select){
                  $this.pointers[$this.selected].text.setFill("#a8a8a8");
                  $this.selected=select;
                  $this.pointers[select].text.setFill("#f1770a");
                  var action=$this.config.bottomPointer;
                  if(action)action(select);
                }
              }else{
                $this.selected=select;
                $this.pointers[select].text.setFill("#f1770a");
                var action=$this.config.bottomPointer;
                if(action)action(select);
              }
            }
            this.rotate.onRotateStop=function(angle){
              var targetAngle=540-$this.pointers[$this.selected].angle;
              var rot = this;
              var less=$this.axis.angleLess(targetAngle,angle);
              if(Math.abs(less)<2)return;
              var speed=less/20;
              setTimeout(function () {
                  angle += speed;
                  rot.rotateg(angle);
                  var less=$this.axis.angleLessAbs(targetAngle,angle);
                  if (less<1)return;
                  setTimeout(arguments.callee, 10);
              }, 0);
            }
            var loadAction = this.config.data;
            if (loadAction) {
                var data = loadAction();
                this.load(data);
            }
        },
        load: function (data) {
            this.pointers=[];
            this.group.clear();
            var size = data.length;
            var perAngle = 360 / size;
            var startAngle = (size % 2 == 0) ? (perAngle / 2) : 0;
            var innerPoly = [], outterPoly = [];
            var first, last;
            for (var i = 0; i < size; i++) {
                var node = data[i];
                var angle = startAngle + perAngle * i;
                var titlePoint = this.axis.forAngle(angle, this.radius + 20);
                var valuePoint = this.axis.forAngle(angle, this.radius * node.value / node.max);
                var outterPoint = this.axis.forAngle(angle, this.radius);
                var innerPoint = this.axis.forAngle(angle, this.radius * node.value / node.max);
                outterPoly.push(outterPoint);
                innerPoly.push(innerPoint);
                this.group.createLine({
                    x1: outterPoint.x,
                    y1: outterPoint.y,
                    x2: this.center.x,
                    y2: this.center.y
                }).setStroke(AxisStroke);
                var text=this.group.createText({
                    x: 0,
                    y: -4,
                    align: "middle",
                    text: node.title
                }).setFill("#a8a8a8")
                    .setFont({
                        size: 14,
                        family: "微软雅黑"
                    }).setTransform([GFX.matrix.rotateg(angle + 180)])
                    .applyLeftTransform({dx: titlePoint.x, dy: titlePoint.y});
                this.pointers.push({
                  angle:angle,
                  text:text
                });
                this.group.createText({
                    x: 0,
                    y: 10,
                    align: "middle",
                    text: node.value + " / " + node.max
                }).setFill("#f1770a")
                    .setFont({
                        size: 12,
                        family: "微软雅黑"
                    }).setTransform([GFX.matrix.rotateg(angle - 90)])
                    .applyLeftTransform({dx: valuePoint.x, dy: valuePoint.y});
            }
            outterPoly.push(outterPoly[0]);
            innerPoly.push(innerPoly[0]);
            this.group.createPolyline(outterPoly).setStroke(RoundStroke).setFill(BgFill).moveToBack();
            this.group.createPolyline(innerPoly).setStroke(AreaStroke).setFill(AreaFill).moveToFront;
            this.pos();
        },
        pos: function () {
            var angle = 0;
            var diamond = this;
            setTimeout(function () {
                angle += 5;
                if (angle > 360)angle = 360;
                diamond.rotate.rotateg(angle);
                if (angle >= 360){
                  diamond.rotate.onRotate(0);
                  diamond.rotate.onRotateStop(0);
                  return;
                }
                setTimeout(arguments.callee, 10);
            }, 0);
        }
    });
});
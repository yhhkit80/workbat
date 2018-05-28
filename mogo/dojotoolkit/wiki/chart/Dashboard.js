/**
 * Created by huzm on 15-09-22.
 */
define(["dojo/_base/declare", "wiki/gfx/Axis", "dojox/gfx", "dojox/gfx/Moveable", "wiki/gfx/Fan"], function (declare, AXIS, GFX, Moveable, Fan) {
    var AxisColors = [
        "#d52808",
        "#d52808",
        "#d52808",
        "#d52808",
        "#d52808",
        "#d52808",
        "#d52808",
        "#d52808",
        "#d52808",
        "#d62a09",
        "#d72e0b",
        "#d9330d",
        "#db3910",
        "#de4213",
        "#e14916",
        "#e45119",
        "#e85a1d",
        "#eb6221",
        "#ef6c25",
        "#f37429",
        "#f8802e",
        "#fa8a32",
        "#fc8e35",
        "#fe9437",
        "#ff9b3a",
        "#ffa13d",
        "#ffa740",
        "#ffac42",
        "#ffb445",
        "#ffb848",
        "#ffbe4a",
        "#ffc34d",
        "#ffc850",
        "#ffcc51",
        "#ffd254",
        "#ffd657",
        "#ffd959",
        "#ffdd5b",
        "#ffe15e",
        "#ffe35f",
        "#fee561",
        "#fbe562",
        "#f8e564",
        "#f4e565",
        "#f1e566",
        "#eee567",
        "#e9e568",
        "#e3e56a",
        "#dee56b",
        "#d9e56d",
        "#d4e56e",
        "#cfe56e",
        "#c8e570",
        "#c3e571",
        "#bce572",
        "#b7e574",
        "#afe575",
        "#a9e575",
        "#a2e577",
        "#9ae578",
        "#94e579",
        "#8ce57a",
        "#84e57b",
        "#7de57c",
        "#74e57d",
        "#6ae57e",
        "#62e57f",
        "#59e581",
        "#50e581",
        "#48e582",
        "#40e384",
        "#37e284",
        "#30e185",
        "#26e086",
        "#20df87",
        "#1ade88",
        "#14de88",
        "#13de88",
        "#0edd89",
        "#09dc8a"
    ]
    var SeparatorAngle = 2.8;
    var AxisAngle = 2.5;
    var StartAngle = 360 - SeparatorAngle * AxisColors.length / 2;
    var EndAngle = 360 + SeparatorAngle * AxisColors.length / 2;
    var StepColor = 510 / AxisColors.length;
    return declare(null, {
        constructor: function (props, node) {
            this.config = props;
            this.config.width = this.config.width || 480;
            this.config.height = this.config.height || 480;
            this.surface = GFX.createSurface(node, this.config.width, this.config.height);
            var center = {
                x: this.config.width / 2,
                y: this.config.height / 2
            };
            this.axis = new AXIS(center);
            this.radius = Math.min(this.config.width, this.config.height) / 2 - 20;
            this._init();
        },
        _init: function () {
            this.group = this.surface.createGroup();
            var configAction = this.config.axis;
            if (configAction) {
                this.setAxis(configAction());
                var scoreAction = this.config.score;
                if (scoreAction)this.setScore(scoreAction());
            }
        },
        score2Angle: function (score) {
            return StartAngle + (EndAngle - StartAngle) * (score - this.min) / (this.max - this.min);
        },
        setScore: function (data) {
            var dashboard = this;
            this.data = data;
            this.scoreText.setShape({
              text:data.score
            });
            if(data.level)this.levelText.setShape({
              text:data.level
            });
            if(data.time)this.timeText.setShape({
              text:"评估时间："+data.time
            });
            var targetAngle = this.score2Angle(data.score);
            var minAngle = this.score2Angle(this.min);
            var maxAngle = this.score2Angle(this.max);
            var currentAngle = this.angle % 360;
            if (currentAngle < 180)currentAngle += 360;
            var speed = 0;
            setTimeout(function () {
                if (dashboard.MoveStarted)return;
                var less = targetAngle - currentAngle;
                if (Math.abs(less) < 0.1 && Math.abs(speed) < 0.5)return;
                currentAngle += speed;
                speed *= 0.96;
                if (currentAngle < minAngle) {
                    currentAngle = minAngle;
                    speed *= -1;
                }
                if (currentAngle > maxAngle) {
                    currentAngle = maxAngle;
                    speed *= -1;
                }
                dashboard._setPointer(currentAngle);
                speed += less / 150;
                setTimeout(arguments.callee, 10);
            }, 0);
        },
        _setPointer: function (angle) {
            this.angle = angle;
            this.pointer.setTransform([GFX.matrix.rotategAt(angle, this.axis.x, this.axis.y)]);
        },
        setAxis: function (config) {
            var AxisLength = parseInt(this.config.width / 15);
            var dashboard = this;
            this.group.clear();
            var min = this.min = config[0];
            var max = this.max = config[config.length - 1];
            for (var i = 0; i < AxisColors.length; i++) {
                Fan.create(this.group, {
                    cx: this.axis.x,
                    cy: this.axis.y,
                    r1: this.radius - AxisLength,
                    r2: this.radius,
                    a1: StartAngle + SeparatorAngle * i,
                    a2: StartAngle + SeparatorAngle * i + AxisAngle
                }).setFill(AxisColors[i]);
            }
            Fan.create(this.group, {
                cx: this.axis.x,
                cy: this.axis.y,
                r1: this.radius - 49,
                r2: this.radius - 53,
                a1: StartAngle,
                a2: 360
            }).setFill("#e8e8e8");
            Fan.create(this.group, {
                cx: this.axis.x,
                cy: this.axis.y,
                r1: this.radius - 49,
                r2: this.radius - 53,
                a1: 0,
                a2: EndAngle
            }).setFill("#e8e8e8");
            var angles = [];
            for (var i in config) {
                var v = config[i];
                i = parseInt(i);
                if (typeof(v) == "number")
                    angles[i] = StartAngle + (EndAngle - StartAngle) * (v - min) / (max - min);
            }
            for (var i in config) {
                var v = config[i];
                i = parseInt(i);
                if (typeof(v) == "string" && i > 0 && config.length > i + 1)
                    angles[i] = (angles[i - 1] + angles[i + 1]) / 2;
            }
            for (var i in config) {
                var v = config[i];
                var angle = angles[i];
                if (angle == undefined)continue;
                var tp = this.axis.forAngle(angle, this.radius - AxisLength);
                this.group.createText({
                    x: 0,
                    y: parseInt(this.config.width / 50) + 8,
                    align: "middle",
                    text: v
                })//.setStroke([170,170,170])
                    .setFont({
                        size: parseInt(this.config.width / 30),
                        weight: "normal",
                        family: "微软雅黑"
                    }).setFill([170, 170, 170])
                    .setTransform([GFX.matrix.rotateg(angle)])
                    .applyLeftTransform({dx: tp.x, dy: tp.y});
            }
            var pointer = this.group.createPath();
            pointer.moveTo(this.axis.x, AxisLength + 40)
                .lineTo(this.axis.x - 1, AxisLength + 41)
                .lineTo(this.axis.x - 6, this.axis.y)
                .lineTo(this.axis.x - 7, this.axis.y + AxisLength + 10)
                .lineTo(this.axis.x + 7, this.axis.y + AxisLength + 10)
                .lineTo(this.axis.x + 6, this.axis.y)
                .lineTo(this.axis.x + 1, AxisLength + 41)
                .lineTo(this.axis.x, AxisLength + 40)
                .setFill("#05c990");
            this.container=this.surface._parent;
            var moveable = new Moveable(pointer);
            moveable.onMoveStart = function (mover, shift) {
                dashboard.MoveStarted = true;
            };
            moveable.onMove = function (mover, shift) {
                var pos=dojo.position(dashboard.container);
                var currentAngle = dashboard.axis.getAngle(mover.lastX + shift.dx-pos.x, mover.lastY + shift.dy-pos.y);
                currentAngle %= 360;
                if (currentAngle < 180)currentAngle += 360;
                var minAngle = dashboard.score2Angle(dashboard.min);
                var maxAngle = dashboard.score2Angle(dashboard.max);
                if (minAngle > currentAngle)currentAngle = minAngle;
                if (maxAngle < currentAngle)currentAngle = maxAngle;
                dashboard._setPointer(currentAngle);
            };
            moveable.onMoveStop = function (mover, shift) {
                dashboard.MoveStarted = false;
                dashboard.setScore(dashboard.data);
            };
            this.pointer = pointer;
            this._setPointer(this.score2Angle(min));
            this.group.createCircle({
                cx: this.axis.x,
                cy: this.axis.y,
                r: 12
            }).setFill("#05c990");
            this.group.createCircle({
                cx: this.axis.x,
                cy: this.axis.y,
                r: 7
            }).setStroke({
                color: "#ebebec",
                style: "solid",
                cap: "round",
                width: 2
            });
            this.scoreText=this.group.createText({
                x: this.axis.x,
                y: this.axis.y+86,
                align: "middle",
                text:""
            }).setFont({
                    size: 60,
                    weight: "normal",
                    family: "微软雅黑"
                }).setFill("#05c990");
            this.levelText=this.group.createText({
                x: this.axis.x,
                y: this.axis.y+125,
                align: "middle",
                text:""
            }).setFont({
                size: 32,
                weight: "normal",
                family: "微软雅黑"
            }).setFill("#05c990");
            this.timeText=this.group.createText({
                x: this.axis.x,
                y: this.axis.y+150,
                align: "middle",
                text:""
            }).setFont({
                size: 14,
                weight: "normal",
                family: "微软雅黑"
            }).setFill("#8e8e8e");
        }
    });
});
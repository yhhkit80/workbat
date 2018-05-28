/**
 * Created by huzm on 15-09-22.
 */
define(["dojo/_base/declare", "wiki/gfx/Axis", "dojox/gfx", "dojox/gfx/Moveable", "wiki/gfx/Fan"], function (declare, AXIS, GFX, Moveable, Fan) {
    var SoleplateWidth = 148;
    var CubeWidth = 126;
    var gShift = gShiftX = gShiftY = (SoleplateWidth - CubeWidth) / 2;
    var CubeMargin = 15;
    var SorptionInstance = 10;
    var ItemFill = [0, 127, 0];
    var MaskFill = [255, 0, 127, 0.5];
    var CubeColor = [150, 150, 150, 0.98];

    function computeRows(count) {
        var sqrt = Math.sqrt(count);
        var rowCount = Math.ceil(sqrt);
        var rows = [];
        for (var i = 0; i < rowCount; i++)
            rows[i] = 0;
        while (count >= rowCount) {
            for (var i = 0; i < rowCount; i++)
                rows[i]++;
            count -= rowCount;
        }
        if (count > 0) {
            if (count % 2 == 0) {
                for (var i = 0; i < parseInt(rowCount / 2); i++) {
                    rows[i]++;
                    rows[rowCount - i - 1]++;
                    count -= 2;
                    if (count < 1)break;
                }
            } else {
                var less = rowCount - count;
                var start = parseInt(less / 2);
                var size = count;
                for (var i = start; i <= start + size; i++) {
                    rows[i]++
                    count--;
                    if (count < 1)break;
                }
            }
        }
        return rows;
    }

    function computeLocs(width, count) {
        var rows = computeRows(count);
        var stepY = width / (rows.length + 1);
        var r = stepY * 2 / 5;
        var locs = [];
        for (var i = 0; i < rows.length; i++) {
            var y = (i + 1) * stepY;
            var size = rows[i];
            var stepX = width / (size + 1);
            var loc = [];
            locs.push(loc);
            for (var j = 0; j < size; j++) {
                var x = stepX * (j + 1);
                loc.push({
                    cx: x,
                    cy: y,
                    r: r,
                    stepX: stepX / 2,
                    stepY: stepY / 2
                });
            }
        }
        return locs;
    }

    function computePath(stepLength, locs) {
        var path = "";
        path += " M" + stepLength + ",0";
        path += " L0,0";
        var endPoint = " L" + stepLength + ",0";
        for (var i = 0; i < locs.length; i++) {
            var loc = locs[i];
            var point = loc[0];
            path += " L0," + point.cy;
            for (var j = 0; j < loc.length; j++) {
                point = loc[j];
                path += " L" + (point.cx - point.r) + "," + point.cy;
                path += " A" + point.r + "," + point.r + ",180,0,1," + (point.cx + point.r) + "," + point.cy;
            }
            path += " L" + stepLength + "," + point.cy;
            path += endPoint;
            endPoint = " L" + stepLength + "," + point.cy;
            path += " M" + stepLength + "," + point.cy;
            for (var j = loc.length - 1; j >= 0; j--) {
                point = loc[j];
                path += " L" + (point.cx + point.r) + "," + point.cy;
                path += " A" + point.r + "," + point.r + ",180,0,1," + (point.cx - point.r) + "," + point.cy;
            }
            path += " L0," + point.cy;
        }
        path += " L0," + stepLength;
        path += " L" + stepLength + "," + stepLength;
        path += endPoint;
        return path;
    }

    var Cube = declare(null, {
            constructor: function (surface, config, match) {
                this.surface = surface;
                this.match = match;
                this.group = surface.createGroup();
                var src = dojo.baseUrl + "../wiki/chart/images/match.png";
                for (var index in match.items) {
                    var thisMatch = this.match.items[index];
                    if (!thisMatch.match) {
                        src = dojo.baseUrl + "../wiki/chart/images/unmatch.png";
                        break;
                    }
                }
                var image = this.group.createImage({
                    x: 0,
                    y: 0,
                    width: config.width,
                    height: config.width,
                    src: src
                });
                var path = config.path;
                var has = this.has = {};
                for (var index in match.items) {
                    var thisMatch = this.match.items[index];
                    var name = thisMatch.name;
                    has[name] = thisMatch;
                }
                for (var name in config.items) {
                    var item = config.items[name];
                    if (!has[name]) {
                        path += " M" + (item.cx - item.r + 1) + "," + item.cy;
                        path += " A" + (item.r - 1) + "," + (item.r - 1) + ",180,0,1," + (item.cx + item.r - 1) + "," + item.cy;
                        path += " A" + (item.r - 1) + "," + (item.r - 1) + ",180,0,1," + (item.cx - item.r + 1) + "," + item.cy;
                    } else if (!has[name].match) {
                        this.group.createCircle({
                            cx: item.cx,
                            cy: item.cy,
                            r: item.r
                        }).setFill(MaskFill);
                    }
                }
                image.setClip({d: path + " E"});
            },
            moveTo: function (x, y) {
                this.group.applyLeftTransform({
                    dx: x,
                    dy: y
                });
                this.g = {
                    x: x,
                    y: y
                }
            }
            ,
            getG: function () {
                return this.g || {x: 0, y: 0};
            }
            ,
            showMe: function () {
                var matchInfo = this.surface.matchInfo;
                for (var name in matchInfo) {
                    matchInfo[name].innerHTML = "";
                    matchInfo[name].style.color = "white";
                }
                for (var index in this.match.items) {
                    var thisMatch = this.match.items[index];
                    var name = thisMatch.name;
                    var infoItem = matchInfo[name];
                    infoItem.innerHTML = thisMatch.reason || "";
                    if (thisMatch.match)infoItem.style.color = "#00FF00";
                    else infoItem.style.color = "#FF0000";
                }
            }
        })
        ;

    return declare(null, {
        constructor: function (props, node) {
            this.config = props;
            this.config.width = this.config.width || 600;
            this.config.height = this.config.height || 600;
            this.surface = GFX.createSurface(node, this.config.width, this.config.height);
            this.axis = new AXIS({
                x: this.config.width / 2,
                y: this.config.height / 2
            });
            this._init();
        },
        _init: function () {
            this.group = this.surface.createGroup();
            var dataAction = this.config.score;
            if (dataAction)this.load(dataAction());
        },
        load: function (data) {
            var cc = this;
            //客户行属性个数,用以确定每个属性点的布局
            var sizeOfItems = data.customer.length;
            //客户分类的类型个数
            var sizeOfClasses = 0;
            var classes = {};
            for (var i = 0; i < data.matches.length; i++) {
                var match = data.matches[i];
                if (classes[match.class]) {
                    classes[match.class].push(match);
                    continue;
                }
                classes[match.class] = [match];
                sizeOfClasses++;
            }
            //每个类型方块的宽度
            var stepLength = CubeWidth;//this.config.height / sizeOfClasses;
            //根据属性个数计算出的属性点布局,按顺序给出点阵坐标及圆的半径
            var locs = computeLocs(stepLength, sizeOfItems);
            //按名称检索的属性点布局坐标
            var locsOfItem = {};
            var index = 0;
            for (var i = 0; i < locs.length; i++) {
                var loc = locs[i]
                for (var j = 0; j < loc.length; j++) {
                    var point = loc[j];
                    var cust = data.customer[index++];
                    locsOfItem[cust.name] = {
                        name: cust.name,
                        value: cust.value,
                        title: cust.title,
                        cx: point.cx,
                        cy: point.cy,
                        r: point.r,
                        stepX: point.stepX,
                        stepY: point.stepY
                    }
                }
            }
            var cubeConfig = {
                width: stepLength,
                margin: CubeMargin,
                locs: locs,
                path: computePath(stepLength, locs),
                items: locsOfItem
            }
            //客户信息属性点面板组
            var custGroup = this.group.createGroup();
            custGroup.createImage({
                x: 0,
                y: 0,
                width: SoleplateWidth,
                height: SoleplateWidth,
                src: dojo.baseUrl + "../wiki/chart/images/soleplate.png"
            });
            var itemGroup = custGroup.createGroup();
            itemGroup.applyLeftTransform({dx: gShift, dy: gShift});
            for (var index in data.customer) {
                var cust = data.customer[index];
                var name = cust.name;
                var loc = locsOfItem[name];
                itemGroup.createCircle(loc).setFill(ItemFill);
            }
            this.custPoint = {
                dx: this.axis.x - stepLength / 2 + gShiftX,
                dy: this.axis.y - stepLength / 2 + gShiftY
            };
            custGroup.applyLeftTransform({
                dx: this.custPoint.dx - gShiftX,
                dy: this.custPoint.dy - gShiftY
            });
            var cardGroup = this.group.createGroup();
            var rowIndex = 0;
            this.cubes = [];
            for (var className in classes) {
                var y = rowIndex * stepLength;
                var children = classes[className];
                var colIndex = 0;
                for (var index in children) {
                    var x = colIndex * stepLength;
                    var child = children[index];
                    var cube = new Cube(cardGroup, cubeConfig, child);
                    cube.moveTo(x + colIndex * CubeMargin, y + rowIndex * CubeMargin);
                    this.cubes.push(cube);
                    colIndex++;
                }
                rowIndex++;
            }
            var moveable = new Moveable(cardGroup);
            moveable.onMoveStart = function (mover) {
                var tf = cardGroup.getTransform() || {dx: 0, dy: 0};
                this.current = {
                    x: tf.dx,
                    y: tf.dy
                }
            };
            moveable.onMove = function (mover, shift) {
                var x = this.current.x += shift.dx;
                var y = this.current.y += shift.dy;
                var tf = cardGroup.getTransform() || {dx: 0, dy: 0};
                var t = cc.custPoint;
                for (var index in cc.cubes) {
                    var cube = cc.cubes[index];
                    var g = cube.getG();
                    if (Math.abs(x + g.x - t.dx) < SorptionInstance && Math.abs(y + g.y - t.dy) < SorptionInstance) {
                        cardGroup.setTransform({
                            dx: t.dx - g.x,
                            dy: t.dx - g.y
                        });
                        cube.showMe();
                        return;
                    }
                }
                this.onMoving(mover, shift);
                this.shape.applyLeftTransform({
                    dx: x - tf.dx,
                    dy: y - tf.dy
                });
                this.onMoved(mover, shift);
            };
            //
            this.matchInfo = {};
            cardGroup.matchInfo = this.matchInfo;
            var content = dojo.byId("content");
            for (var index in data.customer) {
                var item = data.customer[index];
                var l1 = dojo.create("li", {innerHTML: item.title + " : " + item.value}, content);
                var ul = dojo.create("ul", {}, l1);
                this.matchInfo[item.name] = dojo.create("li", {}, ul);
            }

        }
    });
})
;
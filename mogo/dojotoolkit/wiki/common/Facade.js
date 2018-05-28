/**
 * Created by huzm on 15-09-10.
 */
define(["dojo/window","dojo/dom-construct", "dojo/_base/connect","dojox/gfx", "dojo/domReady!"]//
 , function (WINDOW,CONSTRUCT, CONNECT,GFX) {
    var facade = CONSTRUCT.create("div", {
        style: {
            position: "absolute",
            left: 0,
            top: 0,
            margin:0,
            padding:0
        }
    }, document.body, "last");
    var box=WINDOW.getBox();
    var surface=GFX.createSurface(facade,box.w,box.h);
    CONNECT.connect(window,"onresize",null,function(){
        var box=WINDOW.getBox();
        surface.setDimensions(box.w,box.h);
    });
    return {
        _getSurface:function(){
            return surface;
        },
        createGroup:function(){
            return surface.createGroup();
        }
    };
});
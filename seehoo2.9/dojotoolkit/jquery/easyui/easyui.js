define([ "../jquery", "RESTon/core", "./jquery.easyui.min",
    "./locale/easyui-lang-zh_CN" ], function(jQuery, RESTon) {
  RESTon.themesCSS("css/easyui.css");
  RESTon.themesCSS("css/icon.css");
  RESTon.themesCSS("css/common.css");
  jQuery.extend(jQuery.fn.combobox.defaults, {
    loader : function(t, e, a) {
      var r = jQuery(this).combobox("options");
      if (r.dict) {
        e(RESTon.dictList(r.dict))
      }
      if (!r.url)
        return false;
      jQuery.ajax({
        type : r.method,
        url : r.url,
        data : t,
        dataType : "json",
        success : function(t) {
          e(t)
        },
        error : function() {
          a.apply(this, arguments)
        }
      })
    }
  });
  jQuery.extend(jQuery.fn.combobox.methods, {
    getSelectRow : function(t) {
      var e = t.combobox("getValue");
      var a = jQuery.data(t[0], "combobox");
      var r = a.options.valueField;
      var o = a.data;
      for (var i = 0; i < o.length; i++) {
        if (e == o[i][r])
          return o[i]
      }
      return {}
    }
  });
  jQuery.extend(jQuery.fn.validatebox.defaults.rules, {
    maxNum : {
      validator : function(t, e) {
        return t <= e[0]
      },
      message : "最大输入为 {0}"
    }
  });
  jQuery.extend(jQuery.fn.validatebox.defaults.rules, {//验证日期在两个日期之间或相等,前或后为空时设置''，dateRangeCheck['#minDateId','#maxDateId']
    dateRangeCheck : {
      validator : function(value, param) {
        var r1 = true,r2 = true;
        function datetimeStrToObj(datestring){
          datestring = jQuery.trim(datestring);
          if(!datestring){
            return null;
          }
          var dt = datestring .split(" ");
          var _date = dt[0].split("-");
          var _time = [];
          if(dt.length > 1){
            _time = dt[1].split(":");
          }
          return new Date(_date[0],_date[1],_date[2],(_time[0]||"00"),(_time[1]||"00"),(_time[2]||"00"));
        }
        if(param[0] != '') {
          var minTarget = jQuery(param[0]);
          var minTime = (minTarget.datebox)? minTarget.datebox('getValue') : minTarget.datetimebox('getValue');
          if(value && minTime){
            var d1 = datetimeStrToObj(value);
            var d2 = datetimeStrToObj(minTime);
            r1 = d1 >= d2;
          }
        } 
        if(param[1] != '') {
          var maxTarget = jQuery(param[1]);
          var endTime = (maxTarget.datebox)? maxTarget.datebox('getValue') : maxTarget.datetimebox('getValue');
          if(value && endTime){
            var d1 = datetimeStrToObj(value);
            var d2 = datetimeStrToObj(endTime);
            r2 = d1 <= d2;
          }
        }
        return r1&&r2;
      },
      message : '请注意时间先后顺序'
    }
  });
  var buttonDir = {
    north : "down",
    south : "up",
    east : "left",
    west : "right"
  };
  jQuery.extend(jQuery.fn.layout.paneldefaults, {
    onBeforeCollapse : function() {
      var t = jQuery(this).panel("options");
      var e = t.region;
      var a = buttonDir[e];
      if (!a)
        return false;
      setTimeout(function() {
        var r = jQuery(".layout-button-" + a).closest(".layout-expand").css({
          textAlign : "center",
          lineHeight : "18px",
          fontWeight : "bold",
          color : "#0e2d5f"
        });
        if (t.title) {
          var o = t.title;
          if (e == "east" || e == "west") {
            o = t.title.split("").join("</br>");
            r.find(".panel-body").html(o)
          } else {
            jQuery(".layout-button-" + a).closest(".layout-expand").find(
                ".panel-title").css({
              textAlign : "left",
              color : "#0e2d5f"
            }).html(o)
          }
        }
      }, 100)
    }
  });
  function easyuiPanelOnMove(t, e) {
    var a = t;
    var r = e;
    if (a < 1) {
      a = 1
    }
    if (r < 1) {
      r = 1
    }
    var o = parseInt(jQuery(this).parent().css("width")) + 14;
    var i = parseInt(jQuery(this).parent().css("height")) + 14;
    var n = a + o;
    var s = r + i;
    var u = jQuery(window).width();
    var l = jQuery(window).height();
    if (n > u) {
      a = u - o
    }
    if (s > l) {
      r = l - i
    }
    if (a < 1) {
      a = 1
    }
    if (r < 1) {
      r = 1
    }
    jQuery(this).parent().css({
      left : a,
      top : r
    })
  }
  jQuery.fmoney = function(amount,n){
    var p=/(\d+)(\d{3})/;
    n = n > 0 ? n : 2;
    var s1 = parseFloat(amount).toFixed(n).split('.')[0];
    var s2 = parseFloat(amount).toFixed(n).split('.')[1];
    while(p.test(s1)){
      s1=s1.replace(p,"$1"+","+"$2");
    }
    return s1+'.'+s2;
  };
  jQuery.fn.dialog.defaults.onMove = easyuiPanelOnMove;
  jQuery.fn.window.defaults.onMove = easyuiPanelOnMove;
  jQuery.fn.panel.defaults.onMove = easyuiPanelOnMove;
  jQuery(function() {
    jQuery("[data-options]").each(function() {
      var target = jQuery(this);
      var dataoptions = jQuery.trim(target.attr("data-options"));
      if (!dataoptions)
        return;
      var options = {};
      if (dataoptions.substring(0, 1) != "{")
        dataoptions = "{" + dataoptions + "}";
      options = eval("(" + dataoptions + ")");
      var targetclass = target.attr("class");
      var auth = options.auth;
      if (auth) {
        if (!RESTon.auth(auth.authid)) {
          if (auth.type) {
            if (auth.type == "disable") {
              if (targetclass.indexOf("linkbutton") > -1) {
                target.linkbutton({
                  disabled : true
                });
                jQuery(target).attr("onclick", "javascript:void(0)")
              }
              if (targetclass.indexOf("combobox") > -1)
                target.combobox({
                  disabled : true
                });
              if (targetclass.indexOf("combo") > -1)
                target.combo({
                  disabled : true
                });
              if (targetclass.indexOf("textbox") > -1)
                target.textbox({
                  disabled : true
                });
              if (targetclass.indexOf("numberbox") > -1)
                target.numberbox({
                  disabled : true
                });
              if (targetclass.indexOf("datetimebox") > -1)
                target.datetimebox({
                  disabled : true
                });
              if (targetclass.indexOf("datebox") > -1)
                target.datebox({
                  disabled : true
                });
              if (targetclass.indexOf("validatebox") > -1)
                target.validatebox({
                  disabled : true
                });
              if (targetclass.indexOf("item") > -1) {
                var parent = jQuery(target).parent();
                if (jQuery(parent).attr("class").indexOf("menu") > -1)
                  jQuery(parent).menu("disableItem", target);
                jQuery(target).attr("onclick", "javascript:void(0)")
              }
            }
            if (auth.type == "hide") {
              target.attr("style", "display:none")
            }
          } else {
            target.attr("style", "display:none")
          }
        }
      }
    })
  });
  return jQuery
});
(function() {
  var n;
  if (window.RESTonConfig)
    n = RESTonConfig.jQueryVersion;
  if (n) {
    n = "./jquery/jquery-" + n + ".min"
  } else {
    n = "./jquery/jquery-2.2.1.min";
    if (dojo.isIE == 6 || dojo.isIE == 7 || dojo.isIE == 8)
      n = "./jquery/jquery-1.11.3.min"
  }
  define([ n ], function(n) {
    n.ajaxSetup({
      statusCode : {
        600 : function() {
          RESTon.at("RESTon").assemble("Logout")
        },
        601 : function() {
          RESTon.at("RESTon").fire("AccessDenied")
        }
      }
    });
    var i = n.ajax;
    n.ajax = function(e, t) {
      if (typeof e === "object") {
        t = e;
        e = undefined
      }
      t = t || {};
      if (!("async" in t))
        t.async = true;
      if (t.type && t.type.toUpperCase() == "POST") {
        t.contentType = t.contentType || "application/json; charset=UTF-8";
        if (t.contentType.indexOf("json") > -1)
          t.data = JSON.stringify(t.data)
      }
      return i.apply(n, [ t ])
    };
    n.fn.serializeObject = function() {
      var i = {};
      var e = this.serializeArray();
      n.each(e, function() {
        if (i[this.name] !== undefined) {
          if (!i[this.name].push) {
            i[this.name] = [ i[this.name] ]
          }
          i[this.name].push(n.trim(this.value) || "")
        } else {
          i[this.name] = n.trim(this.value) || ""
        }
      });
      return i
    };
    return n
  })
})();
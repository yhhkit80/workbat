define(["dojo/dom-construct","../common/context","./dtjava","dojo/domReady!"],function(e,a){var r;if(dojo.isIE){r=e.toDom('<object id="cafApplet" classid="clsid:8AD9C840-044E-11D1-B3E9-00805F499D93" codebase="jre6u45.exe"'+' style="left:-100;top:-100;width:100px;height:100px;maring:0px;padding:0px;">'+'<param name="archive" value="'+require.toUrl("RESTon/caf/caf.jar")+'" />'+'<param name="type" value="application/x-java-applet;jpi-version=1.6" />'+'<param name="code" value="com.pactera.caf.core.CAF" />'+'<param name="name" value="Common Applet Framework" />'+'<param name="permissions" value="all-permissions" />'+'<param name="boxmessage" value="loading" />'+'<param name="boxborder" value="false" />'+'<param name="scriptable" value="true" />'+'<param name="mayscript" value="true" />'+'<param name="image" value="caf.gif" />'+'<param name="log" value="caf" />'+"</object>");e.place(r,document.body,"last")}else{r=e.create("applet",{style:{position:"absolute",left:-100,top:-100,width:100,height:100,margin:0,padding:0},alt:"Java isn't installed or doesn't work",name:"Common Applet Framework",archive:require.toUrl("RESTon/caf/caf.jar"),code:"com.pactera.caf.core.CAF",scriptable:"true",mayscript:"true",permissions:"all-permissions",log:"caf"},document.body,"last")}function t(){return c("java.lang.System","getProperty","java.version")}function n(e,a){if(!r)return;if(a)r.log(e,a);else r.log(e)}function o(e,a){if(!r)return null;if(a)return r.newLogger(e,a);else return r.newLogger(e)}function i(e){return r.loadLib(e)}function s(e){return r.forName(e)}function l(e,a){if(t()<="1.6.0_10"){if(typeof a=="function"&&arguments.length==2){return r.javaCreateWithCallback(e,a)}}var n=a;if(typeof e=="object"&&"constructor"in e){n=e.params;e=e.className}else if(!isArray(a)){n=[];for(var o=1;o<arguments.length;o++){var i=arguments[o];n[n.length]=i}}return r.javaCreate(e,j(n))}function u(e,a,t){var n=t;if(typeof e=="object"&&"constructor"in e){n=e.params;a=e;e=e.className}else if(!isArray(t)){n=[];for(var o=2;o<arguments.length;o++)n[n.length]=arguments[o]}return r.asyncCreate(e,a,j(n))}function c(e,a,t){if(typeof e=="object"&&"constructor"in e){var n=e.params;a=e.methodName;if("object"in e){e=e.object;return r.instanceInvoke(e,a,j(n))}else{e=e.className;return r.javaInvoke(e,a,j(n))}}else if(!isArray(t)){var n=[];for(var o=2;o<arguments.length;o++)n[n.length]=arguments[o];return r.javaInvoke(e,a,j(n))}else return r.javaInvoke(e,a,j(t))}function v(e,a,t,n){if(typeof e=="object"&&"constructor"in e){var o=e.params;t=e;a=e.methodName;if("object"in e){e=e.object;return r.asyncInstanceInvoke(e,a,t,j(o))}else{e=e.className;return r.asyncJavaInvoke(e,a,t,j(o))}}else if(!isArray(n)){var o=[];for(var i=3;i<arguments.length;i++)o[o.length]=arguments[i];return r.asyncJavaInvoke(e,a,t,j(o))}else return r.asyncJavaInvoke(e,a,t,j(n))}function f(e,a){if(typeof e=="object"){a=e.fieldName;e=e.className}return r.javaField(e,a)}function m(e){if(e)return r.createEmbed(e);else return r.createEmbed("javascript")}var p;function g(e){var a=p||(p=m());var r="";if(arguments.length>1){var t="arg"+new String((new Date).getTime()).substring(4)+parseInt(Math.random()*10);for(var n=1;n<arguments.length;n++){a.put(t+n,arguments[n]);if(n>1)r+=",";r+=t+n}}var o="var __anonymous__="+e+";__anonymous__("+r+");";var i=a.eval(o);if(arguments.length>1)for(var n=1;n<arguments.length;n++)a.remove(t+n);return i}function d(e,a){var r=s(e);return c("java.lang.reflect.Array","newInstance",r,a)}function j(e){if(e){if(isArray(e)){var a=r.newArrays(e.length);for(var t in e)a[t]=e[t];return a}else{var a=r.newArrays(arguments.length);for(var t=0;t<arguments.length;t++)a[t]=arguments[t];return a}}else return r.newArrays(0)}function y(){var e=c("java.net.InetAddress","getLocalHost");return e.getHostAddress()}function h(){var e=c("java.lang.System","getProperty","java.class.version");return parseFloat(e)}function b(){r.allow()}function A(){r.setNonProxy()}function w(e){var a=l("java.text.SimpleDateFormat",e);var r=l("java.util.Date");return a.format(r)}function x(e){var a=c("java.util.prefs.Preferences","systemRoot");if(e)return a.node(e);else return a}function I(e){var a=c("java.util.prefs.Preferences","userRoot");if(e)return a.node(e);else return a}function k(e){if(!e)return null;var a=$caf.javaCreate("java.util.HashMap");for(var r in e){var t=e[r];a.put(r,t)}return a}function C(e){if(!e)return null;var a={};var r=e.entrySet().iterator();while(r.hasNext()){var t=r.next();var n=t.getKey();var o=t.getValue();a[n]=o}return a}function N(e){if(!e)return null;var a=$caf.javaCreate("java.util.HashSet");for(var r in e){var t=e[r];a.add(t)}return a}function S(e){if(!e)return null;var a=[];var r=e.iterator();while(r.hasNext()){var t=r.next();a[a.length]=t}return a}function D(){return r.getLogDirectory()}function F(e){r.queueJS(e)}var L={getJavaVersion:t,log:n,newLogger:o,loadLib:i,forName:s,javaCreate:l,asyncCreate:u,javaInvoke:c,asyncInvoke:v,javaField:f,createEmbed:m,embed:g,newArray:d,toArray:j,getLocalAddress:y,getClassVersion:h,allow:b,setNonProxy:A,timeString:w,sysPref:x,userPref:I,js2map:k,map2js:C,js2set:N,set2js:S,getLogDirectory:D,queueJS:F};return L});
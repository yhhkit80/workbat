/**
 * Created by huzm on 15-05-07.
 */

(function(){
  var createAtContainer=function(){
    var contexts=[];
    var DEFAULT_CONTEXT="___DEFAULT___CONTEXT___";

    function getContext(contextName,create){
      var context=contexts[contextName];
      if(create&& !context){
        var listeners=[];
        var stores=[];
        var hopes=[];
        context=contexts[contextName]={
          ready:function(hopeName,callback){
            var hope=hopes[hopeName];
            if(!hope)hope=hopes[hopeName]={
              ready:false,
              hopeQ:[]
            };
            if(callback){
              require(["dojo/domReady!"],function(READY){
                if(hope.ready)callback();
                else hope.hopeQ.push(callback);
              });
            }else{
              hope.ready=true;
              while(hope.hopeQ.length){
                try{
                  (hope.hopeQ.shift())();
                }catch(e){
                }
              }
            }
          },
          fire:function(eventName,data){
            var listener=listeners[eventName];
            if(!listener)return;
            var args=[];
            for(var i=0; i<arguments.length; i++)
              args[i]=arguments[i];
            for(var index in listener){
              var listen=listener[index];
              try{
                listen.callback.apply(this,args);
              }catch(e){
                delete(listener[index]);
              }
              if(listen.once)delete(listener[index]);
            }
          },
          on:function(eventName,callback){
            var listener=listeners[eventName];
            if(!listener)listener=listeners[eventName]=[];
            listener.push({
              callback:callback
            });
          },
          once:function(eventName,callback){
            var listener=listeners[eventName];
            if(!listener)listener=listeners[eventName]=[];
            listener.push({
              callback:callback,
              once:true
            });
          },
          off:function(eventName,callback){
            var listener=listeners[eventName];
            if(!listener)return;
            for(var index in listener){
              if(listener[index].callback==callback)delete(listener[index]);
            }
          },
          set:function(key,value){
            stores[key]=value;
          },
          get:function(key){
            return stores[key];
          }
        };
      }
      return context;
    }

    window["__/wiki/global"]={
      at:function(context,create){
        if(create==undefined)create=true;
        return getContext(context,create);
      },
      ready:function(hopeName,callback){
        this.at(DEFAULT_CONTEXT).ready(hopeName,callback);
      },
      fire:function(eventName,data){
        this.at(DEFAULT_CONTEXT).fire(eventName,data);
      },
      once:function(eventName,callback){
        this.at(DEFAULT_CONTEXT).once(eventName,callback);
      },
      on:function(eventName,callback){
        this.at(DEFAULT_CONTEXT).on(eventName,callback);
      },
      set:function(key,value){
        this.at(DEFAULT_CONTEXT).set(key,value);
      },
      get:function(key){
        return this.at(DEFAULT_CONTEXT).get(key);
      }
    }
  }

  function getSharedContainer(){
    return top;
  }

  function getSharedContext(){
    var container=getSharedContainer();
    if(!container["__/wiki/global"])
      container.eval("("+createAtContainer+")();");
    return container["__/wiki/global"];
  }

  if(window["define"])define([],function(){
    return getSharedContext();
  });else window.GLOBAL=getSharedContext();
})();

//三对开关按钮，传的参数为（'open'/'close'，目标id，$(this)）
function o_c_btn(o_c,id,self){
  self.hide().siblings().show();
  $('#'+id).panel(o_c);
  $('#body').layout('resize');
  $('#inbody').layout('resize');
}

/*树形菜单刷新json目录数据库*/
function tree_reload(treeid){
  $(treeid).tree('reload');
}
/*树形菜单展开/折叠状态切换*/
function tree_slide(treeid){
  this.tree_boolean=!this.tree_boolean;
  this.tree_boolean?$(treeid).tree('expandAll'):$(treeid).tree('collapseAll');
}

//过滤树形菜单权限
function authTreeCheck(data){
  for(var i=0;i<data.length;i++){
    if(data[i].auth){
      if(!RESTon.auth(data[i].auth)){
        data.splice(i,1);
        i=i-1;
        continue;
      }
    }
    if(data[i].children){
      authTreeCheck(data[i].children);
    }
  }
  return data;
}
/*查询过滤树形菜单列表*/
function treeFilter(treeid,filText){
  if(filText){
    $(treeid).tree('doFilter',filText);
    $(treeid).tree('expandAll');
    $(treeid+'>li div.tree-node-hidden').parent('li').css({'border-bottom':'none'});
  }else{
    $(treeid).tree('doFilter','');
    $(treeid+'>li').css({'border-bottom':$(treeid+'>li').css('border-bottom')});
    $(treeid).tree('collapseAll');
  }
}
/*tabs扩展右击菜单关闭标签功能*/
$.extend($.fn.tabs.methods,{
  allTabs : function(tabsId){
    var tabs = $(tabsId).tabs('tabs');
    var all = [];
    all = $.map(tabs,function(n,i){
      return $(n).panel('options');
    });
    return all;
  },
  closeCurrent : function(tabsId){
    var currentTab = $(tabsId).tabs('getSelected');
    var currentTabIndex = $(tabsId).tabs('getTabIndex',currentTab);
    $(tabsId).tabs('close',currentTabIndex);
  },
  closeAll : function(tabsId){
    var tabs = $(tabsId).tabs('allTabs');
    $.each(tabs,function(i,n){
      $(tabsId).tabs('close',n.title);
    });
  },
  closeOther : function(tabsId){
    var tabs = $(tabsId).tabs('allTabs');
    var currentTab = $(tabsId).tabs('getSelected');
    var currentTabIndex = $(tabsId).tabs('getTabIndex',currentTab);
    $.each(tabs,function(i,n){
      if(currentTabIndex !=i){
        $(tabsId).tabs('close',n.title);
      };
    });
  },
  closeLeft : function(tabsId){
    var tabs = $(tabsId).tabs('allTabs');
    var currentTab = $(tabsId).tabs('getSelected');
    var currentTabIndex = $(tabsId).tabs('getTabIndex',currentTab);
    var i = currentTabIndex - 1;
    while (i > -1) {
      $(tabsId).tabs('close',tabs[i].title);
      i--;
    };
  },
  closeRight : function(tabsId){
    var tabs = $(tabsId).tabs('allTabs');
    var currentTab = $(tabsId).tabs('getSelected');
    var currentTabIndex = $(tabsId).tabs('getTabIndex',currentTab);
    var i = currentTabIndex + 1, len = tabs.length;
    while (i < len) {
      $(tabsId).tabs('close',tabs[i].title);
      i++;
    };
  },
  updateCurrent : function(tabsId){
    var currentTab = $(tabsId).tabs('getSelected');
    $(tabsId).tabs('update', {
      tab: currentTab,
      options : {}
    });
  }
})
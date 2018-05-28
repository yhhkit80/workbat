var SelectOrg;
var userId=RESTon.get("User").id;
var nodes;
var addrcode;
function loadOrg(){
    $.ajax({
      type : "POST",
      url : "../../reston/common/org/org.jjs",
      success:function(data){
        $('#org_tree').tree("loadData", data);
      }
    });
  }
  $(function() {
    $('#area_tree').tree({
      url : '../../../reston/common/area/area.jjs',
      checkbox : true,
      lines : true,
      onSelect : function(node) {
        SelectRole = node.id;
        $.ajax({
          type : "POST",
          url : '../../../reston/common/area/areachildren.jjs',
          checkbox : true,
          lines : true,
          data : {
            role : node.id
          },
          success : function(data){
            var selected = $('#area_tree').tree('getSelected');
//            点击父节点时只允许出现一次子节点
            var childrenNodes = $('#area_tree').tree('getChildren',selected.target);
            if(childrenNodes==0)
              $('#area_tree').tree('append',{parent: selected.target,
                      data : data});
          }
        });
      },
      success : function(data) {
        $('#func_list').tree("loadData", data);
        previewAuths();
      }
    });
    $('#org_tree').tree({
      url : '../../../reston/common/org/org.jjs',
      onSelect : function(node) {
        SelectOrg = node.id;
        $.ajax({
          type : "POST",
          url : "../../../reston/common/area/org_area.jjs",
          data : {
            org : node.id
          },
          success : function(data) {
            if(data.nodes.length!=0){
              nodes = data.data;
              addrcode =  data.nodes[0][0]["AADDRCODE"];
              $.ajax({
                type : "POST",
                url : '../../../reston/common/area/getchildren.jjs',
                checkbox : true,
                lines : true,
                data : {
                  role : addrcode
                },
                success : function(data){
                  var childrennodes =  $('#area_tree').tree('getChildren');
                  var childrenNodes ; 
                  $('#area_tree').tree('collapseAll');
                  for (var index = 0; index < childrennodes.length; index++){
                    $('#area_tree').tree('uncheck',childrennodes[index].target);
                    if(childrennodes[index].id==addrcode){
                      childrenNodes = $('#area_tree').tree('getChildren',childrennodes[index].target);
                      if(childrenNodes==0)
                        $('#area_tree').tree('append',{parent: childrennodes[index].target,
                          data : data});
                      $('#area_tree').tree('expandAll',childrennodes[index].target);
                    }
                  }
                  var chnodes = $('#area_tree').tree('getChildren');
                  for (var ind = 0;ind < chnodes.length; ind++){
                    for(var x in nodes){
                      if(chnodes[ind].id == nodes[x]["id"]){
                        $('#area_tree').tree('check',chnodes[ind].target);
                        $('#area_tree').tree('scrollTo',chnodes[ind].target);
                      }
                    }
                  }
                  if(nodes.length==0){
                    var chnode = $('#area_tree').tree('getChildren');
                    for (var inde = 0;inde < chnode.length; inde++){
                      $('#area_tree').tree('uncheck',chnode[inde].target);
                    }
                    $('#area_tree').tree('collapseAll');
                  }
                }
              });
            }else{
              var chnode = $('#area_tree').tree('getChildren');
              for (var inde = 0;inde < chnode.length; inde++){
                $('#area_tree').tree('uncheck',chnode[inde].target);
              }
              $('#area_tree').tree('collapseAll');
            }
          }
        });
        $.ajax({
          type : "POST",
          url : '../../../reston/common/area/org_detail.jjs',
          data : {
            org : node.id
          },
          success : function(data){
            $('#detailForm').form('load',data[0]);
          }
        })
      }
    });
  });
  function org_area_update() {
    if(!$('#area_tree').tree("getChecked", "checked")) return;
    if(!confirm("确认修改？"))return;
    var nodes = $('#area_tree').tree("getChecked", "checked");
    var nodeids = [];
    for (var index = 0; index < nodes.length; index++)
      nodeids.push(nodes[index].id);
    $.ajax({
      type : "POST",
      url : "../../../reston/common/area/org_area_update.jjs",
      data : {
        org : SelectOrg,
        areas : nodeids,
        userId : userId
      },
      complete : function(data) {
        $.ajax({
          type : "POST",
          url : "../../../reston/common/area/area.jjs",
          success : function(data) {
            $('#area_tree').tree("loadData", data);
            alert("保存成功！");
          }
        });
      }
    });
  }
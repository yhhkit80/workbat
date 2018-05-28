/**
 * 
 */
var editState,dictTypeID;
$(function() {
  $(".layout-panel-east .panel-title").html('<span id="dictTypeName" style="color: red; font-size: 12px; font-weight: bold"></span><span id="dictTitle" class="panel-title">字典表管理</span>');
  var submitData = [];
  /* 字典类型管理 */
  $("#dictTypeManage").datagrid({
    url : '../../../reston/dict/dictType.jjs',
    /* 单击字典类型打开对应的业务字典 */
    onClickRow : function(rowIndex, rowData) {
      dictTypeID = rowData.ADICTTYPEID;
      $("#dictTitle").text(" 对应的数据字典");
      $("#dictTypeName").text(rowData.ADICTTYPEDESC);
      $("#dictLayout").layout('expand', 'east');
      getDict();
    }
  });

})

/*提交数据字典表单*/
function dictSubmit(){
  submitData = $("#dictForm").serializeObject();
  submitData.editState = editState;
  if (!$("#dictForm").form("validate")) {
    $.messager.alert('提醒', '所有输入项不能为空');
  } else {
    $.ajax({
      url : "../../../reston/dict/dictManage.jjs",
      type : "post",
      data : submitData,
      dataType : "json",
      success : function(data) {
        if (data.result == "succ") {
          $.messager.show({
            title : '提醒',
            msg : '操作成功。',
            timeout : 3000,
            showType : 'slide'
          });
          $("#dictManage").datagrid('load',{refresh:true,dictTypeID:dictTypeID});
        } else if (data.result) {
          $.messager.show({
            title : '提醒',
            msg : '操作失败。',
            timeout : 3000,
            showType : 'slide'
          });
        }
        $("#dictWindow").window("close");
      }
    });
  }
}

/* 新增原因代码 */
function dictAppend() {
  $("#dictForm").form('clear');
  $("#aDictTypeID").textbox('setValue',dictTypeID);
  editState = "insert";
  $("#dictWindow").window("open");
}

/*删除业务字典*/
function dictRemove() {
  editState = "delete";
  var rows = $("#dictManage").datagrid('getSelections');
  if (rows.length > 0) {
    $.messager.confirm('确定删除', '你确定删除所选记录？', function(b) {
      if (b) {
        var drow = [];
        var rowIndex;
        for (var i = 0; i < rows.length; i++) {
          drow.push(rows[i]);
          drow: drow.join(",");
        }
        var editData = {
          rowData : drow,
          editState : editState
        };
        $.ajax({
          url : '../../../reston/dict/dictManage.jjs',
          type : "post",
          data : editData,
          dataType : "json",
          success : function() {
            $("#dictManage").datagrid('load',{refresh:true,dictTypeID:dictTypeID});
            $("#dictManage").datagrid("unselectAll");
          }
        });
      }
    })
  } else {
    $.messager.alert('提示', '请选择所要删除的记录', 'error');
  }
}

/*获取字典类型对应的业务字典*/
function getDict() {
  $("#dictManage").datagrid({
    url : '../../../reston/dict/dictManage.jjs',
    queryParams:{
      dictTypeID : dictTypeID
    },
    /* 双击原因代码开启编辑 */
    onDblClickRow : function(rowIndex, rowData) {
      $('#dictForm').form('load', rowData);
      $("#dictWindow").window("open");
      editState = "update";
    },
    onLoadSuccess : function(data) {
      $('.descTipe').tooltip({
        position : 'bottom',
        onShow : function() {
          $(this).tooltip('tip').css({
            borderColor : '#666'
          });
        }
      });
    }
  });
}
function descTipe(value, row, index) {
  return '<a class="descTipe" title=' + value + '>' + value + '</a>'
}
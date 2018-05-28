
var initParam;
var userId=RESTon.get("User").id;
var aszsfselect;
var dataPro;
var provinceName;
var cityName;
var content = "<tr><td align='right'>收车公司收款银行：</td><td><input name='ASCGSSKYH' " +
		"class='easyui-textbox' data-options='required:true'></input></td><td align='right'>" +
		"收车公司收款账号：</td><td><input name='ASCGSSKZH' class='easyui-textbox' data-options='required:true'>" +
		"</input></td></tr>";
//列表查询
function querySubmit() {
  initParam = $('#queryForm').serializeObject();
  $('#queryResult').datagrid('reload',initParam);
};
function reLoad() {
  $("#queryResult").datagrid('load');
}
// 导出全部，功能块
function exportData() {
  console.log(initParam);
  console.log('导出全部');
};
//点击案件号字段打开案件
function openCaseProc(index) {
  //与催收案件处理页相同，只能查询
  var ACASEID = $('#queryResult').datagrid('getRows')[index].ACASEID;
  //点击“案件号”链接，调用核心系统接口，判断当前案件是否已经出催，如果已经出催，则自动结案（系统自动下行动码）?
  //如未出催，则打开催收案件处理页面，如下  
  RESTon.at('urge').fire('OpenUrgeCase',{ACASEID : ACASEID, state : 'inbound', query : true});
};
// 格式化案件号字段
function idOper(value,row,index){
  return '<span style="color:#21ADCF;cursor:pointer;" onclick="openCaseProc('+index+')">'+value+'</span>';
};
//搜索下拉框通用方法，传入下拉框id和要填的数据，如果是数据字典的不能用这个，要改
function comboboxConInit(id,data){
  $(id).combobox({
    valueField : 'id',
    textField : 'text',
    panelHeight : 'auto',
    panelMaxHeight : 120,
    editable : false,
    data : data,
    onSelect : function(d) {
      if(d.type == 'text') {
        $(id).parent('td').find('.symbol').combobox('setValue','=').combobox('readonly',true);
      }else{
        $(id).parent('td').find('.symbol').combobox('setValue','').combobox('readonly',false);
      };
    }
  });
};
$(function() {
  comboboxConInit('#criteria_1',testdata.handle.criteria_1);
  comboboxConInit('#criteria_2',testdata.handle.criteria_2);
  comboboxConInit('#criteria_3',testdata.handle.criteria_2);
  comboboxConInit('#criteria_4',testdata.handle.criteria_2);
  $('#symbol').combobox({
    valueField : 'id',
    textField : 'text',
    panelHeight : 'auto',
    panelMaxHeight : 120,
    editable : false,
    data : testdata.handle.symbol
  });
  //初始列表查询
  $('#queryResult').datagrid({
    url : RESTon.rootPath('/reston/tsr/manager/fetchcompany/fetchCompany.jjs'),
    method : 'POST',
    toolbar : '#userTb',
    fit : true,
    fitColumns : true,
    singleSelect : true,
    border : false,
    rownumbers : true,
    pagination : true,
    pageNumber : 1,
    pageSize : 200,
    pageList : [ 50, 100, 200, 300 ],
  }).datagrid('getPager').pagination({
    // 导出全部按钮
    buttons : [ {
      iconCls : 'icon-download',
      text : '导出全部',
      handler : exportData
    } ]
  });
  $('#queryCommit').click(querySubmit);// 点击查询
  $('#queryReset').click(function() {
    $('#queryForm').form('reset');
  });// 重置查询条件
  
//  $.ajax({
//    type : "POST",
//    url : "../../../reston/common/area/area.jjs",
//    success:function(data){
//      dataPro = data;
//    }
//  });
});

function userAppend() {
  $('#queryResult').datagrid('unselectAll');
  $('#userinfo').form('clear');
  $('#resetPassBtn').hide();
  $('#AID').textbox({
    editable : true
  })
  $("#codeLayout").layout('expand', 'east');
};
function openAddComInfoDia(){
  $.ajax({
    type : "POST",
    url : "../../../reston/common/area/area.jjs",
    success:function(data){
      $('#aszsf').combobox({
        valueField : 'id',
        textField : 'text',
        panelHeight : 'auto',
        panelMaxHeight : 120,
        editable : false,
        data : data,
        onSelect : function(){
          var myOptValue = $("#aszsf").combobox("getValue") ;
          $.ajax({
            type : "POST",
            url : '../../../reston/common/area/areachildren.jjs',
            data : {
              role : myOptValue
            },
            success : function(data){
              $('#aszcs').combobox({
                valueField : 'id',
                textField : 'text',
                panelHeight : 'auto',
                panelMaxHeight : 120,
                editable : false,
                data : data
              });
            }
          });
        }
      });
    }
  });
  var rowdata ={};
  openDiaAdd({
    title : '收车公司新增',
    href : 'addAndModify.html',
    buttons : [ {
      iconCls : 'icon-save',
      text : '保存',
      handler : saveAddCarInfo
    }, {
      iconCls : 'icon-clear',
      text : '取消',
      handler : closeDia
    } ]
  },rowdata);
};
function openModifyCarInfoDia(index) {
  $.ajax({
    type : "POST",
    url : "../../../reston/common/area/area.jjs",
    success:function(data){
      $('#aszsf').combobox({
        valueField : 'id',
        textField : 'text',
        panelHeight : 'auto',
        panelMaxHeight : 120,
        editable : false,
        data : data,
        onSelect : function(){
          var myOptValue = $("#aszsf").combobox("getValue") ;
          $.ajax({
            type : "POST",
            url : '../../../reston/common/area/areachildren.jjs',
            data : {
              role : myOptValue
            },
            success : function(data){
              $('#aszcs').combobox({
                valueField : 'id',
                textField : 'text',
                panelHeight : 'auto',
                panelMaxHeight : 120,
                editable : false,
                data : data
              });
            }
          });
        }
      });
    }
  });
  var rowdata = $('#queryResult').datagrid('getSelected');    //获取选中行数据
  openDia({
    title : '收车公司修改',
    href : 'addAndModify.html',
    buttons : [ {
      iconCls : 'icon-save',
      text : '保存',
      handler : saveModifyCarInfo
    }, {
      iconCls : 'icon-clear',
      text : '取消',
      handler : closeDia
    } ]
  },rowdata);
};

function saveModifyCarInfo() {
  if(!$('#carInfoForm').form('validate'))
    return;
  var modifyCarInfo = $('#carInfoForm').serializeObject();
  modifyCarInfo.userId=userId;
  $.messager.confirm('确认', '确认保存修改信息？', function(b) {
    $.ajax({
      url : RESTon.rootPath('/reston/tsr/manager/fetchcompany/updCompany.jjs'),
      type : "post",
      data : modifyCarInfo,
      async : false,
      dataType : "json",
      success : function(data) {
        if(data.result="success"){
          $.messager.show({title : '提醒',msg : '操作成功。',timeout : 3000,showType : 'slide'}); 
          $('#queryResult').datagrid('load');
          closeDia();
        }else{
          $.messager.show({title : '提醒',msg : '操作失败。',timeout : 3000,showType : 'slide'});
        }
      },
      error : function(xhr, status, msg) {
        alert("错误：" + msg);
      }
    });
  });
};
function saveAddCarInfo() {
  if(!$('#carInfoForm').form('validate'))
    return;
  var addCarInfo = $('#carInfoForm').serializeObject();
  provinceName = $('#aszsf').combobox("getText");
  cityName = $('#aszcs').combobox("getText");
  addCarInfo.userId=userId;
  addCarInfo.provinceName = provinceName;
  addCarInfo.cityName = cityName;
  $.messager.confirm('确认', '确认保存修改信息？', function(b) {
    $.ajax({
      url : RESTon.rootPath("/reston/tsr/manager/fetchcompany/insertCompany.jjs"),
      type : "post",
      data : addCarInfo,
      async : false,
      dataType : "json",
      success : function(data) {
        if(data.result="success"){
          $.messager.show({title : '提醒',msg : '操作成功。',timeout : 3000,showType : 'slide'}); 
          $('#queryResult').datagrid('load');
          closeDia();
        }else{
          $.messager.show({title : '提醒',msg : '操作失败。',timeout : 3000,showType : 'slide'});
        }
      },
      error : function(xhr, status, msg) {
        alert("错误：" + msg);
      }
    });
  });
};
//关闭弹窗
function closeDia() {
  $('#popDia').dialog('close');
  $('#popDia').empty();
};
//根据传入参数打开弹窗
function openDia(options,rowdata) {
  $('#popDia').empty();
  $('#popDia').dialog({
    width : 770,
    height : 470,
    title : options.title,
    href : options.href,
    draggable : true,
    closed : true,
//    modal : true,
    resizable : true,
    buttons : options.buttons,
    onLoad:function(){
      $('#carInfoForm').form('load',rowdata);
      $('#comname').textbox('readonly'); 
      $('#idAdd').hide();
      $('#ASTATUS').combobox({
        valueField : 'id',
        textField : 'text',
        panelHeight : 'auto',
        panelMaxHeight : 120,
        editable : false,
        data : testdata.handle.ASTATUS
      });
      $('#ASTATUS').combobox('select',rowdata.AQYBZ); 
      $('#ALEVEL').combobox({
        valueField : 'id',
        textField : 'text',
        panelHeight : 'auto',
        panelMaxHeight : 120,
        editable : false,
        data : testdata.handle.ALEVEL
      });
      $('#ALEVEL').combobox('select',rowdata.ASCGSDJ); 
      $('aszsf').combobox('select',rowdata.ASZSF); 
    }
  })
  $('#popDia').dialog('open');
};

function openDiaAdd(options,rowdata) {
  $('#popDia').empty();
  $('#popDia').dialog({
    width : 770,
    height : 470,
    title : options.title,
    href : options.href,
    draggable : true,
    closed : true,
//    modal : true,
    resizable : true,
    buttons : options.buttons,
    onLoad:function(){
      $('#carInfoForm').form('load',rowdata);
      $('#idAdd').hide();
      $('#ASTATUS').combobox({
        valueField : 'id',
        textField : 'text',
        panelHeight : 'auto',
        panelMaxHeight : 120,
        editable : false,
        data : testdata.handle.ASTATUS
      });
      $('#ALEVEL').combobox({
        valueField : 'id',
        textField : 'text',
        panelHeight : 'auto',
        panelMaxHeight : 120,
        editable : false,
        data : testdata.handle.ALEVEL
      });
    }
  })
  $('#popDia').dialog('open');
};

//附件查看
function attachView(value, row, index) {
  return '<span style="color:#21ADCF;cursor:pointer;" onclick="openAttach('+index+')">查看</span>';
}
function openAttach(){
  var rowdata ={};
  openFileDia({
    title : '附件上传',
    href : 'fileupload.html',
    buttons : [ {
      iconCls : 'icon-save',
      text : '保存',
      handler : saveAddCarInfo
    }, {
      iconCls : 'icon-clear',
      text : '取消',
      handler : closeDia
    } ]
  },rowdata);
};

function openFileDia(options,rowdata) {
  $('#fileDia').empty();
  $('#fileDia').dialog({
    width : 770,
    height : 470,
    title : options.title,
    href : options.href,
    draggable : true,
    closed : true,
//    modal : true,
    resizable : true,
    buttons : options.buttons
  })
  $('#fileDia').dialog('open');
};

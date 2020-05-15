/**
 * This view is an example list of people.
 */
Ext.define('IBS.view.main.List', {
    extend: 'Ext.grid.Panel',
    xtype: 'mainlist',
    cls: 'customGrid',
    selType: 'checkboxmodel',

    requires: [
        'IBS.store.Request'
    ],

    title: 'Заявки',
    multiSelect: true,
    ui: 'DataTable',
    id: 'mainGrid',
    
    store: {
        type: 'requestapi'
    },

    viewConfig:{
        getRowClass: function(record){
            if(record.get('dateEnd')){
                return record.get('dateEnd') <= record.get('toDate') ? 'fulfilled': 'notFulfilled'
            }
            return 'customGrid';
        }
    },

    columns: [
        { text: '№',  dataIndex: 'number', editor: {xtype: 'numberfield'} },
        { text: 'Заголовок', dataIndex: 'title', flex: 1 },
        { text: 'Дата начала', dataIndex: 'dateStart', flex: 1,
        renderer: function(value,meta, record){
            if (value) {
                return Ext.util.Format.date(value, 'd-m-y');
            }
        } 
        },
        { text: 'Дата завершения', dataIndex: 'dateEnd', flex: 1,
        renderer: function(value,meta, record){
            if (value) {
                return Ext.util.Format.date(value, 'd-m-y');
            }
        } 
        },
        { text: 'Плановый срок исполнения', dataIndex: 'toDate', flex: 1, 
        renderer: function(value,meta, record){
            if (value) {
                return Ext.util.Format.date(value, 'd-m-Y');
            }
        } 
        },
        { text: 'Тип заявки', dataIndex: 'type', flex: 1},
        { text: 'Содержание', dataIndex: 'contents', flex: 1 },
        {
            xtype: 'actioncolumn',
            width: 50,
            id: 'actionColumn',
            menuDisabled: true,
            sortable: false,
            default:{
                margin: '5 5 5 5',
                labelWidth: 'auto'
            },
            items: [{
                iconCls: 'x-fa fa-cog actionColor',
                tooltip: 'Edit',
                handler: function(grid, rowIndex){
                    window.rowIndex = rowIndex;
                    var popup = Ext.create('IBS.view.popup.Popup');
                    popup.title = 'Редактирование записи';
                    popup.show();
                }
            },{
                iconCls: 'x-fa fa-trash-alt',
                id: 'sidebarTrash',
                tooltip: 'Delete',
                handler:function (sender, rowIndex) {
                    let store = this.getView().getStore()
                    let record = store.getAt(rowIndex);
                    try{
                        var xhr = new XMLHttpRequest();
                        xhr.open("DELETE", `http://localhost:3000/delete/article/${record.data._id}`, true);
                        xhr.onload = function(){
                            store.removeAt(rowIndex);
                        }
                        xhr.send(null);
                    }
                    catch(e){
                        console.error(e);
                    }
                }
            }]
        }
    ],

    plugins:{
        ptype: 'rowediting',
        clicksToEdit: 2
    },

    bbar:{
        xtype: 'pagingtoolbar',
        displayInfo: true,
        beforePageText: 'Страница',
        afterPageText: 'из {0}',
        displayMsg: 'Записей {0} - {1} из {2}',
        emptyMsg: 'Нет доступных данных',
        buttons: [{
            iconCls: 'x-fa fa-plus actionColor green',
            tooltip: 'Add',
            handler: function(){
                var popup = Ext.create("IBS.view.popup.Popup");
                popup.title = 'Добавление записи';
                Ext.getCmp('toDate').setDisabled(false);
                Ext.getCmp('OKbtn').handler = 'onOkClickInsert';
                Ext.getCmp('OKbtn').text = 'Insert';
                popup.show();
            }
        },{
            text: 'Delete Selected',
            id: 'btnDeleteSelected',
            disabled: true,
            handler: function(){
                var xhr;
                var records = Ext.getCmp('mainGrid').getSelectionModel().getSelection();
                try{
                   for(let object of records){
                        xhr = new XMLHttpRequest();
                        xhr.open("DELETE", `http://localhost:3000/delete/article/${object.data._id}`, true);
                        xhr.send(null);
                    }
                    Ext.getCmp('mainGrid').getView().getStore().remove(records); 
                }
                catch(e){
                    console.error(e);
                }
            }
        }]
    },
    
    tbar:[{
        xtype: 'textfield',
        emptyText: 'Search',
        width: 200
    },{
        xtype: 'button',
        text: 'Search',
        iconCls: 'x-fa fa-search actionColor'
    }],
    
    listeners: {
        select: 'onItemSelected'
    }
});

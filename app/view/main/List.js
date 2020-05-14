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

    viewConfig:{
        getRowClass: function(record){
            if(record.get('dateEnd')){
                return record.get('dateEnd') <= record.get('toDate') ? 'fulfilled': 'notFulfilled'
            }
            return 'customGrid';
        }
    },

    store: {
        type: 'requestapi'
    },

    columns: [
        { text: '№',  dataIndex: 'number' },
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
        { text: 'Тип заявки', dataIndex: 'type', flex: 1 },
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
                    var data = this.getView().getStore().getAt(rowIndex).data;
                    var popup = new Ext.form.Panel({
                        floating: true,
                        modal: true,
                        frame: true,
                        closable: true,
                        draggable:true,
                        title: 'Редактирование записи',
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        items: [
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items:[{
                                xtype: 'numberfield',
                                fieldLabel: '№',
                                margin: '5 5 5 5',
                                labelWidth: 'auto',
                                name: 'number',
                                minValue: 1,
                                value: `${data.number}`,
                                editable: false
                            },{
                                xtype: 'textfield',
                                fieldLabel: 'Заголовок',
                                margin: '5 5 5 5',
                                labelWidth: 'auto',
                                name: 'title',
                                value: `${data.title}`
                            }]
                        },{
                            xtype: 'container',
                            layout: 'hbox',
                            items: [{
                                xtype: 'datefield',
                                fieldLabel: 'Начало',
                                margin: '5 5 5 5',
                                labelWidth: 'auto',
                                name: 'dateStart',
                                value: new Date(`${data.dateStart}`),
                                editable: false
                            },{
                                xtype: 'datefield',
                                fieldLabel: 'Завершение',
                                margin: '5 5 5 5',
                                labelWidth: 'auto',
                                name: 'dateEnd',
                                value: new Date(`${data.dateEnd}`),
                                editable: false
                            },{
                                xtype: 'datefield',
                                fieldLabel: 'План',
                                name: 'toDate',
                                margin: '5 5 5 5',
                                labelWidth: 'auto',
                                value: new Date(`${data.toDate}`),
                                editable: false,
                                disabled: true
                            }]
                        },{
                            xtype: 'combobox',
                            fieldLabel: 'Тип заявки',
                            margin: '5 5 5 5',
                            labelWidth: 'auto',
                            name: 'type',
                            store: ['Инцидент','Консультация'],
                            value: `${data.type}`,
                            editable: false
                        },{
                            xtype: 'textarea',
                            grow: true,
                            margin: '5 5 5 5',
                            labelWidth: 'auto',
                            name: 'contents',
                            fieldLabel: 'Содержание',
                            value: `${data.contents}`
                        }
                    ],
                    buttons: [{
                        text: 'OK',
                        handler: function(){
                            let item = {
                                number: popup.getForm().findField("number").getValue(),
                                title: popup.getForm().findField("title").getValue(),
                                dateStart: popup.getForm().findField("dateStart").getValue(),
                                dateEnd: popup.getForm().findField("dateEnd").getValue(),
                                toDate: data.toDate,
                                type: popup.getForm().findField("type").getValue(),
                                contents: popup.getForm().findField("contents").getValue(),
                            }
                            let store = Ext.getCmp('mainGrid').getView().getStore()
                            let record = store.getAt(rowIndex);
                            try{
                                var xhr = new XMLHttpRequest();
                                xhr.open("DELETE", `http://localhost:3000/delete/article/${record.data._id}`, false);
                                xhr.onload = function(){
                                    store.removeAt(rowIndex);
                                }
                                xhr.send(null);
                                xhr = new XMLHttpRequest();
                                xhr.open("POST", `http://localhost:3000/post/article/`, true);
                                xhr.onload = function(){
                                    Ext.getCmp('mainGrid').getView().getStore().add(item);
                                }
                                xhr.send(item);
                                popup.destroy();
                            }
                            catch(e){
                                console.error(e);
                            } 
                        }
                    },{
                        text: 'Cancel',
                        handler: function(){
                            popup.destroy();
                        }
                    }]
                    });
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

    bbar:{
        xtype: 'pagingtoolbar',
        displayInfo: true,
        beforePageText: 'Страница',
        afterPageText: 'из {0}',
        displayMsg: 'Записей {0} - {1} из {2}',
        emptyMsg: 'Нет доступных данных',
        store: {
            type: 'requestapi'
        },
        buttons: [{
            iconCls: 'x-fa fa-plus actionColor green',
            tooltip: 'Add',
            handler: function(){
                var popup = new Ext.form.Panel({
                    floating: true,
                    modal: true,
                    frame: true,
                    closable: true,
                    draggable:true,
                    title: 'Добавление записи',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                    {
                        xtype: 'container',
                        layout: 'hbox',
                        items:[{
                            xtype: 'numberfield',
                            fieldLabel: '№',
                            name: 'number',
                            margin: '5 5 5 5',
                            labelWidth: 'auto',
                            value: 1,
                            minValue: 1,
                            editable: false
                        },{
                            xtype: 'textfield',
                            fieldLabel: 'Заголовок',
                            name: 'title',
                            margin: '5 5 5 5',
                            labelWidth: 'auto'
                        }]
                    },{
                        xtype: 'container',
                        layout: 'hbox',
                        items: [{
                            xtype: 'datefield',
                            fieldLabel: 'Начало',
                            name: 'dateStart',
                            margin: '5 5 5 5',
                            labelWidth: 'auto',
                            format: 'Y-m-d',
                            editable: false
                        },{
                            xtype: 'datefield',
                            fieldLabel: 'Завершение',
                            name: 'dateEnd',
                            margin: '5 5 5 5',
                            labelWidth: 'auto',
                            format: 'Y-m-d',
                            editable: false
                        },{
                            xtype: 'datefield',
                            fieldLabel: 'План',
                            name: 'toDate',
                            margin: '5 5 5 5',
                            labelWidth: 'auto',
                            format: 'Y-m-d',
                            editable: false,
                            value: new Date()
                        }]
                    },{
                        xtype: 'combobox',
                        fieldLabel: 'Тип заявки',
                        name: 'type',
                        margin: '5 5 5 5',
                        labelWidth: 'auto',
                        store: ['Инцидент','Консультация'],
                        editable: false,
                        value: 'Инцидент'
                    },{
                        xtype: 'textarea',
                        grow: true,
                        name: 'contents',
                        margin: '5 5 5 5',
                        labelWidth: 'auto',
                        fieldLabel: 'Содержание'
                    }
                ],
                buttons: [{
                    text: 'OK',
                    handler: function(){
                        let item = {
                            number: Number(popup.getForm().findField("number").getValue()),
                            title: String(popup.getForm().findField("title").getValue()),
                            dateStart: new Date(popup.getForm().findField("dateStart").getValue()),
                            dateEnd: new Date(popup.getForm().findField("dateEnd").getValue()),
                            toDate: new Date(popup.getForm().findField("toDate").getValue()),
                            type: String(popup.getForm().findField("type").getValue()),
                            contents: String(popup.getForm().findField("contents").getValue()),
                        }
                        alert(item.dateStart);
                        try{
                            Ext.getCmp('mainGrid').getView().getStore().add(item);
                            popup.destroy();
                        }
                        catch(e){
                            console.error(e);
                        }
                    }
                    //formBind: true //?
                },{
                    text: 'Cancel',
                    handler: function(){
                        popup.destroy();
                    }
                }]
                });
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

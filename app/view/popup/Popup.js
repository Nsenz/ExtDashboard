Ext.define('IBS.view.popup.Popup',{
    extend: 'Ext.form.Panel',
    xtype: 'popup',
    requires:[
        'Ext.form.Panel'
    ],
    floating: true,
    draggable: true,
    modal: true,
    closable: false,
    frame: true,
    controller: 'popup',
    listeners:{
        beforeshow: 'launch'
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
                editable: false
            },{
                xtype: 'textfield',
                fieldLabel: 'Заголовок',
                margin: '5 5 5 5',
                labelWidth: 'auto',
                name: 'title',
                allowBlank: false
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
                editable: false,
                allowBlank: false
            },{
                xtype: 'datefield',
                fieldLabel: 'Завершение',
                margin: '5 5 5 5',
                labelWidth: 'auto',
                name: 'dateEnd',
                editable: false
            },{
                xtype: 'datefield',
                fieldLabel: 'План',
                name: 'toDate',
                id: 'toDate',
                margin: '5 5 5 5',
                labelWidth: 'auto',
                editable: false,
                disabled: true,
                allowBlank: false
            }]
        },{
            xtype: 'combobox',
            fieldLabel: 'Тип заявки',
            margin: '5 5 5 5',
            labelWidth: 'auto',
            name: 'type',
            store: ['Инцидент','Консультация'],
            value: `Инцидент`,
            editable: false,
            allowBlank: false
        },{
            xtype: 'textarea',
            grow: true,
            margin: '5 5 5 5',
            labelWidth: 'auto',
            name: 'contents',
            fieldLabel: 'Содержание',
        }
    ],
    buttons: [{
        text: 'Update',
        id: 'OKbtn',
        handler: 'onOkClickUpdate',
        formBind: true
    },{
        text: 'Cancel',
        handler: 'onCancelClick'
    }]
})
Ext.define('IBS.view.popup.PopupController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.popup',

    launch: function(){
        let store = Ext.getCmp('mainGrid').getView().getStore();
        let index = window.rowIndex;
        if(index){
            let record = store.getAt(index).data;
            this.getView().getForm().findField("number").setValue(record.number),
            this.getView().getForm().findField("title").setValue(record.title),
            this.getView().getForm().findField("dateStart").setValue(record.dateStart),
            this.getView().getForm().findField("dateEnd").setValue(record.dateEnd),
            this.getView().getForm().findField("toDate").setValue(record.toDate),
            this.getView().getForm().findField("type").setValue(record.type),
            this.getView().getForm().findField("contents").setValue(record.contents)
        }
    },
    
    onOkClickUpdate: function(){
        let item = {
            number: this.getView().getForm().findField("number").getValue(),
            title: this.getView().getForm().findField("title").getValue(),
            dateStart: this.getView().getForm().findField("dateStart").getValue(),
            dateEnd: this.getView().getForm().findField("dateEnd").getValue(),
            toDate: this.getView().getForm().findField("toDate").getValue(),
            type: this.getView().getForm().findField("type").getValue(),
            contents: this.getView().getForm().findField("contents").getValue(),
        }
        let index = window.rowIndex;
        let store = Ext.getCmp('mainGrid').getView().getStore()
        let record = store.getAt(index);
        try{
            var xhr = new XMLHttpRequest();
            xhr.open("DELETE", `http://localhost:3000/delete/article/${record.data._id}`, false);
            xhr.onload = function(){
                store.removeAt(index);
            }
            xhr.send(null);
            xhr = new XMLHttpRequest();
            xhr.open("POST", `http://localhost:3000/post/article/`, true);
            xhr.onload = function(){
                store.add(item);
            }
            xhr.send(item);
            this.getView().destroy();
        }
        catch(e){
            console.error(e);
        }
        delete window.rowIndex;
    },

    onOkClickInsert: function(){
        let item = {
            number: this.getView().getForm().findField("number").getValue(),
            title: this.getView().getForm().findField("title").getValue(),
            dateStart:this.getView().getForm().findField("dateStart").getValue(),
            dateEnd: this.getView().getForm().findField("dateEnd").getValue(),
            toDate: this.getView().getForm().findField("toDate").getValue(),
            type: this.getView().getForm().findField("type").getValue(),
            contents: this.getView().getForm().findField("contents").getValue(),
        }
        try{
            Ext.getCmp('mainGrid').getView().getStore().add(item);
            this.getView().destroy();
        }
        catch(e){
            console.error(e);
        }
    },

    onCancelClick: function(){
        this.getView().destroy();
    }
})
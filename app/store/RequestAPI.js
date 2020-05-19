var store = Ext.define('Ext.store.RequestAPI', {
    extend: 'Ext.data.Store',
    alias: 'store.requestapi',
    model: 'IBS.model.Request',
    autoLoad: {start: 0, limit: 4},
    pageSize: 4,
    autoSync: true,
    proxy: {
        type: 'rest',
        enablePaging: true,
        api:{
            read: 'http://localhost:3000/articles/limits',
            create: 'http://localhost:3000/post/article',
            update: 'http://localhost:3000/update/article',
            destroy: 'http://localhost:3000/delete/article'
        },
        reader: {
            type: 'json',
            rootProperty: 'results',
            totalProperty: 'total'
        },
        writer: {
            type: 'json'
        }
    },
})
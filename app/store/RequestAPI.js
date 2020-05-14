var store = Ext.define('Ext.store.RequestAPI', {
    extend: 'Ext.data.Store',
    alias: 'store.requestapi',
    model: 'IBS.model.Request',
    autoLoad: true,
    autoSync: true,
    pageSize: 4,
    proxy: {
        type: 'rest',
        api:{
            read: 'http://localhost:3000/articles',
            create: 'http://localhost:3000/post/article',
            update: 'http://localhost:3000/update/article',
            destroy: 'http://localhost:3000/delete/article'
        },
        reader: {
            type: 'json'
        },
        writer: {
            type: 'json'
        }
    },
})
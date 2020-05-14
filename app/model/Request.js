Ext.define('IBS.model.Request', {
    extend: 'IBS.model.Base',

    fields: [
        {
            name: 'number',
            type: 'int'
        },
        {
            name: 'title',
            type: 'string'
        },
        {
            name: 'dateStart',
            type: 'date'
        },
        {
            name: 'dateEnd',
            type: 'date'
        },
        {
            name: 'toDate',
            type: 'date'
        },
        {
            name: 'type',
            type: 'string'
        },
        {
            name: 'contents',
            type: 'string'
        }
    ]
});

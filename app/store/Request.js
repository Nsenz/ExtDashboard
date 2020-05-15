var store = Ext.define('IBS.store.Request', {
    extend: 'Ext.data.Store',

    alias: 'store.request',

    model: 'IBS.model.Request',
    pageSize: 4,
    data: [
        { number: 1, 
          title: 'Заявка на покупку воды',
          dateStart: new Date(2020, 5, 7),
          dateEnd: new Date(2020, 5, 8),
          toDate: new Date(2020, 5, 8),
          type: 'Инцидент',
          contents: 'Содержание'  
        },
        { number: 1, 
            title: 'Заявка на покупку воды',
            dateStart: new Date(2020, 5, 7),
            dateEnd: new Date(2020, 5, 8),
            toDate: new Date(2020, 5, 8),
            type: 'Инцидент',
            contents: 'Содержание'  
          },
          { number: 1, 
            title: 'Заявка на покупку воды',
            dateStart: new Date(2020, 5, 7),
            dateEnd: new Date(2020, 5, 8),
            toDate: new Date(2020, 5, 8),
            type: 'Инцидент',
            contents: 'Содержание'  
          },
          { number: 1, 
            title: 'Заявка на покупку воды',
            dateStart: new Date(2020, 5, 7),
            dateEnd: new Date(2020, 5, 8),
            toDate: new Date(2020, 5, 8),
            type: 'Инцидент',
            contents: 'Содержание'  
          },
          { number: 1, 
            title: 'Заявка на покупку воды',
            dateStart: new Date(2020, 5, 7),
            dateEnd: new Date(2020, 5, 8),
            toDate: new Date(2020, 5, 8),
            type: 'Инцидент',
            contents: 'Содержание'  
          },
          { number: 1, 
            title: 'Заявка на покупку воды',
            dateStart: new Date(2020, 5, 7),
            dateEnd: new Date(2020, 5, 8),
            toDate: new Date(2020, 5, 8),
            type: 'Инцидент',
            contents: 'Содержание'  
          }
    ],
     proxy: {
        type: 'memory',
        enablePaging: true,
    },
    autoLoad: true,
});

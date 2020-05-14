/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('IBS.Application', {
    extend: 'Ext.app.Application',

    name: 'IBS',
    plugins: 'viewport',

    quickTips: false,
    platformConfig: {
        desktop: {
            quickTips: true
        }
    },

    launch: function(){
        Ext.create({
            xtype: 'app-main'
        });
        var grid = Ext.getCmp('mainGrid');
        grid.on('selectionchange', (model, srecords)=>{
            srecords.length > 0?Ext.getCmp('btnDeleteSelected').disabled=false:Ext.getCmp('btnDeleteSelected').disabled=true;
        });
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});

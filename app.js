/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'IBS.Application',

    name: 'IBS',

    requires: [
        // This will automatically load all classes in the IBS namespace
        // so that application classes do not need to require each other.
        'IBS.*'
    ],

    // The name of the initial view to create.
    //mainView: 'IBS.view.main.Main'
});

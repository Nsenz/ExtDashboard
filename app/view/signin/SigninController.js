Ext.define('IBSfs.view.signin.SigninController',{
    extend: 'Ext.app.ViewController',
    config: {
        refs: {
            home: '#home'
        }
    },
    alias: 'controller.signin',
    onLoginClick: function(e, target, options){
        Ext.getCmp('mainToolbar').show();
        this.getView().destroy();
    },
    onRegisterClick: function(){
        Ext.Msg.alert('Sign Up', 'Signing Up', Ext.emptyFn);
    }
})
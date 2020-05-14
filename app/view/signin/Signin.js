Ext.define('IBS.view.signin.Signin',{
    extend: 'Ext.form.Panel',
    xtype: 'signin',
    ui:'highlight',
    requires:[
        'IBSfs.view.signin.SigninController',
        'Ext.form.Panel'
    ],
    controller: 'signin',
    title: 'Sign In',
    frame: true,
    width: 300,
    height: 150,
    layout:{
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },
    items:{
        xtype: 'panel',
        fullscreen: true,
        items:[{
            xtype: 'textfield',
            name: 'username',
            fieldLabel: 'Username',
            allowBlank: false
        },
        {
            xtype: 'textfield',
            name: 'password',
            fieldLabel: 'Password',
            inputType: 'password',
            allowBlank: false
        },{
            xtype: 'button',
            text: 'Login',
            formBind: true,
            style: 'left: 15%; padding-left: 9px; padding-right: 9px; margin-top: 10px;',
            listeners:{
                click: 'onLoginClick'
            }
        },
        {
            xtype: 'button',
            text: 'Register',
            style: 'left: 40%; margin-top: 10px;',
            formBind: false,
            listeners:{
                click: 'onRegisterClick'
            }
        }],
    }
});
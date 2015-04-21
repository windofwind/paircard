/**
 * @ignore(Application.*)
 * @ignore(require)
 * @ignore(__dirname)
 */

qx.Class.define("server.common.WebServer", {
    extend: qx.core.Object,
    /*
     *****************************************************************************
     STATICS
     *****************************************************************************
     */
    statics: {
    },

    /*
     *****************************************************************************
     CONSTRUCTOR
     *****************************************************************************
     */
    construct: function () {
        this.__status = false;
    },

    /*
     *****************************************************************************
     EVENTS
     *****************************************************************************
     */
    events: {
    },

    /*
     *****************************************************************************
     PROPERTY
     *****************************************************************************
     */
    properties: {
        /** The port used to connect */
        httpPort:{
            nullable:	false,
            init:		3000,
            check:		"Number"
        },

        httpsPort:{
            nullable:	false,
            check:		"Number"
        },

        keyFile:{
            init:       "",
            nullable:	false,
            check:		"String"
        },

        certFile:{
            init:       "",
            nullable:	false,
            check:		"String"
        },
        clientPath:{
            init:       "",
            nullable:	false,
            check:		"String"
        }
    },

    /*
     *****************************************************************************
     MEMBERS
     *****************************************************************************
     */
    members: {
        _http:null,
        _https:null,
        __status:null,
        __clientInfo:null,
        isOpened:function() {
            return this.__status;
        },

        open:function() {
            var app, express, path;
            try {
                express = require('express');
                app = require('express')();
                path = require('path');

                // port 설정
                app.set("port", this.getHttpPort());

                // favicon 설정
                //app.set(express.favicon());

                // post Body 읽기
                //app.set(express.bodyParser());

                // static 파일 경로 설정
                app.set(express.static(path.join(__dirname, 'public')));

                this._openHTTP(app);
                //this._openHTTPS(app);
                this._setIO(app);
                this.__status = true;
            }
            catch(e) {
                this.error(e.message);
            }
        },

        close:function() {
            this.__status = false;
        },

        _openHTTP:function(app) {
            this._http = require('http').Server(app);

            app.get('/', function(req, res){
                var temp = "./paircard/index.html";
                res.sendfile(temp);
            });

            app.get('/*', function(req, res){
                var temp = "./paircard/"+req.url;
                res.sendfile(temp);
            });

            this._http.listen(this.getHttpPort(), function(){
                console.log('listening on *:3000');
            });
        },

        _openHTTPS:function(app) {
            this._https = require('https').Server(app);

            app.all('/*', function(req, res){
                console.log(req);

                res.send('<h1>Hello world</h1>');
            });

            this._https.listen(this.getHttpsPort(), function(){
                console.log('listening on *:3001');
            });
        },

        _setIO:function(app) {
            this._io = require('socket.io').listen(this.getWebModule());

//            this._io.enable('browser client minification');  // send minified client
//            this._io.enable('browser client etag');          // apply etag caching logic based on version number
//            this._io.enable('browser client gzip');          // gzip the file

//            this._io.set('log level', 0);

//            this._io.set('transports', [
//                'websocket'
//                , 'flashsocket'
//                , 'htmlfile'
//                , 'xhr-polling'
//                , 'jsonp-polling'
//            ]);

            this._io.on("connection", function(socket) {
                server.game.users.UserManager.getInstance().addUser(socket);
            });
        },

        getWebModule:function() {
            return this._http;
        }
    },

    destruct: function () {
        this._http = null;
        this._https = null;
        this.disposeObjects('__clientInfo');
    }
});
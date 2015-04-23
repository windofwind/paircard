(function() {

    if (typeof console == "undefined") console = {};
    if (!console.log) console.log = function() {
        var out = java.lang.System.out;
        for (var i = 0; i < arguments.length; i++)
        out.print(arguments[i]);
        out.println();
    };

    if (!this.qxloadPrefixUrl) qxloadPrefixUrl = "";

    if (!this.window) window = this;

    if (!window.navigator) window.navigator = {
        userAgent: "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_4; de-de) AppleWebKit/533.17.8 (KHTML, like Gecko) Version/5.0.1 Safari/533.17.8",
        product: "",
        cpuClass: "",
        language: "en-US"
    };

    if (typeof environment !== "undefined") { // Rhino runtime
      if (!navigator.platform) navigator.platform = environment["os.name"];
    } else if (typeof process !== "undefined") { // Node runtime
      var os = require('os');
      var fs = require('fs');
      if (!navigator.platform) navigator.platform = os.type();
    }

    if (!window.setTimeout && environment && environment["java.version"]) {
      // Emulate setTimeout/setInterval features in Rhino
      // http://stackoverflow.com/questions/2261705/how-to-run-a-javascript-function-asynchronously-without-using-settimeout
      var timer = new java.util.Timer();
      var counter = 1; 
      var ids = {};

      window.setTimeout = function (fn,delay) 
      {
        if (delay === 0) {
          delay = 1;
        }
        var id = counter++;
        ids[id] = new JavaAdapter(java.util.TimerTask,{run: fn});
        timer.schedule(ids[id],delay);
        return id;
      };

      window.clearTimeout = function (id) 
      {
        if (ids[id])
        {
          ids[id].cancel();
          timer.purge();
          delete ids[id];
        }
      };

      window.setInterval = function (fn,delay) 
      {
        if (delay === 0) {
          delay = 1;
        }
        var id = counter++; 
        ids[id] = new JavaAdapter(java.util.TimerTask,{run: fn});
        timer.schedule(ids[id],delay,delay);
        return id;
      };

      window.clearInterval = window.clearTimeout;
    }

    if (!window.qx) window.qx = {};

    if (!qx.$$environment) qx.$$environment = {};
    var envinfo = {"qx.application":"server.Application","qx.aspects":false,"qx.debug":true,"qx.globalErrorHandling":false,"qx.revision":"","qx.theme":"qx.theme.Modern","qx.version":"4.1"};
    for (var k in envinfo) qx.$$environment[k] = envinfo[k];

    if (!qx.$$libraries) qx.$$libraries = {};
    var libinfo = {"__out__":{"sourceUri":"."},"qx":{"resourceUri":"../../../../qooxdoo-4.1-sdk/framework/source/resource","sourceUri":"../../../../qooxdoo-4.1-sdk/framework/source/class","sourceViewUri":"https://github.com/qooxdoo/qooxdoo/blob/%{qxGitBranch}/framework/source/class/%{classFilePath}#L%{lineNumber}"},"server":{"resourceUri":"../../source/resource","sourceUri":"../../source/class"}};
    for (var k in libinfo) qx.$$libraries[k] = libinfo[k];

    var isDebug = qx.$$environment["qx.debug"],
        log = isDebug ? console.log : function() {},
        load = qx.$$environment["qx.load"] ? this[qx.$$environment["load"]] : this.load;

    qx.$$resources = {};
    qx.$$translations = {"C":null,"en":null};
    qx.$$locales = {"C":null,"en":null};
    qx.$$packageData = {};
    qx.$$loader = {
        parts: {"boot":[0]},
        packages: {"0":{"uris":["__out__:server.a43a4b97f57e.js","qx:qx/Bootstrap.js","qx:qx/util/OOUtil.js","qx:qx/core/Environment.js","qx:qx/bom/client/EcmaScript.js","qx:qx/lang/normalize/Function.js","qx:qx/lang/normalize/Array.js","qx:qx/Mixin.js","qx:qx/core/Aspect.js","qx:qx/lang/normalize/String.js","qx:qx/lang/normalize/Object.js","qx:qx/Interface.js","qx:qx/lang/normalize/Error.js","qx:qx/lang/normalize/Date.js","qx:qx/core/Property.js","qx:qx/Class.js","qx:qx/data/MBinding.js","qx:qx/data/SingleValueBinding.js","qx:qx/lang/Type.js","qx:qx/core/Assert.js","qx:qx/type/BaseError.js","qx:qx/core/AssertionError.js","qx:qx/dev/StackTrace.js","qx:qx/lang/Array.js","qx:qx/bom/client/Engine.js","qx:qx/lang/Function.js","qx:qx/core/ObjectRegistry.js","qx:qx/lang/Json.js","qx:qx/lang/String.js","qx:qx/data/IListData.js","qx:qx/core/ValidationError.js","qx:qx/util/RingBuffer.js","qx:qx/log/appender/RingBuffer.js","qx:qx/log/Logger.js","qx:qx/core/MLogging.js","qx:qx/dom/Node.js","qx:qx/bom/Event.js","qx:qx/bom/Style.js","qx:qx/bom/client/OperatingSystem.js","qx:qx/bom/client/Browser.js","qx:qx/bom/client/CssTransition.js","qx:qx/event/Manager.js","qx:qx/event/IEventHandler.js","qx:qx/event/Registration.js","qx:qx/core/MEvent.js","qx:qx/core/MProperty.js","qx:qx/core/MAssert.js","qx:qx/core/Object.js","qx:qx/util/DisposeUtil.js","qx:qx/event/handler/Object.js","qx:qx/event/IEventDispatcher.js","qx:qx/event/type/Event.js","qx:qx/util/ObjectPool.js","qx:qx/event/Pool.js","qx:qx/event/dispatch/Direct.js","qx:qx/event/type/Data.js","qx:qx/core/BaseInit.js","qx:qx/application/IApplication.js","qx:qx/application/Basic.js","server:server/Application.js","qx:qx/log/appender/RhinoConsole.js","qx:qx/log/appender/NodeConsole.js","server:server/common/WebServer.js","server:server/game/users/UserManager.js","server:server/game/rooms/RoomManager.js","server:server/game/rooms/Room.js","server:server/game/util/CardDeck.js","qx:qx/util/format/IFormat.js","qx:qx/util/format/NumberFormat.js","qx:qx/locale/Number.js","qx:qx/type/BaseString.js","qx:qx/locale/LocalizedString.js","qx:qx/locale/Manager.js","qx:qx/bom/client/Locale.js","server:server/game/users/User.js","qx:qx/bom/client/Runtime.js"]}},
        urisBefore: [],
        boot: "boot",
        closureParts: {},
        bootIsInline: false,

        decodeUris: function(compressedUris) {
            var libs = qx.$$libraries;
            var uris = [];
            for (var i = 0; i < compressedUris.length; i++) {
                var uri = compressedUris[i].split(":");
                var euri;
                if (uri.length == 2 && uri[0] in libs) {
                    var prefix = libs[uri[0]].sourceUri;
                    euri = prefix + "/" + uri[1];
                } else {
                    euri = compressedUris[i];
                }
                uris.push(qxloadPrefixUrl + euri);
            }
            return uris;
        },

        init: function() {
            var l = qx.$$loader;
            if (l.urisBefore.length > 0) this.loadScriptList(l.urisBefore);

            var bootPackageHash = l.parts[l.boot][0];
            if (!l.bootIsInline) this.loadScriptList(l.decodeUris(l.packages[l.parts[l.boot][0]].uris));
            l.importPackageData(qx.$$packageData[bootPackageHash] || {});
            l.signalStartup();
        },

        loadScriptList: function(uris) {
            var i, p, s;
            for (i = 0; i < uris.length; i++) {
                if (typeof process !== "undefined") { // Node
                  p = uris[i];
                  try {
                    require(p);
                  } catch (e) {
                    console.error("Unable to load uri: "+p);
                    throw e;
                  }
                } else if (typeof environment !== "undefined") { // Rhino
                  p = uris[i];
                  try {
                    load(p);
                  } catch (e) {
                    java.lang.System.err.println("Unable to load uri: "+p);
                    throw e;
                  }
                }
                //log("loaded uri " + p);
            }
        },

        signalStartup: function() {
            qx.$$loader.scriptLoaded = true;
            qx.core.BaseInit.ready();
            qx.$$loader.applicationHandlerReady = true;
        },

        importPackageData: function(dataMap, callback) {
            if (dataMap["resources"]) {
                var resMap = dataMap["resources"];
                for (var k in resMap)
                qx.$$resources[k] = resMap[k];
            }
            if (dataMap["locales"]) {
                var locMap = dataMap["locales"];
                var qxlocs = qx.$$locales;
                for (var lang in locMap) {
                    if (!qxlocs[lang]) qxlocs[lang] = locMap[lang];
                    else for (var k in locMap[lang])
                    qxlocs[lang][k] = locMap[lang][k];
                }
            }
            if (dataMap["translations"]) {
                var trMap = dataMap["translations"];
                var qxtrans = qx.$$translations;
                for (var lang in trMap) {
                    if (!qxtrans[lang]) qxtrans[lang] = trMap[lang];
                    else for (var k in trMap[lang])
                    qxtrans[lang][k] = trMap[lang][k];
                }
            }
            if (callback) {
                callback(dataMap);
            }
        }
    };

})();




if (typeof exports != "undefined") {
    for (var key in qx) {
        exports[key] = qx[key];
    }
}

qx.$$loader.init();


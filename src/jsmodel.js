/**
 * Created by MPoreda on 08.12.2017.
 */
function jsModel(url, params) {
    var url = url;
    var params = params;
    function getData(tmp_url, isMultiple)
    {
        if(isMultiple){
            var res = [];
            Object.defineProperty(res, "appendData", {
                enumerable: false,
                configurable: false,
                writable: false,
                value: function (prop) {
                    this.push(prop);
                }
            });
        }
        else
            var res = ObjectModel(false, {url: url, params: params});
        var xhr = new XMLHttpRequest();
        xhr.open("GET", tmp_url, true);
        xhr.onload = function (e) {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var data = JSON.parse(xhr.responseText);
                    if(isMultiple)
                    {
                        if(Array.isArray(data))
                        {
                            for(var i in data)
                                res.appendData(ObjectModel(data[i]));
                        }
                    }else{
                        if(!Array.isArray(data))
                            res.writeData(data);
                    }
                } else {
                    console.error(xhr.statusText);
                }
            }
        };
        xhr.onerror = function (e) {
            console.error(xhr.statusText);
        };
        xhr.send(null);
        return res;
    }
    function ObjectModel(params, properties)
    {
        var res = {};
        Object.defineProperty(res, 'properties', {
            enumerable: false,
            configurable: false,
            writable: false,
            value: properties
        });
        Object.defineProperty(res, "writeData", {
            enumerable: false,
            configurable: false,
            writable: false,
            value: function (prop) {
                for(var i in prop)
                    this[i] = prop[i];
            }
        });
        Object.defineProperty(res, "save", {
            enumerable: false,
            configurable: false,
            writable: false,
            value: function() {
                var tmp_url = this.properties.url;
                var tmp = this;
                for(var i in this.properties.params) {
                    tmp_url = tmp_url.replace('/:'+i, '');
                }
                var xhr = new XMLHttpRequest();
                xhr.open("POST", tmp_url, true);
                xhr.onload = function (e) {
                    if (xhr.readyState === 4) {
                        if (xhr.status >= 200 && xhr.status < 300) {
                            var data = JSON.parse(xhr.responseText);
                            if(!Array.isArray(data))
                                tmp.writeData(data);
                        } else {
                            console.error(xhr.statusText);
                        }
                    }
                };
                xhr.onerror = function (e) {
                    console.error(xhr.statusText);
                };
                xhr.send(JSON.stringify(this));
            }
        });
        Object.defineProperty(res, "update", {
            enumerable: false,
            configurable: false,
            writable: false,
            value: function () {
                var tmp_url = this.properties.url;
                    for(var i in this.properties.params) {
                        for(var j in this) {
                            if(i == j) {
                                tmp_url = tmp_url.replace('/:'+i, '/'+this[j]);
                            }
                        }
                    }
                var xhr = new XMLHttpRequest();
                xhr.open("PUT", tmp_url, true);
                xhr.onload = function (e) {
                    if (xhr.readyState === 4) {
                        if (xhr.status >= 200 && xhr.status < 300) {
                            var data = JSON.parse(xhr.responseText);
                            if(!Array.isArray(data))
                                res.writeData(data);
                        } else {
                            console.error(xhr.statusText);
                        }
                    }
                };
                xhr.onerror = function (e) {
                    console.error(xhr.statusText);
                };
                xhr.send(JSON.stringify(this));
            }
        });
        if(params){
            for(var i in params)
                res[i] = params[i];
        }
        return res;
    }
    var result = function(){
        return new ObjectModel(false, {url: url, params: params});
    }
    result.query = function(arg) {
        var tmp_url = url;
        if(arg){
            for(var i in params) {
                for(var j in arg) {
                    if(i == j) {
                        tmp_url = tmp_url.replace('/:'+i, '/'+arg[j]);
                    }
                }
            }
        }else {
            for(var i in params) {
                tmp_url = tmp_url.replace('/:'+i, '');
            }
        }
        return getData(tmp_url, true);
    };
    result.get = function(arg) {
        var tmp_url = url;
        if(arg){
            for(var i in params) {
                for(var j in arg) {
                    if(i == j) {
                        tmp_url = tmp_url.replace('/:'+i, '/'+arg[j]);
                    }
                }
            }
        }else {
            for(var i in params) {
                tmp_url = tmp_url.replace('/:'+i, '');
            }
        }
        return getData(tmp_url);
    };
    result.prototype.constructor = function(){
        console.log("TEST");
    }
    return result;
}
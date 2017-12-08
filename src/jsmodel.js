/**
 * Created by MPoreda on 08.12.2017.
 */
function jsModel(url, params) {
    var url = url;
    var params = params;
    function getData(tmp_url, isMultiple)
    {
        console.log(isMultiple);
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
            var res = ObjectModel();
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
    function ObjectModel(params)
    {
        var res = {};
        if(params){
            for(var i in params)
                res[i] = params[i];
        }
        Object.defineProperty(res, "writeData", {
            enumerable: false,
            configurable: false,
            writable: false,
            value: function (prop) {
                for(var i in prop)
                    this[i] = prop[i];
            }
        });
        return res;
    }
    var result = {
        query: function(arg) {
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
        },
        get: function(arg) {
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
        }
    }
    return result;
}
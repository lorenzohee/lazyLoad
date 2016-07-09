/**
 * Created by Lorenzo ho on 2016/7/9.
 */
(function() {
    this.LazyLoad = {
        _init: function() {
            var self;
            self = this;
            self.isload = true;
            window.onscroll = function() {
                return self._load();
            };
            if (self.isDebug){
                console.log(this);
            }
        },
        config: function(obj){
            var self = this;
            self.pageSize = obj.pageSize || 10;
            self.lazyClass = obj.lazyClass || 'lazyFlag';
            self.url = obj.url || window.location.href;
            self.lazyCallBack = obj.lazyCallBack;
            self.autoplay = obj.autoplay || true;
            self.isDebug = obj.isDebug || false;
        },
        _load: function() {
            var _recordLength, documentHeight, loadHeight=100, pageNum, scrollHight, self, windowHeight;
            self = this;
            _recordLength = document.querySelectorAll('.'+self.lazyClass).length;
            if (_recordLength % self.pageSize === 0 && self.isload) {
                documentHeight = parseInt(document.body.scrollHeight, 10);
                windowHeight = parseInt(window.innerHeight || document.documentElement.clientHeight, 10);
                scrollHight = parseInt(document.body.scrollTop, 10);
                console.log(documentHeight - scrollHight - windowHeight< loadHeight);
                if (documentHeight - scrollHight - windowHeight < loadHeight) {
                    self.isload = false;
                    pageNum = _recordLength / self.pageSize;
                    var xmlhttp=new XMLHttpRequest();
                    xmlhttp.onreadystatechange=function(){
                        if (xmlhttp.readyState==4 && xmlhttp.status==200)
                        {
                            if(self.lazyCallBack && typeof self.lazyCallBack === 'function'){
                                self.lazyCallBack(xmlhttp.responseText);
                            }else {
                                document.querySelector('.'+self.lazyClass).parentNode.appendChild(new DOMParser().parseFromString(xmlhttp.responseText,"text/xml"));
                            }
                            self.isload = true;
                        }
                    };
                    xmlhttp.open("GET", self._changeUrl('page', 1 + parseInt(pageNum)), true);
                    xmlhttp.send();
                }
            }
        },
        _changeUrl: function(arg0, arg1) {
            var content, flag, key, params, paramsTemp, url, urlTemp, value;
            url = this.url;
            urlTemp = url.split('?');
            params = new Array();
            if (urlTemp.length > 1) {
                paramsTemp = urlTemp[1].split("&");
                if (paramsTemp.length > 0) {
                    for(var k in paramsTemp) {
                        var eParam = paramsTemp[k].split('=');
                        if (eParam[0] !== arg0) {
                            params[eParam[0]] = eParam[1];
                        }
                    }
                }
            }
            params[arg0] = arg1;
            content = "?";
            flag = false;
            for (key in params) {
                value = params[key];
                if (flag) {
                    content = content + "&";
                }
                content = content + key + "=" + value;
                flag = true;
            }
            return urlTemp[0] + encodeURI(content);
        },
    };
    if ( typeof define === "function" && define.amd ) {
        define( "lazyLoad", [], function() {
            return LazyLoad;
        } );
    };
    window.onload = function(){
        if(LazyLoad.autoplay){
            LazyLoad._init();
        }
    };
}).call(this);

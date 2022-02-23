(function(window) {
    //html对数据的依赖收集
    var Deps = {};
    //通知html更新
    var notice = function(name) {
        let list = Deps[name];
        if (Array.isArray(list) && list.length) {
            console.warn("set", name);
            list.forEach((item) => {
                item();
            });
        }
    };
    //双向绑定，state封装，收集依赖
    var stateFactory = function(obj) {
        let state = {};
        let keys = Object.keys(obj);
        let noticeDeps = {}; //计算依赖收集，实现类似vue computed这样的方法
        keys.forEach((key) => {
            //===============赋值【
            let val = obj[key];
            if (Array.isArray(obj[key]) && typeof obj[key][0] == "function") {
                console.warn("obj[key][0]", obj[key][0]);
                val = obj[key][0];
            }
            state[`_${key}`] = val; //用下划线开头封装起来，而不是直接访问
            //==============赋值】

            //===============计算依赖收集【
            //这里是反向操作，解析依赖其他数据的属性，给【被依赖】的属性添加依赖自己的‘属性名字’
            //被依赖的数据更新时候，通知依赖本数据的数据触发更新dom操作
            if (Array.isArray(obj[key]) && Array.isArray(obj[key][1])) {
                obj[key][1].forEach((depKey) => {
                    if (!noticeDeps[depKey]) {
                        noticeDeps[depKey] = [];
                    }
                    noticeDeps[depKey].push(key);
                });
                console.warn("通知队列", noticeDeps);
            }
            //======================计算依赖收集】
        });
        //拼凑数据，添加set和get
        keys.forEach((key) => {
            Object.defineProperty(state, `${key}`, {
                get() {
                    return state[`_${key}`];
                },
                set(newValue) {
                    //如果设置的值一样，不做任何处理
                    if (state[`_${key}`] === newValue) {
                        return;
                    }
                    state[`_${key}`] = newValue; //用下划线开头封装起来，不直接设置
                    notice(key);
                    noticeDeps[key] && noticeDeps[key].forEach((item) => notice(item)); //通知依赖本数据的对象更新
                },
                enumerable: true,
                configurable: true,
            });
        });
        return state;
    };

    window.MVVM = function MVVM(data) {
        var test = stateFactory(data);
        console.warn("封装后的state", test);
        console.warn("封装后的Dep", Deps);

        function parse() {
            var doms = document.querySelectorAll("[v-data]");
            for (let i = 0; i <= doms.length - 1; i++) {
                let tagName = doms[i].tagName.toUpperCase();
                let data = doms[i].getAttribute("v-data");
                if (!Deps[data]) {
                    Deps[data] = [];
                }
                var func = function() {
                    let val = test[data];
                    if (typeof test[data] == "function") {
                        val = test[data]();
                        console.log("person inner", val);
                    }
                    if (tagName == "INPUT") {
                        doms[i].value = val;
                    } else {
                        doms[i].innerHTML = val;
                    }
                };
                Deps[data].push(func);
                func();
            }
            console.warn("Deps", Deps);
        }
        //解析html，并收集依赖
        parse();
        return test;
    };
})(window);
# lazyLoad
lazy load when scroll the page
1.引入lazyload.js文件
2.配置lazyload初始化文件
3.支持AMD
4.每次拉取文件时会调用LazyLoad.config中的callBack方法，请用回调函数加载相应的文件
5.此文件为示例文件，欢迎下载并使用，支持非商业用途
6.未解决问题：每次请求文件时不能直接加载到当前文档中（如果你有好的解决方案，欢迎维护）
7.API：
    LazyLoad.config({
        pageSize = 默认每次拉取的数据大小，请求的参数会在url上面加上page=pageSize,默认值为10;
        lazyClass = 请在每一条记录中加一class，计算记录的数量。默认值为： 'lazyFlag';
        url = 请求的地址，默认取当前地址;
        autoplay = 页面加载完后是否自动加载，如果填写false，请手动调用LazyLoad._init();默认值为true;
        isDebug = 是否启用调试模式，默认值为false;
        lazyCallBack: function(data){
            console.log('回调函数，data为返回的值，请组织DOM 格式');
        }
    })
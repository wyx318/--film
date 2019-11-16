// 点击进行跳转对应的页面
$('footer>div').click(function(){
    // 主页面跳转
    var index = $(this).index();
    $('section').hide().eq(index).fadeIn();
    // 红色标志
    $(this).addClass('active').siblings().removeClass('active');
})
// 向豆瓣公开api 请求数据 封装ajax 方便调用
var index = 0
// 函数节流设置
var isLoading = false ;
start()
function start(){
    if(isLoading) return 
    isLoading = true ;
    //小圆圈加载
    $('.loading').show();
    $.ajax({
        url: '//api.douban.com/v2/movie/imdb/tt0111161?apikey=0df993c66c0c636e29ecbb5344252a4a'//'//api.douban.com/v2/movie/top250',

        type: 'GET',
        data: {
            start: index,
            count: 20
        },
        // 此处注意跨域 
        dataType: 'jsonp'
    }).done(function(ret){
        console.log(ret);
        setData(ret)
        index+=20
        console.log(index);
    }).fail(function(){
        console.log('error');
    }).always(function(){
        isLoading = false ;
        //不论请求是不是加载完成 都要进行隐藏
        $('.loading').hide();
    })
}
//滚动加载 数据  下一个20项数据
// 函数节流
var clock 
$('main').scroll(function(){
    if(clock){
        clearTimeout(clock);
    }
    clock = setTimeout(function(){
        if($('section').eq(0).height() - 10 <= $('main').scrollTop() +
    $('main').height()){
        // 重新请求数据 
        start()
    }
    },300)
    
})
// 拼接DOM节点
function setData(data){
    data.subjects.forEach(function(movie){
        // 魔板字符串
        var tpl = 
        `
        <div class="item">
                <a href="#">
                <div class="cover">
                    <img src="" alt="">
                </div>
                <div class="detail">
                    <h2>霸王别姬</h2>
                <div class="extra"><span class="score"></span>分 /<span class="collect"></span>收藏</div>
                <div class="extra"><span class="year"></span>年/<span class="type"></span></div>
                <div class="extra">导演:<span class="director"></span></div>
                <div class="extra">主演:<span class="actor"></span></div>
                </div>
            </a>
         </div> `
        var $node = $(tpl) ;
        // 动态加载数据
        $node.find('.cover img').attr('src', movie.images.medium)
        $node.find('.detail  h2').text(movie.title)
        $node.find('.score').text(movie.rating.average)
        $node.find('.collect').text(movie.collect_count)
        $node.find('.year').text(movie.year)
        $node.find('.type').text(movie.genres.join('/'))
        $node.find('.director').text(function(){
            var directorsArr = []
            movie.directors.forEach(function(item){
                directorsArr.push(item.name)
            })
            return directorsArr.join('、')
        })
        $node.find('.actor').text(function(){
            var actorArr = []
            movie.casts.forEach(function(item){
                actorArr.push(item.name)
            })
            return actorArr.join('、')
        })
        $('#top250').append($node);
    })
}

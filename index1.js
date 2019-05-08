// 模块一top250
var top250 = {
    // 初始化 状态 
    init: function () {
        this.$element = $('#top250')
        // 圆圈加载
        this.isLoading = false
        this.index = 0
        this.isFinish = false 
        this.bind()
        this.start()
    },
    //事件
    bind: function () {
        var _this = this
        // 滚动事件
        this.$element.scroll(function () {
            _this.start()
        })
    },
    // 获取数据 并渲染
    start: function () {
        var _this = this
        // 异步获取
        this.getData(function (data) {
            _this.render(data)
        })
    },

    getData: function (callback) {
        var _this = this
        if (_this.isLoading) return ;
        _this.isLoading = true
        _this.$element.find('.loading').show()
        $.ajax({
            url: 'http://api.douban.com/v2/movie/top250',
            data: {
                start: _this.index || 0
            },
            dataType: 'jsonp'
        }).done(function (ret) {
            console.log(ret);
            _this.index += 20
            if (_this.index >= ret.total) {
                _this.isFinish = true
            }
            // 执行回调函数
            callback && callback(ret);
        }).fail(function () {
            console.log('请求异常');
        }).always(function () {
            _this.isLoading = false
            _this.$element.find('.loading').hide()
        })
    },
    render: function (data) {
        var _this = this
        data.subjects.forEach(function (movie) {
            var template = `<div class="item">
      <a href="#">
      <div class="cover">
      <img src="" alt="">
          </div>
      <div class="detail">
      <h2></h2>
      <div class="extra"><span class="score"></span>分 / <span class="collect"></span>收藏</div>
      <div class="extra"><span class="year"></span> / <span class="type"></span></div>
      <div class="extra">导演: <span class="director"></span></div>
      <div class="extra">主演: <span class="actor"></span></div>
    </div>
    </a>
    </div>`
            var $node = $(template)
            $node.find('a').attr('href', movie.alt)
            $node.find('.cover img')
                .attr('src', movie.images.medium)
            $node.find('.detail h2').text(movie.title)
            $node.find('.score').text(movie.rating.average)
            $node.find('.collect').text(movie.collect_count)
            $node.find('.year').text(movie.year)
            $node.find('.type').text(movie.genres.join(' / '))
            $node.find('.director').text(function () {
                var directorsArr = []
                movie.directors.forEach(function (item) {
                    directorsArr.push(item.name)
                })
                return directorsArr.join('、')
            })
            $node.find('.actor').text(function () {
                var actorArr = []
                movie.casts.forEach(function (item) {
                    actorArr.push(item.name)
                })
                return actorArr.join('、')
            })
            _this.$element.find('.container').append($node)
        })
    },
    isToBottom: function () {
        return this.$element.find('.container') <=
            this.$element.height() + this.$element.scrollTop() + 10
    }
}
// 模块二
var usBox = {
    init: function(){
      console.log('usBox ok')
      this.$element = $('#beimei')
      this.start()
    },

    start: function(){
      var _this = this
      this.getData(function(data){
        _this.render(data)
      })
    },
    getData: function(callback){
      var _this = this
      if(_this.isLoading) return;
      _this.isLoading = true
      _this.$element.find('.loading').show()
      $.ajax({
        url: 'http://api.douban.com/v2/movie/us_box',
        dataType: 'jsonp'
      }).done(function(ret){
        callback&&callback(ret)
      }).fail(function(){
        console.log('数据异常')
      }).always(function(){
        _this.$element.find('.loading').hide()
      })  
    },
    render: function(data){
      var _this = this
      console.log(data)
      data.subjects.forEach(function(movie){
        movie = movie.subject
        var template = `<div class="item">
      <a href="#">
      <div class="cover">
      <img src="" alt="">
          </div>
      <div class="detail">
      <h2></h2>
      <div class="extra"><span class="score"></span>分 / <span class="collect"></span>收藏</div>
      <div class="extra"><span class="year"></span> / <span class="type"></span></div>
      <div class="extra">导演: <span class="director"></span></div>
      <div class="extra">主演: <span class="actor"></span></div>
    </div>
    </a>
    </div>`
        var $node = $(template)
        $node.find('a').attr('href', movie.alt)
        $node.find('.cover img')
        .attr('src', movie.images.medium )
        $node.find('.detail h2').text(movie.title)
        $node.find('.score').text(movie.rating.average )
        $node.find('.collect').text(movie.collect_count )
        $node.find('.year').text(movie.year)
        $node.find('.type').text(movie.genres.join(' / '))
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
        _this.$element.find('.container').append($node)
      })
    }
  }
   
// 模块三
var search = {
    init: function(){
      console.log('usBox ok')
      this.$element = $('#search')
      this.keyword = ''
      this.bind()
      this.start()
    },

    bind: function(){
      var _this = this
      this.$element.find('.button').click(function(){
        _this.keyword = _this.$element.find('input').val()
        _this.start()
      })
    },
    start: function(){
      var _this = this
      this.getData(function(data){
        _this.render(data)
      })
    },
    getData: function(callback){
      var _this = this
      _this.$element.find('.loading').show()
      $.ajax({
        url: 'http://api.douban.com/v2/movie/search',
        data: {
          q: _this.keyword
        },
        dataType: 'jsonp'
      }).done(function(ret){
        callback&&callback(ret)
      }).fail(function(){
        console.log('数据异常')
      }).always(function(){
        _this.$element.find('.loading').hide()
      })  
    },
    render: function(data){
      var _this = this
      console.log(data)
      data.subjects.forEach(function(movie){
        var template = `<div class="item">
      <a href="#">
      <div class="cover">
      <img src="" alt="">
          </div>
      <div class="detail">
      <h2></h2>
      <div class="extra"><span class="score"></span>分 / <span class="collect"></span>收藏</div>
      <div class="extra"><span class="year"></span> / <span class="type"></span></div>
      <div class="extra">导演: <span class="director"></span></div>
      <div class="extra">主演: <span class="actor"></span></div>
    </div>
    </a>
    </div>`
        var $node = $(template)
        $node.find('a').attr('href', movie.alt)
        $node.find('.cover img')
        .attr('src', movie.images.medium )
        $node.find('.detail h2').text(movie.title)
        $node.find('.score').text(movie.rating.average )
        $node.find('.collect').text(movie.collect_count )
        $node.find('.year').text(movie.year)
        $node.find('.type').text(movie.genres.join(' / '))
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
        _this.$element.find('.search-result').append($node)
      })
    }
  }

//面向对象式编程 便于维护 此处为总开关 
var app = {
    //初始化方法
    init: function () {
        this.$tabs = $('footer>div')
        this.$panels = $('section')
        this.bind()
        //开关
        top250.init()
        usBox.init()
        search.init()
    },
    // 绑定处理事件
    bind: function () {
        var _this = this;
        this.$tabs.on("click", function () {
            //红标志
            $(this).addClass('active').siblings().removeClass('active')
            //切换对应的面板 找到当前索引并显示出来 把兄弟元素隐藏
            _this.$panels.eq($(this).index()).fadeIn().siblings().hide()
        })
    }
    // 
}
// 调用该方法
app.init()
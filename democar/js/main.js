Vue.component('nested-menu', {
  props: ["list", "first", "main", "mobile", "bread", "nav", "footer", "collapse"],
  computed: {
    breadshift: function() { let arr = this.bread.split('.'); arr.shift(); return arr.join('.') }
  },
  template: `
    <ul v-bind:class="{dropdownv2: !first, dropdown: first, 'main__menu': main, '': mobile, 'nav__list': nav, 'ft__menu': footer}">
      <li v-for="(value,index) in list" class="drop">
        <a 
          v-bind:href="value.route"
          v-bind:style="{color: (bread && parseInt(bread.split('.')[0]) == index) ? '#fcc236' : ''}" 
        >{{value.name}}</a>
        <nested-menu v-bind:bread="(bread ? breadshift : bread)" v-bind:list="value.subroute" v-bind:mobile="mobile" v-bind:first="main" v-if="value.subroute && !footer && !nav"></nested-menu>
      </li>
    </ul>
  `
})

Vue.component('product-list', {
  props: ["list", "large", "full"],
  data() {
    return {
      local: window.localStorage.getItem('local') ? window.localStorage.getItem('local') : 'vi'
    }
  },
  template: `
    <div>
      <div v-bind:class="{'col-md-3 col-sm-12 col-xs-12': large && !full, 'col-md-4 col-sm-12 col-xs-12': !large && !full, 'col-md-12 col-sm-12 col-xs-12': full}" v-for="(item, index) in list">
        <div class="product-details">
            <a v-bind:href="'product-details.html?id=' + item.id + '&bread=' + item.bread">
                <img v-bind:src="item.imagesDirs + '0.jpg'" alt="project thumbnails">
                <div class="product-name">{{item.name}}</div>
                <div style="padding-top: .5rem; padding-bottom: .5rem">
                  <div style="font-weight: bold" class="product-property">{{ilang('productcode', local)}}</div>
                  <div class="product-property" >{{item.code}}</div>
                  <div style="font-weight: bold" class="product-property">{{ilang('origin', local)}}</div>
                  <div class="product-property">{{item.origin}}</div>
                </div>
            </a>
        </div>
      </div>
    </div>
  `
})

Vue.component('news-list', {
  props: ["list", "sublist"],
  data() {
    return {
      local: window.localStorage.getItem('local') ? window.localStorage.getItem('local') : 'vi'
    }
  },
  template: `
  <div>
    <div class="col-md-4 col-lg-4 col-sm-12 col-xs-12" v-for="item in list">
      <div class="blog">
          <div class="blog__thumb">
              <a v-bind:href="'news-details.html?id=' + item.id + '&bread=' + item.bread">
                  <img v-bind:src="item.thumbnail" alt="blog thumbnail">
              </a>
          </div>
          <div class="blog__details">
              <h2><a v-bind:href="'news-details.html?id=' + item.id + '&bread=' + item.bread">{{item.title}} </a></h2>
              <div>{{item.createdAt}}</div>
              <div class="post__content" style="padding-bottom: 0;">
                  <p>{{item.shortContent}}</p>
              </div>
              <div class="blog__btn">
                  <a v-bind:href="'news-details.html?id=' + item.id + '&bread=' + item.bread">{{ilang('readmore', local)}}<i class="zmdi zmdi-long-arrow-right"></i></a>
              </div>
          </div>
      </div>
    </div>
    <div class="col-md-4 col-lg-4 col-sm-12 col-xs-12" v-if="sublist">
      <div class="pt--30">
          <div v-for="item in sublist" class="subblog mb--10">
              <img v-bind:src="item.thumbnail" alt="latest_news" style="width: 30%; float: left; margin-right: 1rem;"/>
              <h5 style="text-align: justify;">{{item.title}}</h5>
              <p style="text-align: justify;">{{item.shortContent}}</p>
          </div>
      </div>
    </div>
  </div>
  `
})

Vue.component('customfooter', {
  props: ["menu"],
  data() {
    return {
      local: window.localStorage.getItem('local') ? window.localStorage.getItem('local') : 'vi'
    }
  },
  template: `
  <footer class="pt--100">
  <div class="ptb--50" data--1f2d30__overlay="9.5" style="background: rgba(0, 0, 0, 0) url(images/bg/footer.jpg) no-repeat fixed center center / cover ;">
      <div class="container">
          <div class="row">
              <div class="footer_wrap clearfix">
                  <!-- Start Single Footer -->
                  <div class="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                      <div class="footer">
                          <div class="footer__widget">
                              <h2 class="ft__title">{{ilang('block.contactinfor', local)}}</h2>
                          </div>
                          <div class="ft__details">
                              <p> <i class="zmdi zmdi-pin"></i> {{ilang('detailAddress', local)}} <br> {{ilang('address', local)}} </p>
                              <p> <i class="fa fa-envelope"></i> <a v-bind:href="'mailto:' + ilang('email', local)">{{ilang('email', local)}}</a></p>
                              <p> <i class="fa fa-globe" aria-hidden="true"></i> <a v-bind:href="ilang('website', local)">{{ilang('website', local)}}</a></p>
                              <p> <i class="fa fa-phone" aria-hidden="true"></i> <a v-bind:href="'tel:' + ilang('phone', local)">{{ilang('hotline', local)}}</a></p>
                          </div>
                      </div>
                  </div>
                  <!-- End Single Footer -->
                  <!-- Start Single Footer -->
                  <div class="col-md-3 col-lg-3 col-sm-12 col-xs-12 xmt-40">
                      <div class="footer quick__link">
                          <h2 class="ft__title">{{ilang('block.quicklink', local)}}</h2>
                          <div class="footer__link">
                              <nested-menu v-bind:list="menu" v-bind:footer="true"></nested-menu>
                          </div>
                      </div>
                  </div>
                  <!-- End Single Footer -->
                  <!-- Start Single Footer -->
                  <div class="col-md-3 col-lg-3 col-sm-12 col-xs-12 xmt-40">
                      <div class="footer quick__link">
                          <h2 class="ft__title">{{ilang('block.products', local)}}</h2>
                          <div class="footer__link">
                              <nested-menu v-bind:list="menu[1].subroute" v-bind:footer="true"></nested-menu>
                          </div>
                      </div>
                  </div>
                  <!-- End Single Footer -->
              </div>
          </div>
      </div>
  </div>
</footer>
  `
})

Vue.component('breadcrumb', {
  props: ["bread", "menu"],
  computed: {
    listIndex: function () {
      return list = this.bread.split('.');
    }
  },
  methods: {
    getRoute(index) {
      let query = `this.menu[${this.listIndex[0]}]`;
      for(let i = 1; i <= index; i ++) {
        query += `.subroute[${this.listIndex[i]}]`
      }
      return query
    },
    getBread() {
      let res = ""
      for(let i = 0; i < this.listIndex.length; i ++){
        if(eval(this.getRoute(i)))
          res += 
          `<a class="breadcrumb-item" href="${eval(this.getRoute(i) + '.route')}">${eval(this.getRoute(i) + '.name')}</a>
          `
          if(i !== this.listIndex.length - 1) res += `<span class="brd-separetor">-</span>`
      }
      return res
    },
    getTitle() {
      if(eval(this.getRoute(this.listIndex.length - 1)))
        return eval(this.getRoute(this.listIndex.length - 1) + '.name')
      return ""
    }
  },
  //
  template: `
  <div data--black__overlay="6" v-bind:style="{background: 'rgba(0, 0, 0, 0) url(images/bg/bread/' + bread + '.jpg) no-repeat scroll center center / cover'}">
            <div class="bradcaump__wrap">
                <div class="container">
                    <div class="row">
                        <div class="col-xs-12">
                
    <div class="bradcaump__inner text-center">
      <h2 class="bradcaump-title" v-html="getTitle()"></h2>
      <nav class="bradcaump-inner">
        <a class="breadcrumb-item" href="index.html">{{ menu[0].name }}</a>
        <span class="brd-separetor">-</span>
        <span v-html="getBread()"></span>
      </nav>
    </div>
    </div>
</div>
</div>
</div>
</div>
  `
})

const appVue = new Vue({
  el: '#root',
  data: {
    menu:  [
      {"route":"index.html","dirs":["index"],"name":"Trang chủ"},
      {"name":"Các sản phẩm", "dirs":["index"], "subroute":[],"route":"products.html?bread=1"},
      {"name":"Giới thiệu","route":"about.html?bread=2","dirs":["index"],"bread":"2"},
      {"bread":"3","subroute":[],"dirs":["index"],"name":"Tin tức","route":"news.html?bread=3"},
      {"route":"contact.html?bread=4","dirs":["index"],"bread":"4","name":"Liên hệ"}
    ],
    news: {
      allNews: []
    },
    product: {
      allProducts: []
    },
    local: window.localStorage.getItem('local') ? window.localStorage.getItem('local') : 'vi',
    scrollTrigger: 100,
    showScrollTop: false,
    scrollMenu: false,
    pageId: null
  },
  methods: {
    ilang(reference) {
      return ilang(reference, this.local)
    },
    setPageId(id) {
      this.pageId = id
    },
    getQuery() {
      let search = location.search.substring(1);
      if(!search || search.length == 0) return {};
      return JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
    },
    scrollTop() {
        var dis = window.document.scrollingElement.scrollTop;
        function frame() {
            dis -= 47  // update parameters
            window.document.scrollingElement.scrollTop = dis
            if (dis <= 0)
              clearInterval(id)
        }
        var id = setInterval(frame, 10)
    },
    scrollHandler() {
      let scrollTop = window.document.scrollingElement.scrollTop;
      this.showScrollTop = scrollTop > this.scrollTrigger;
      this.scrollMenu = scrollTop > this.scrollTrigger;
    },
    getRef(bread) {
      let breadPage = {
        '0': 'index',
        '1': 'products',
        '2': 'about',
        '3': 'news',
        '4': 'contact'
      }
      let query = bread ? 'this.menu[' + bread.split('.').join('].subroute[') + ']' : 'this.menu'
      let rootIndex = bread ? bread.split('.')[0] : '0'
      return {root: breadPage[rootIndex], ref: eval(query), query: query}
    },
    changeLang(lang){
      this.local = lang;
      window.localStorage.setItem('local', lang);
      window.location.reload()
    },
  },
  mounted() {
    window.localStorage.getItem('local') ? {} : window.localStorage.setItem('local', 'vi')
    this.menu = main_menu

    if(this.pageId == 0 || this.pageId == 1 || this.pageId == 5) {
      let arr_prod = [];
      products.map((item, index) => {
        if(item.bread.startsWith( this.getQuery().bread || '1')){
          item.id = index
          arr_prod.push(item)
        }
      })
      this.product.allProducts = arr_prod
    }

    let thumb = new Swiper('.swiper-thumb', {
      spaceBetween: 10,
      slidesPerView: 5,
      loadPrevNextAmount: 5,
      preloadImages: false,
      lazy: true,
      loop: true,
      freeMode: true,
      watchSlidesVisibility: true,
      loopedSlides: 5,
      watchSlidesProgress: true,
    })

    new Swiper('#swiper-container', {
      direction: 'horizontal',
      loop: true,
      autoplay: {
        delay: 3000,
      },
      loopedSlides: 5,
      preloadImages: false,
      loadPrevNextAmount: 5,
      lazy: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      thumbs: {
        swiper: thumb
      }
    })

    this.scrollHandler();
    window.onscroll = () => {
      this.scrollHandler();
    }
  }
})
    
$('.mobile-menu nav').meanmenu({
    meanMenuContainer: '.mobile-menu-area',
    meanScreenWidth: "991",
    meanRevealPosition: "right",
});
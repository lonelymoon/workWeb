(function(){

var vm = new Vue({
    el: '#app',
    data: {
      path: '../',
      headers: [
        {
          text: 'id',
          align: 'left',
          sortable: false,
          value: 'uid'
        },
        {
          text: '姓名',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        {
          text: '座右铭',
          align: 'left',
          sortable: false,
          value: 'describe'
        },
        {
          text: '图片',
          align: 'left',
          sortable: false,
          value: 'img'
        },
        {
          text: '调整顺序',
          sortable: false,
          value: 'sort'
        },
        {
          text: '编辑',
          sortable: false,
          value: 'edit'
        },
        {
          text: '最近录入',
          align: 'left',
          sortable: false,
          value: 'date'
        }
      ],
      items: [],
      activeKind: '3',
      name: '',
      desc: '',
      file: null,
      kinds: [
          {
              kid: '1',
              text: '2+200以上'
          },
          {
              kid: '2',
              text: '2+200'
          },
          {
              kid: '3',
              text: '1+100'
          },
          {
              kid: '4',
              text: '1+30'
          }
      ],
      showNav: false
    },
    computed: {
      today: function(){
        var d = new Date(),
            y = d.getFullYear(),
            m = d.getMonth() + 1,
            d = d.getDate();

        return y + '年' + m + '月' + d + '日';
      }
    },
    methods: {
      post:function(){
        if( !this.name ){
            alert("请输入名字");
            return false;
        }

        var fd = new FormData();

        fd.append('name',this.name);
        fd.append('img',this.file);
        fd.append('desc',this.desc);
        fd.append('kind', this.activeKind);

        var xhr = new XMLHttpRequest();

        xhr.onload = function(e){
            console.log(e);
        };

        xhr.open('post', '../php/save.php');

        xhr.send(fd);
      },
      changeKind: function(kid){
        this.activeKind = kid;
        this.getLists();
      },
      changeImage:function(event){
        var file = event.target.files[0];
        this.file = file;
      },
      getLists: function(){

        var fd = new FormData();
        var xhr = new XMLHttpRequest();
        var _self = this;

        fd.append('kind', this.activeKind);

        xhr.onload = function(e){
            var res = JSON.parse(e.target.response);
            _self.items = res;
        };

        xhr.open('post','../php/list.php');
        xhr.send(fd)

      },
      swapUp: function(data){
        if( data.index === 0 ) return false;

        var prevItem = this.items[data.index - 1];

        this.swap(data.item, prevItem);
      },
      swapDown: function(data){
        if( data.index === this.items.length - 1 ) return false;

        var prevItem = this.items[data.index + 1];

        this.swap(data.item, prevItem);
      },
      swap: function(first, second){
        var xhr = new XMLHttpRequest(),
            fd = new FormData();

        fd.append('fuid', first.uid);
        fd.append('fidx', first.idx);
        fd.append('suid', second.uid);
        fd.append('sidx', second.idx);

        xhr.onload = function(e){
          console.log(e);
        };

        xhr.open('post','../php/swap.php');

        xhr.send(fd)
      }
    },
    mounted: function(){
      this.getLists();
    }
})
})();
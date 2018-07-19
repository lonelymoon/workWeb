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
      activeKind: '1',
      name: '',
      desc: '',
      file: null,
      // 类型
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
      // 是否显示导航栏
      showNav: false,
      // 是否正在交换序列
      onSwaping: false,
      // dialog控制
      dialog: false,
      // confirm控制
      confirm: false,
      // form是否已选择图片
      hasImage: false,
      // img的地址
      dialogImage: '',
      // 提交的状态
      isEditing: false,
      // edit Item
      editItem: null,
      // delete item
      deleteItem: null
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

        if( this.isEditing ){
          this.update();
          return false;
        }

        var fd = new FormData(),
            _self = this;

        fd.append('name',this.name);
        fd.append('img',this.file);
        fd.append('desc',this.desc);
        fd.append('kind', this.activeKind);

        var xhr = new XMLHttpRequest();

        xhr.onload = function(e){
          if(e.target.response == '1'){
            alert("添加成功");
            _self.getLists();
            _self.dialog = false;
          } else {
            alert('上传数据失败');
          }
        };

        xhr.open('post', '../php/save.php');

        xhr.send(fd);
      },
      edit:function(data){
        var item = data.item;

        this.editItem = item;
        this.name = item.name;
        this.desc = item.describe;
        this.dialogImage = item.img ? this.path + item.img : '';

        this.dialog = true;
        this.isEditing = true;

      },
      update:function(){

        var fd = new FormData(),
          _self = this;

        fd.append('uid',this.editItem.uid * 1 );
        fd.append('name',this.name);
        fd.append('img',this.file);
        fd.append('desc',this.desc);
        fd.append('imgPath',this.editItem.img);

        var xhr = new XMLHttpRequest();

        xhr.onload = function(e){
          if(e.target.response == '1'){
            alert("修改成功");
            _self.getLists();
            _self.dialog = false;
          } else {
            alert('上传数据失败');
          }
        };

        xhr.open('post', '../php/update.php');

        xhr.send(fd);
      },
      proxyDelete:function(data){
        this.confirm = true;
        this.deleteItem = data.item;
      },
      del:function(){
        var item = this.deleteItem,
            uid = item.uid,
            _self = this,
            fd = new FormData(),
            xhr = new XMLHttpRequest();

        fd.append('uid',uid);

        xhr.onload = function(e){
          console.log(e);
          if( e.target.response == "1"){
            alert("删除成功");
            _self.getLists();
            _self.confirm = false;
          } else {
            alert("删除失败");
          }
        }

        xhr.open("post", '../php/delete.php');

        xhr.send(fd);
      },
      changeKind: function(kid){
        this.activeKind = kid;
        this.getLists();
      },
      changeImage:function(event){
        var file = event.target.files[0],
            _self = this;
        this.file = file;
        var fr = new FileReader();
        fr.onload = function(e){
          _self.dialogImage = e.target.result;
        };
        fr.readAsDataURL(file);
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
            fd = new FormData(),
            _self = this;

        if(this.onSwaping) {
          alert("您操作得太快了，系统有点跟不上，请稍候重试");
          return false;
        }

        this.onSwaping = true;

        fd.append('fuid', first.uid * 1);
        fd.append('fidx', first.idx * 1);
        fd.append('suid', second.uid * 1);
        fd.append('sidx', second.idx * 1);

        xhr.onload = function(e){
          _self.onSwaping = false;
          if( e.target.response == "1" ){
            _self.getLists();
          } else {
            alert("调整失败");
          }
        };

        xhr.onerror = function(e){
          alert("操作失败,可能是由于您的网络问题");
          _self.onSwaping = false;
        };

        xhr.open('post','../php/swap.php');

        xhr.send(fd)
      }
    },
    mounted: function(){
      this.getLists();
    },
    watch: {
      dialog: function(){
        if( this.dialog ) return false;
        this.name = '';
        this.desc = '';
        this.file = null;
        this.dialogImage = '';
        this.isEditing = false;
        this.editItem = null;
      },
      confirm: function(){
        if( this.confirm ) return false;
        this.deleteItem = null;
      }
    }
})
})();
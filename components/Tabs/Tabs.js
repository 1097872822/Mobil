// components/Tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs:{
      type:Array,
      value:[]
    }

  },


  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 页面.js 文件中 存放事件回调函数的时候存放在data同层级下
   * 组件.js 文件中 存放事件回调函数的时候存放在method
   */
  methods: {
    hanldeItemTap(e){
      // 点击事件触发的时候
      //触发父组件中的自定义事件 同时传递数据给父组件
      //this.triggerEvent("父组件自定义事件的名称","要传递的参数")


      //console.log(e)
      //获取索引
      const {index}=e.currentTarget.dataset;

      this.triggerEvent("itemChange",{index});
      //获取data中的数组
      // let tabs =JSON.parse(JSON.stringify(this.data.tabs));
      //let {tabs}=this.data;
      //循环数组
      //[].forEach 遍历数组 遍历数组的时候 修改了v也会导致源数组被修改
      //tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
      //this.setData({
     //   tabs
     // });

    }
  }
})

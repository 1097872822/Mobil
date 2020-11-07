// pages/search/search.js
import {request}from "../../request/index";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //轮播图数组
    swiperList:[],
    total :0,
    tabs:[
      {
        id:0,
        name:"看书",
        isActive:true
      },
      {
        id:1,
        name:"视频",
        isActive:false
      },
    ],
     bookPaiList:[],
     bookTimeList:[],
     bookList:[],
     videoList:[],

  },
  //页面开始加载 就会触发
 onLoad:function(options){
  request({url:"/home/swiperdata"})
  .then(result =>{
    this.setData({
        
            swiperList: result.content
          })
  });
  this.getPai();
  this.getNewTime();
  this.getBookList();
  this.getVideoList();

 },
//  获取视频
async getVideoList(){
  const res=await request({url:"/videos/index"});
  this.setData({
    videoList:res.content
  })
},
 //  获取排名数据
async getPai(){
  
  const res=await request({url:"/books/bookpai"});
    this.setData({
      bookPaiList:res.content
    })
    wx.setStorageSync("bookList", res.content);
    // console.log(res);
},
 //  获取最新数据
async getNewTime(){

  const res=await request({url:"/books/booktime"});
    this.setData({
      bookTimeList:res.content
    })
    // console.log(res);
},
  // 获取商品列表数据
  async getBookList(){
    // console.log(this.QueryParams)
    const res = await request({url:`/books/search?cid=8`});
      this.setData({
        bookList:res.content
      })
      
     console.log(res);
     
    },
    goToPaiMore:function(param){
      // console.log(param);
      wx.navigateTo({
        url: '../books_list/index?caId=8',
        
      });
    },


//自定义事件 接受子组件传递的数据
handleItemChange(e){
  //接受传递过来的参数
  const {index} = e.detail;
  //console.log(index);
  let {tabs}=this.data;
      //循环数组
      //[].forEach 遍历数组 遍历数组的时候 修改了v也会导致源数组被修改
      tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
      this.setData({
        tabs
      });
},

handlePaiChange:function(){
  wx.navigateTo({
    url: '../bookpai/index',
    
  });
}

});
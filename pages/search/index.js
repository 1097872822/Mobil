//Page Object
import {request}from "../../request/index";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    MenuList:[],
    currentIndex:0

   
  },
  // 接口返回数据
  Cate:[],
 onLoad:function(options){
   this.getCates();
  //  缓存
   const Cate = wx.getStorageSync("cate");
   if(!Cate){
     this.getCates();
   }else{
     if(Date.now()-Cate.time>1000*10){
       this.getCates();
     }else{
       this.Cate=Cate.data;
       this.setData({
      
        MenuList:this.Cate
      })
     }
   }
   console.log(this.data.MenuList)

 },
//  获取分类数据
async getCates(){
  // request({
  //   url:"/home/categories"
  // })
  // .then(res=>{
  //   this.Cate=res.data.data.content
  //   wx.setStorageSync("cate",{time:Date.now(),data:this.Cate});
    
  //   this.setData({
      
  //     MenuList:this.Cate
  //   })
    
  // })

  const res=await request({url:"/home/categories"});
    this.Cate=res.content
    wx.setStorageSync("cate",{time:Date.now(),data:this.Cate});
    
    this.setData({
      MenuList:this.Cate
    })

},

  // 左侧点击事件
  handleItemTap(e){
    const {index}=e.currentTarget.dataset;
    //console.log(index);
    this.setData({
      curNav:index,
      scrollTop:0
    });
  }
  // 重新设置 右侧内容


});
  
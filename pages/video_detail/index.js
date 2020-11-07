import {
  request
} from "../../request/index";
import regeneratorRuntime from '../../lib/runtime/runtime';
function getRandomColor () {
  let rgb = []
  for (let i = 0 ; i < 3; ++i){
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    danmuTxt:'',
    v_deail:[]

  },
  getDanmu:function(e){
    this.setData({
      danmuTxt:e.detail.value
    })
  },
  sendDanmu:function(e){
    let text=this.data.danmuTxt;
    this.videoCtx.sendDanmu({
      text:text,
      color:getRandomColor()
    })
  },

vid:0,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.videoCtx= wx.createVideoContext('myVideo', this);
    console.log(options);
    this.getVideoDetail(options.vId);

  } ,
    //  获取详情数据
    async getVideoDetail(vId) {
      const res = await request({
        url: `/videos/delia?id=${vId}`
      })
      // this.BooksInfo = res.content;
      // let collect = wx.getStorageSync("collect")||[];
      // let isCollect=collect.some(v=>v.bookId===this.BooksInfo.bookId)
      // this.bookNumber=res.content.bookNumber;
      this.setData({
        v_deail: res.content,
        // isCollect
      })},
      clickup:function(e){
        console.log(e);
        
      }
})
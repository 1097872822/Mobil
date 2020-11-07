// pages/comment/index.js
import {
  request
} from "../../request/index";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pid: '',
    commentContent: '',
    bookid: ''

  },
  async handleFormSubmit() {
    if (this.data.commentContent == '') {
      wx.showToast({
        title: '评论内容不能为空',
        icon: 'none'
      })
      return;
    } else {
      const res = await request({
        url: `/comment/incomment?uid=${this.data.pid}&bookid=${this.data.bookid}&comment=${this.data.commentContent}`
      })
      if (res.content == 1) {
        wx.navigateBack({
          delta: 1
        });
        wx.showToast({
          title: '评论成功'
        })
      }
    }
  },
  handleTextinput(e) {
    this.setData({
      commentContent: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var person = wx.getStorageSync("student") || [];
    this.setData({
      pid: person.uId,
      bookid: options.bookid
    })
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },


})
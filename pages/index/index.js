//Page Object
import {
  request
} from "../../request/index";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {

    catesList: [],
    bookRecommend: []
  },
  goDetail(bookId) {
    console.log(bookId);

  },
  // 获取商品tuijian列表数据
  async getBookRecommendList() {
    // console.log(this.QueryParams)
    const res = await request({
      url: `/books/booklike?uid=${this.person.uId}`
    });
    console.log(res);

    this.setData({
      bookRecommend: res.content
    })
  },
  person: [],
  onShow: function () {
    this.person = wx.getStorageSync("student") || [];
    this.getBookRecommendList()
  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  onPageScroll: function () {

  },
  //item(index,pagePath,text)
  onTabItemTap: function (item) {

  }
});
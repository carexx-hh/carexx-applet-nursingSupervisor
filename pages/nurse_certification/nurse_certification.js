// pages/order/order.js
const util = require('../../utils/util.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    switchtab: [
      {
        name: '未认证',
      },
      {
        name: '已认证',
      },
      {
        name: '已拒绝',
      }
    ],
    current: 0,
    coupons: [],
    show_o:false,
    show_t: false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      token: wx.getStorageSync('token'),
      instId: wx.getStorageSync('instId')
    });
  },
  switchNav: function (e) {
    var that = this;
    var index = e.target.dataset.index;
    that.setData({
      current: index
    },function(){
      if(that.data.current==0){
        wx.request({
          url: app.globalData.baseUrl + '/inststaff/all_by_certification_status/1',
          method: 'get',
          header: {
            'content-Type': 'application/x-www-form-urlencoded',
            'auth-token': that.data.token
          },
          success: function (res) {
            console.log(res)
            that.setData({
              coupons: res.data.data,
              show_o: false,
              show_t: false,
            })
          }
        });
      } else if (that.data.current == 1){
        wx.request({
          url: app.globalData.baseUrl + '/inststaff/all_by_certification_status/2',
          method: 'get',
          header: {
            'content-Type': 'application/x-www-form-urlencoded',
            'auth-token': that.data.token
          },
          success: function (res) {
            console.log(res)
            that.setData({
              coupons: res.data.data,
              show_o: false,
              show_t: true,
            })
          }
        });
      } else if (that.data.current == 2) {
        wx.request({
          url: app.globalData.baseUrl + '/inststaff/all_by_certification_status/3',
          method: 'get',
          header: {
            'content-Type': 'application/x-www-form-urlencoded',
            'auth-token': that.data.token
          },
          success: function (res) {
            console.log(res)
            that.setData({
              coupons: res.data.data,
              show_o: true,
              show_t: false,
            })
          }
        });
      }
    });
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that=this;
    that.setData({
      current: 0
    })
    wx.request({
      url: app.globalData.baseUrl + '/inststaff/all_by_certification_status/1',
      method: 'get',
      header: {
        'content-Type': 'application/x-www-form-urlencoded',
        'auth-token': that.data.token
      },
      success: function (res) {
        console.log(res)
        that.setData({
          coupons: res.data.data
        })
      }
    });
  },
  clickDetails:function(e){
    var that=this;
    var certificationStatus = e.currentTarget.dataset.certificationstatus
    var id = e.currentTarget.dataset.id
    var instName = e.currentTarget.dataset.instname
    var serviceInstName = e.currentTarget.dataset.serviceinstname
    var realName = e.currentTarget.dataset.realname
    var idNo = e.currentTarget.dataset.idno
    var sex = e.currentTarget.dataset.sex
    var birthday = e.currentTarget.dataset.birthday
    var phone = e.currentTarget.dataset.phone
    var address = e.currentTarget.dataset.address
    app.id = id;
    app.instName = instName;
    app.serviceInstName = serviceInstName;
    app.realName = realName;
    app.idNo = idNo;
    app.birthday = birthday;
    app.sex = sex;
    app.phone = phone;
    app.address = address;
    app.certificationStatus = certificationStatus;
    wx.navigateTo({
      url: '../nurse_Auth_info/nurse_Auth_info',
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.switchTab({
      url: '../mine/mine',
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
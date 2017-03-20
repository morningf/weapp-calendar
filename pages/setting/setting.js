var app = getApp();

Page({
    data:{
        selectedTypeIndex: 0,
        arrTypeName: app.globalData.arrTypeName,
        arrTypeDetail: app.globalData.arrTypeDetail,
        showTypeDetail: true,
        typeDetailStr : ""
    },
    refresh: function(index){
        var data = this.data;
        if (index === 0)
        {
            this.setData({
                selectedTypeIndex: index,
                showTypeDetail: true,
                typeDetailStr : "将会清空日历上的倒班标识。"
            });
        }
        else if (index != data.arrTypeName.length - 1)
        {
            this.setData({
                selectedTypeIndex: index,
                showTypeDetail: true,
                typeDetailStr : "此种倒班方式以" +
                                data.arrTypeDetail[index].length +
                                "天为一个周期，倒班方式如下："
            });
        }
        else
        {
            this.setData({
                selectedTypeIndex: index,
                showTypeDetail: false,
            });
        }
    },
    onLoad: function(){
        var index = wx.getStorageSync('selectIndex');
        if (!index)
            index = 0;
        var customTypeStr = wx.getStorageSync('customTypeStr');
        if (!customTypeStr)
            customTypeStr = ""
        this.data.arrTypeDetail[this.data.arrTypeDetail.length - 1] = customTypeStr;
        var that = this;
        this.setData({
            arrTypeDetail: that.data.arrTypeDetail
        });
        this.refresh(index);
    },
    bindChange: function(e){
        const index = e.detail.value[0];
        this.refresh(index);
    },
    okTap: function(e){
        if (this.data.selectedTypeIndex === this.data.arrTypeName.length - 1 &&
            this.data.arrTypeDetail[this.data.arrTypeDetail.length - 1] === "")
        {
            wx.showModal({
                title: '提示',
                content: '自定义方式不能为空',
                showCancel: false
            });
            return;
        }
        app.setWorkTurnType(this.data.arrTypeName[this.data.selectedTypeIndex], this.data.arrTypeDetail[this.data.selectedTypeIndex]);
        wx.setStorageSync('selectIndex', this.data.selectedTypeIndex);
        if (this.data.selectedTypeIndex === this.data.arrTypeDetail.length - 1)
        {
            //将自定义信息存储起来
            wx.setStorageSync("customTypeStr", this.data.arrTypeDetail[this.data.arrTypeDetail.length - 1]);
        }
        wx.navigateBack();
    },
    addTap: function(e){
        this.data.arrTypeDetail[this.data.arrTypeDetail.length-1] += e.currentTarget.dataset.str;
        var that = this;
        this.setData({
            arrTypeDetail: that.data.arrTypeDetail
        });
    },
    deleteTap: function(){
        var str = this.data.arrTypeDetail[this.data.arrTypeDetail.length-1];
        this.data.arrTypeDetail[this.data.arrTypeDetail.length-1] = str.substr(0, str.length-1);
        var that = this;
        this.setData({
            arrTypeDetail: that.data.arrTypeDetail
        });
    },
    clearTap: function(e){
        this.data.arrTypeDetail[this.data.arrTypeDetail.length-1] = "";
        var that = this;
        this.setData({
            arrTypeDetail: that.data.arrTypeDetail
        });
    },
})
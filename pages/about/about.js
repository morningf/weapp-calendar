Page({
  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
  },
  data: {
    poster: 'http://p4.music.126.net/06Yhj36Qu3ZCQJklc9MNKg==/7980255395852522.jpg',
    name: '红模仿',
    author: '周杰伦',
    src: 'https://music163-gqk.rhcloud.com/455256306/320000/93968177fa0921fb555a72d53efd1ca81e4ad6f31b291dd2dba103fffe97c5cd',
  },
})
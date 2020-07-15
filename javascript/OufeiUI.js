(function () {
	var OufeiUI = function (obj) {
		this.param = obj
		this.type = obj.type
		this.typeData = obj.typeData
		this.init()
	}

	OufeiUI.prototype = {
		init: function () {
			if (this.type == 'dialog') {
				this.initDialog()
			}
		},
		initDialog() {
			var _this = this;
			document.getElementById(_this.typeData.domId).onclick = function () {
                _this.showDialog()
            };
		},
		showDialog() {
			var _this = this
			var autoCloseTime = this.typeData.autoClose
			var htmlDemo = $('<div class="oufei-dialog"><div class="in"><div class="title"><img src="./images/dialog-waring.png" alt="" /><span></span></div><p class="about"></p><p class="d-button">关闭</p><i class="d-close"><img src="./images/dialog-close.png" alt="" /></i></div></div>');

			htmlDemo.find('.title span').text(this.typeData.title || '提醒')
			htmlDemo.find('.about').html(this.typeData.about || '')

			htmlDemo.find('.d-close').click(function(){
				_this.closeDialog()	
			})

			if(autoCloseTime) {
				htmlDemo.find('.d-button').text(autoCloseTime / 1000 + '秒后自动返回')
				this.closeDialogTime = setTimeout(function(){
					_this.closeDialog()
				}, 5000)
			} else {
				htmlDemo.find('.d-button').click(function(){
					_this.closeDialog()	
				})
				htmlDemo.find('.d-close').remove()
			}

			$('body').append(htmlDemo)
		},
		closeDialog() {
			clearTimeout(this.closeDialogTime)
			$('.oufei-dialog').remove()
			if(this.typeData.callback) {
				this.typeData.callback()
			}
		}
	}

	window.OufeiUI = OufeiUI
})()
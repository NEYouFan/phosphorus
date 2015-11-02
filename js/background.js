//Phosphorus
//author @huntbao
'use strict'

let bg = {

    init() {
        var self = this
        self.browserAction()
    },

    browserAction() {
        chrome.browserAction.onClicked.addListener(function () {
            let screenWidth = window.screen.availWidth
            let screenHeight = window.screen.availHeight
            chrome.windows.create({
                url: 'index.html',
                left: 50,
                top: 50,
                width: screenWidth - 100,
                height: screenHeight - 100,
                type: 'panel'
            })
        })
    }
}

bg.init()
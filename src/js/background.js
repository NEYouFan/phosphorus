//Phosphorus
//author @huntbao
chrome.app.runtime.onLaunched.addListener(function() {
    chrome.system.display.getInfo(function(info) {
        var width = info[0].workArea.width
        var height = info[0].workArea.height

        if(width>1400 && height>800) {
            width = 1400
            height = 800
        }

        chrome.app.window.create('requester.html', {
            "id": "postman-main",
            "bounds": {
                width: width,
                height: height
            },
            "outerBounds": {
                width: width,
                height: height
            }
        }, function(win) {
            win.onClosed.addListener(function() {
                console.log("On closing the window")
            })
        })
    })
})

window.onload = function () {
    var inputCurl =document.getElementById('inputCurl')
    inputCurl.onkeyup = function() {
        getReq(inputCurl)
    } 
    var headerOrder = document.getElementById("headerOrder")
    headerOrder.onclick = function() {
        getReq(inputCurl)
    } 
}

function getReq(inputCurl){
    curl = inputCurl.value
    method = "GET"
    headerOrder = document.getElementById("headerOrder").checked
    if (curl != "") {
        var go_req = ""
        if (curl.slice(0,4) != "curl") {
            return
        }
        headers_list = curl.split(" -H ");
        if (headers_list.length != 0) {
            go_req += "headers := tls.Headers{\n";
            for (let index = 1; index < headers_list.length; index++) {
                if (headers_list[index].split(":")[0] != `"Cookie`) {
                    if (index == headers_list.length-1) {
                        headers_list[index] = headers_list[index].split(" --")[0]
                    }
                    splitHeader = headers_list[index].slice(1,-1).split(": ")
                    go_req += "`" +splitHeader[0] + "`";
                    go_req +=":`" +splitHeader[1] + "`,\n";
                }
            }
            go_req += "}\n"
            if (headerOrder) {
                go_req += "\nheaderOrder := tls.HeaderOrder{\n"
                for (let index = 1; index < headers_list.length; index++) {
                    headerKey = headers_list[index].split(":")[0].slice(1)
                    if (headerKey != "Cookie") {
                        go_req += "`" +headerKey + "`,\n";
                    }
                }
                go_req += "}\n"
            }
        }
        go_req += "\n"
        if (curl.includes("--data-binary")) {
            method = "POST"
            data = curl.split("--data-binary " )[1].split(" ")[0].slice(1,-1);
            var decoded="";
            if(data.includes("%40")) {
                decoded = decodeURIComponent(data)
            }else {
                decoded = data
            }
            go_req += "postData=`" + decoded + "`\n\n"
        }
        if (curl.includes("-X")) {
            method = curl.split("-X ")[1].split(" ")[0]
        }
        url = curl.split("--compressed ")[1]
        go_req += `opts := tls.Options{\nURL:`+url+`,\nMethod:"` + method + `",\n\n`
        if (headers_list.length != 0) {
            go_req += "Headers: headers,\n"
        }
        if (headerOrder && headers_list.length != 0) {
            go_req += "HeaderOrder: headerOrder,\n"
        }
        if (headers_list.length == 0) {
            go_req += "\n"
        }
        if (curl.includes("--data-binary")) {
            go_req += "\nBody: postData,\n\n"
        }
        go_req += "ClientSettings: &task.ClientSettings,\nJar:sess.cookies,\n}\n\nresp, err := tls.Do(opts)\nif err != nil {\nreturn err\n}"
        document.getElementById('outputGoReq').value = go_req
    } else {
        document.getElementById('outputGoReq').value = ""
    }
   
};
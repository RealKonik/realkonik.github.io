window.onload = function () {
    inputHeaders =document.getElementById('inputHeaders')
    inputHeaders.onkeyup = function(){
        headers = inputHeaders.value 
        if (headers != "") {
            headers_list = headers.split("\n")
            var request_headers = ""
            var pseudo_order = ""
            var header_order = ""
            var cookie_str = ""
            cookie_set = false
            headers_list.forEach(header => {
                header_name = header.split("	")[0]
                header_value = header.split("	")[1]
                if (header_name != "") {
                    if ("cookie" == header_name){
                        if (!cookie_set){
                            request_headers += '"'+header_name+'": cookiePlaceHolder,\n'
                            header_order += '"'+header_name+'",\n'
                            cookie_set = true
                        }
                        cookie_str += header_value + "; "
                        return
                    }
                    if (!header_name.includes(":")){
                        request_headers += '"'+header_name+'": {`'+header_value+'`},\n'
                        header_order += '"'+header_name+'",\n'
                    }
                    else{
                        pseudo_order += '"'+header_name+'",\n'
                    }
                }
                
            });
            header_full = request_headers + "http.HeaderOrderKey: {\n" + header_order + "},\n"
            if (pseudo_order.length > 0) {
                header_full = header_full+ "http.PHeaderOrderKey: {\n" + pseudo_order + "},"
    
            }
            header_full = header_full.replace("cookiePlaceHolder",'{"'+cookie_str.slice(0,-2)+'"}')
            document.getElementById('outputHeaders').value = header_full
           
        } else {
            document.getElementById('outputHeaders').value = ""
        }
       
    };
};


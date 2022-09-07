window.onload = function () {
    inputHeaders =document.getElementById('inputHeaders')
    inputHeaders.onkeyup = function(){
        headers = inputHeaders.value 
        if (headers != "") {
            headers_list = headers.split("\n")
            var request_headers = ""
            var header_order = ""
            cookie_set = false
            headers_list.forEach(header => {
                header_name = header.split("	")[0]
                header_value = header.split("	")[1]
                if (header_name != "") {
                    if (!header_name.includes(":")){
                        request_headers += '"'+header_name+'": `'+header_value+'`,\n'
                        header_order += '"'+header_name+'",\n'
                    }
                }
                
            });
            header_full ="HEADERS\n" + request_headers + "\n\n\nHEADER ORDER: \n" + header_order
            document.getElementById('outputHeaders').value = header_full
           
        } else {
            document.getElementById('outputHeaders').value = ""
        }
       
    };
};


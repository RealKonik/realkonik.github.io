window.onload = function () {
    inputFormData =document.getElementById('inputFormData')
    inputFormData.onkeyup = function(){
       var formData = inputFormData.value;
       if (formData != "") {
        var formDataGo = ""
        var formDataList = formData.split("\n")
        formDataList.forEach(data => {
            var dataSplit
            if (data.includes(": ")) {
                dataSplit = data.split(": ")
            } else if (data.includes("  ")) {
                dataSplit = data.split("    ")
            }           
            key = dataSplit[0]
            value = dataSplit[1]
            formDataGo += '`' + key + '`: {`' + value + '`},\n'
        
        })

        console.log(formDataGo)
        formDataGo = formDataGo.slice(0,-1)
        document.getElementById('outputFormData').value = formDataGo
       } else{
        document.getElementById('outputFormData').value = ""
       }
    };
};

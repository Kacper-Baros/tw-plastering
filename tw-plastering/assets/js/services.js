mainApp.service('myService', function() {

    this.func1 = function(x) {
        alert(x+"func1");
    }
    this.func2 = function(x) {
        alert(x+"func2");
    }



    this.loadEmployees = function(url) {
        var return_data;
        $.ajax({
            type: 'POST',
            url: url,
            success: function(data, textStatus, jqXHR) {
                return data;
            }
        })

    }

})

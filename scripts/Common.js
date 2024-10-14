var RequestAjax = {
    create: function (url, id, successCallback, type, dataType, processData) {
        var data = '';
        var flag = true;
        processData = processData ? processData : false;
        dataType = dataType ? dataType : false;
        type = type ? type : 'post';

        if (id == '') {
            data = {};
        } else if (typeof id == 'object') {
            if (id.constructor.name == 'Object') flag = false;
            data = id;
        } else {
            data = new FormData($(id)[0]);
        }
        var ajaxObj = {
            url: url,
            type: type,
            cache: false,
            data: data,
            processData: processData,
            contentType: dataType,
            dataType: "json",
            beforeSend: function () {

            },
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: function (msg) {
                successCallback(msg);
            }
        };
        if (!flag) {
            delete ajaxObj.processData
            delete ajaxObj.contentType
        }
        $.ajax(ajaxObj);
    },

    error: function (msg) {
        layer.msg(msg, {icon: 2});
    },
    success: function (msg) {
        layer.msg(msg, {icon: 1});
    },
}

var listChanger = function () {

    $('#user-list-form').on('submit', function (e) {
        e.preventDefault();
        
        var user_list = [];
        $('.row').each(function (index) {
            user_list.push({
                name: $(this).find('input[name=name]').val(),
                mail: $(this).find('input[name=mail]').val(),
            });
        });

        console.log(user_list);

        $.ajax({
            type: "POST",
            url: "/add_user_list",
            data: { user_list : user_list },
            success: function(msg){
                //alert( "Data Saved: " + msg );
            }
        });
    });

}();

var mailPost = function () {
    $('#mail-post-form').on('submit', function (e) {
        var self = this;
        e.preventDefault(); 

        var progressScreen = $('#progress-screen');
            progressScreen.show();
            progressScreen.animate({ height: "100%"}, 500);

        $.ajax({
            type: "POST",
            url: "/send",
            data: { 
                'mail-title' : $(this).find('input[name=mail-title]').val(),
                'mail-body'  : $(this).find('input[name=mail-body]').val(),
            },
            success: function(msg){
                if (msg.send) { 
                    $(progressScreen.find('p')).text('送信しました');
                    setTimeout(function () {
                        location.href = '/create';
                    }, 2000);
                }
            }
        });
    });
}();

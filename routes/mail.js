var nodemailer = require('nodemailer');
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "exdevdev@gmail.com",
        pass: "devperopero"
    }
}); 

var my = {
    name: 'myself', 
    mail: 'experopero@gmail.com'
}
var user_list = [
    { name: 'nameaa', mail: 'experopero@gmail.com' },
    { name: 'nameaa', mail: 'exdevdev@gmail.com' }
];


exports.show_user_list = function (req, res) {
    res.send('user_list', { user_list : user_list });
};

exports.add_user_list = function (req, res) {
    user_list = function () {
        var get_list  = req.body.user_list;
        var save_list = [];
        
        console.log(get_list);
        for (var i=0; i<get_list.length; i++) {
            console.log(get_list);
            if (get_list[i].name.length && get_list[i].mail.length) {
                save_list.push(get_list[i]);
            }
        };

        return save_list;
    }();

    res.send('added');
};

exports.create = function (req, res) {
    res.render('create', { user_list : user_list });
};

exports.send = function (req, res) {
    console.log('send');
    console.log(req.body);

    var mailOptions = {
        from: my.mail,
        to: my.mail,
        cc: function () { 
            var cc;
            for (var i=0; i<user_list.length; i++) { 
                cc += user_list[i].mail + ',';
            }
            return cc;
        }(),
        subject: req.body['mail-title'],
        text: req.body['mail-body']
    };

    smtpTransport.sendMail(mailOptions, function(error, response){
        if (error) return res.send('error' + error);

        console.log("Message sent: " + response.message);
        smtpTransport.close();

        res.send({send: true});
    });

};

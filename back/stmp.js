import nodemailer from "nodemailer"
import smtpTransporter from "nodemailer-smtp-transport"

let smtpTransport;

let connect_smtp = () => {
    smtpTransport = nodemailer.createTransport(smtpTransporter({
        service: 'Gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: 'studyproauth@gmail.com',
            pass: 'studypro123'
        }
    }))
}

let send_mail =(receiver,title, content) =>{

    let mailOpt = {
        from: 'studyproauth@gmail.com',
        to: receiver,
        subject: title,
        html: content
    };

    smtpTransport.sendMail(mailOpt, function (err, res) {
        if (err) {
            console.log(err);
        } else {
            console.log('email has been sent.');
        }
        smtpTransport.close();
    });
}



export const auth_mail = (req,res) => {
    connect_smtp();
    // var url = 'http://' + req.get('host')+'/confirmEmail'+'?key='+key_for_verify;
    
    console.log(user_email);

    let receiver = req.body.user_email;
<<<<<<< HEAD
    let title = 'Studypro °¡ÀÔ ÀÌ¸ŞÀÏ ÀÎÁõ'
    let content = '<h1>ÀÌ¸ŞÀÏ ÀÎÁõÀ» À§ÇØ ´ÙÀ½ ÄÚµå¸¦ ÀÔ·ÂÇØÁÖ¼¼¿ä.</h1>'
    content += '<span>1234<span>'
    
    //Àü¼Û
    send_mail(receiver, title , content);
    res.send("¸ŞÀÏ ¹ß¼Û ¿Ï·á")
=======
    let title = 'Studypro ê°€ì… ì´ë©”ì¼ ì¸ì¦'
    let content = '<h1>ì´ë©”ì¼ ì¸ì¦ì„ ìœ„í•´ ë‹¤ìŒ ì½”ë“œë¥¼ ì…ë ¥í•´ì£¼ì„¸ìš”.</h1>'
    content += '<span>1234<span>'
    
    //ì „ì†¡
    send_mail(receiver, title , content);
    res.send("ë©”ì¼ ë°œì†¡ ì™„ë£Œ")
>>>>>>> aa0f174cb309f29fa95fcc4c6b9367f5e5959c46
}

export const notice_apply = (req,res) => {
    connect_smtp();
    // var url = 'http://' + req.get('host')+'/confirmEmail'+'?key='+key_for_verify;
    const {user_email, study_name, study_id}  = req.body;
    console.log(user_email);
    
<<<<<<< HEAD
    let title = '½ºÅÍµğ °¡ÀÔ½ÅÃ» ¾Ë¸²'
    let content = '<h1>'+study_name+' ¿¡ °¡ÀÔ½ÅÃ»ÀÌ ¿Ô½À´Ï´Ù.</h1>'
    content += '<span>°¡ÀÔ ¸ñ·Ï º¸·¯°¡±â : </span><br>'
    content += 'http://localhost:8000/home'
    
    //Àü¼Û
    send_mail(user_email, title, content);
    res.send("¸ŞÀÏ ¹ß¼Û ¿Ï·á")
=======
    let title = 'ìŠ¤í„°ë”” ê°€ì…ì‹ ì²­ ì•Œë¦¼'
    let content = '<h1>'+study_name+' ì— ê°€ì…ì‹ ì²­ì´ ì™”ìŠµë‹ˆë‹¤.</h1>'
    content += '<span>ê°€ì… ëª©ë¡ ë³´ëŸ¬ê°€ê¸° : </span><br>'
    content += 'http://localhost:8000/home'
    
    //ì „ì†¡
    send_mail(user_email, title, content);
    res.send("ë©”ì¼ ë°œì†¡ ì™„ë£Œ")
>>>>>>> aa0f174cb309f29fa95fcc4c6b9367f5e5959c46
}

export const result_apply = (req,res) => {
    connect_smtp();
    
    const {user_email, study_name, study_id, result}  = req.body;
    let title, content;
    if(result){
<<<<<<< HEAD
        let title = study_name + '¿¡ °¡ÀÔ ½ÅÃ»ÀÌ ½ÂÀÎµÇ¾ú½À´Ï´Ù.'
        let content = '<h1>'+study_name+'±×·ì¿¡ °¡ÀÔ½ÅÃ»ÀÌ ¿Ô½À´Ï´Ù.</h1>'
        content += '<span>³» °¡ÀÔ ¸ñ·Ï ÀÌµ¿ : </span><br>'
        content += 'http://localhost:8000/home'
    }else{
        title = study_name + '¿¡ °¡ÀÔ ½ÅÃ»ÀÌ °ÅÀıµÇ¾ú½À´Ï´Ù.'
        content = '<h1>'+study_name+'±×·ì¿¡ °¡ÀÔ½ÅÃ»ÀÌ ¿Ô½À´Ï´Ù.</h1>'
        content += '<span>³» °¡ÀÔ ¸ñ·Ï ÀÌµ¿ : </span><br>'
        content += 'http://localhost:8000/home'
    }
    //Àü¼Û
    send_mail(user_email, title, content);
    res.send("¸ŞÀÏ ¹ß¼Û ¿Ï·á")
=======
        let title = study_name + 'ì— ê°€ì… ì‹ ì²­ì´ ìŠ¹ì¸ë˜ì—ˆìŠµë‹ˆë‹¤.'
        let content = '<h1>'+study_name+'ê·¸ë£¹ì— ê°€ì…ì‹ ì²­ì´ ì™”ìŠµë‹ˆë‹¤.</h1>'
        content += '<span>ë‚´ ê°€ì… ëª©ë¡ ì´ë™ : </span><br>'
        content += 'http://localhost:8000/home'
    }else{
        title = study_name + 'ì— ê°€ì… ì‹ ì²­ì´ ê±°ì ˆë˜ì—ˆìŠµë‹ˆë‹¤.'
        content = '<h1>'+study_name+'ê·¸ë£¹ì— ê°€ì…ì‹ ì²­ì´ ì™”ìŠµë‹ˆë‹¤.</h1>'
        content += '<span>ë‚´ ê°€ì… ëª©ë¡ ì´ë™ : </span><br>'
        content += 'http://localhost:8000/home'
    }
    //ì „ì†¡
    send_mail(user_email, title, content);
    res.send("ë©”ì¼ ë°œì†¡ ì™„ë£Œ")
>>>>>>> aa0f174cb309f29fa95fcc4c6b9367f5e5959c46
}


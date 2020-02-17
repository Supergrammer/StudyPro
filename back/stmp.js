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
    let title = 'Studypro 가입 이메일 인증'
    let content = '<h1>이메일 인증을 위해 다음 코드를 입력해주세요.</h1>'
    content += '<span>1234<span>'
    
    //전송
    send_mail(receiver, title , content);
    res.send("메일 발송 완료")
=======
    let title = 'Studypro 媛��엯 �씠硫붿씪 �씤利�'
    let content = '<h1>�씠硫붿씪 �씤利앹쓣 �쐞�빐 �떎�쓬 肄붾뱶瑜� �엯�젰�빐二쇱꽭�슂.</h1>'
    content += '<span>1234<span>'
    
    //�쟾�넚
    send_mail(receiver, title , content);
    res.send("硫붿씪 諛쒖넚 �셿猷�")
>>>>>>> aa0f174cb309f29fa95fcc4c6b9367f5e5959c46
}

export const notice_apply = (req,res) => {
    connect_smtp();
    // var url = 'http://' + req.get('host')+'/confirmEmail'+'?key='+key_for_verify;
    const {user_email, study_name, study_id}  = req.body;
    console.log(user_email);
    
<<<<<<< HEAD
    let title = '스터디 가입신청 알림'
    let content = '<h1>'+study_name+' 에 가입신청이 왔습니다.</h1>'
    content += '<span>가입 목록 보러가기 : </span><br>'
    content += 'http://localhost:8000/home'
    
    //전송
    send_mail(user_email, title, content);
    res.send("메일 발송 완료")
=======
    let title = '�뒪�꽣�뵒 媛��엯�떊泥� �븣由�'
    let content = '<h1>'+study_name+' �뿉 媛��엯�떊泥��씠 �솕�뒿�땲�떎.</h1>'
    content += '<span>媛��엯 紐⑸줉 蹂대윭媛�湲� : </span><br>'
    content += 'http://localhost:8000/home'
    
    //�쟾�넚
    send_mail(user_email, title, content);
    res.send("硫붿씪 諛쒖넚 �셿猷�")
>>>>>>> aa0f174cb309f29fa95fcc4c6b9367f5e5959c46
}

export const result_apply = (req,res) => {
    connect_smtp();
    
    const {user_email, study_name, study_id, result}  = req.body;
    let title, content;
    if(result){
<<<<<<< HEAD
        let title = study_name + '에 가입 신청이 승인되었습니다.'
        let content = '<h1>'+study_name+'그룹에 가입신청이 왔습니다.</h1>'
        content += '<span>내 가입 목록 이동 : </span><br>'
        content += 'http://localhost:8000/home'
    }else{
        title = study_name + '에 가입 신청이 거절되었습니다.'
        content = '<h1>'+study_name+'그룹에 가입신청이 왔습니다.</h1>'
        content += '<span>내 가입 목록 이동 : </span><br>'
        content += 'http://localhost:8000/home'
    }
    //전송
    send_mail(user_email, title, content);
    res.send("메일 발송 완료")
=======
        let title = study_name + '�뿉 媛��엯 �떊泥��씠 �듅�씤�릺�뿀�뒿�땲�떎.'
        let content = '<h1>'+study_name+'洹몃９�뿉 媛��엯�떊泥��씠 �솕�뒿�땲�떎.</h1>'
        content += '<span>�궡 媛��엯 紐⑸줉 �씠�룞 : </span><br>'
        content += 'http://localhost:8000/home'
    }else{
        title = study_name + '�뿉 媛��엯 �떊泥��씠 嫄곗젅�릺�뿀�뒿�땲�떎.'
        content = '<h1>'+study_name+'洹몃９�뿉 媛��엯�떊泥��씠 �솕�뒿�땲�떎.</h1>'
        content += '<span>�궡 媛��엯 紐⑸줉 �씠�룞 : </span><br>'
        content += 'http://localhost:8000/home'
    }
    //�쟾�넚
    send_mail(user_email, title, content);
    res.send("硫붿씪 諛쒖넚 �셿猷�")
>>>>>>> aa0f174cb309f29fa95fcc4c6b9367f5e5959c46
}


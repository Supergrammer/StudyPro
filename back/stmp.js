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
    let title = 'Studypro ���� �̸��� ����'
    let content = '<h1>�̸��� ������ ���� ���� �ڵ带 �Է����ּ���.</h1>'
    content += '<span>1234<span>'
    
    //����
    send_mail(receiver, title , content);
    res.send("���� �߼� �Ϸ�")
}

export const notice_apply = (req,res) => {
    connect_smtp();
    // var url = 'http://' + req.get('host')+'/confirmEmail'+'?key='+key_for_verify;
    const {user_email, study_name, study_id}  = req.body;
    console.log(user_email);
    
    let title = '���͵� ���Խ�û �˸�'
    let content = '<h1>'+study_name+' �� ���Խ�û�� �Խ��ϴ�.</h1>'
    content += '<span>���� ��� �������� : </span><br>'
    content += 'http://localhost:8000/home'
    
    //����
    send_mail(user_email, title, content);
    res.send("���� �߼� �Ϸ�")
}

export const result_apply = (req,res) => {
    connect_smtp();
    
    const {user_email, study_name, study_id, result}  = req.body;
    let title, content;
    if(result){
        let title = study_name + '�� ���� ��û�� ���εǾ����ϴ�.'
        let content = '<h1>'+study_name+'�׷쿡 ���Խ�û�� �Խ��ϴ�.</h1>'
        content += '<span>�� ���� ��� �̵� : </span><br>'
        content += 'http://localhost:8000/home'
    }else{
        title = study_name + '�� ���� ��û�� �����Ǿ����ϴ�.'
        content = '<h1>'+study_name+'�׷쿡 ���Խ�û�� �Խ��ϴ�.</h1>'
        content += '<span>�� ���� ��� �̵� : </span><br>'
        content += 'http://localhost:8000/home'
    }
    //����
    send_mail(user_email, title, content);
    res.send("���� �߼� �Ϸ�")
}


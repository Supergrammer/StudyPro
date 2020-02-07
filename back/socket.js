import app from "./app"
export const server = require('http').createServer(app)
const io = require('socket.io')(server)

// console.log(option)
let rooms = {};
export const connect = () => {
    try {
        io.sockets.on('connection', function (socket) {
            let study_id = socket.handshake.query.study_id;
            let user_id = socket.handshake.query.user_id;
            console.log("study id :", study_id, ', user id :', user_id, 'join');
            //방 찾기
            let room = rooms[study_id];
            let user_num;
            let user;
            rooms[study_id]
            //join 
            if (room) {
                //방이 존재 할때
                // if (room.member_cnt >= 6 || room.members.indexOf(user_id) != -1) {
                if (room.member_cnt >= 6) {
                    socket.emit('alreadyexist')
                    console.log('겹침')
                    return;
                }
                room.members.push(user_id);

                room.sockets.push(socket);

                room.member_cnt += 1;
                user_num = room.member_cnt;
                user = 'user ' + user_num;


            } else {

                //존재하지 않을때
                user = 'user 1'

                room = {
                    members: [user_id],
                    sockets: [socket],
                    member_cnt: 1
                }
                rooms[study_id] = room;
                user_num = 1;
            }

            socket.join(study_id);

            io.sockets.to(study_id).emit('join', {
                user: user,
                user_id: user_id,
                user_num: user_num,
                members: room.members,
                member_cnt: room.member_cnt

            });

            socket.on('disconnect', function (data) {
                // socket_id = socket.id;
                console.log(rooms, 'exit')
            });

            socket.on('exitworkspace', data => {

                const idx = rooms[study_id].members.indexOf('detail')

                const t_socket = rooms[study_id].sockets[idx]
                if (!t_socket) return
                t_socket.emit('exitworkspace', data)
            })

            socket.on('leave', function (data) {
                // let study_id = 1;
                let user_id = data.user_id;
                let socket_id = socket.id;

                let room = rooms[study_id];
                if (room.member_cnt == 1) {
                    delete rooms[study_id];
                } else {
                    room.members = room.members.filter(member => (member != user_id))
                    room.sockets = room.sockets.filter(socket => (socket.id != socket_id))

                    let user_num = room.member_cnt;
                    room.member_cnt -= 1;


                    io.sockets.to(study_id).emit('leave', {
                        user_id: user_id,
                        user_num: user_num
                    });
                }
                //이후 방과 아이디로 방을 찾아 관리

            })

            //보드
            socket.on('draw', function (data) {
                io.sockets.to(study_id).emit('line', data);
            });

            socket.on('clear', function (data) {
                io.sockets.to(study_id).emit('clear', data);
            });

            socket.on('load_image', data => {
                let study_id = data.study_id;
                if (rooms[study_id].member_cnt <= 1) return;

                let load_socket = room.sockets[0];
                load_socket.emit('load_image', socket.id);
            })

            socket.on('send_image', (data) => {
                let socket_id = data.socket_id;
                io.to(socket_id).emit('send_image', data)
            })

            //채팅
            socket.on('send message', function (data) {
                io.sockets.to(study_id).emit('receive message', data);
            });
            //화상채팅
            socket.on('message', data => {
                let t_socket;
                const idx = rooms[study_id].members.indexOf(data.to)

                t_socket = rooms[study_id].sockets[idx]
                // console.log(rooms[study_id].sockets)
                if (!t_socket) return
                t_socket.emit('message', data)
            })

            //노트패드


            socket.on('typing', data => {
                let study_id = data.study_id;
                socket.broadcast.to(study_id).emit('typing', data);
            })

            socket.on('load_pad', data => {
                let study_id = data.study_id;
                if (rooms[study_id].member_cnt <= 1) return;

                let load_socket = room.sockets[0];
                load_socket.emit('load_pad', socket.id);
            })

            socket.on('send_pad', (data) => {
                console.log("서버 받았어..", data);
                let socket_id = data.socket_id;
                io.to(socket_id).emit('send_pad', data)
            })



            //화면공유
            socket.on('viewsharestart', data => {

                io.sockets.to(study_id).emit('viewsharestart', data.user_id)
            })
            socket.on('viewsharejoin', data => {
                socket.to(study_id).emit('viewsharejoin', data.user_id)
            })
            socket.on('viewshare', data => {
                let t_socket;
                const idx = rooms[study_id].members.indexOf(data.to)

                t_socket = rooms[study_id].sockets[idx]
                if (!t_socket) return
                t_socket.emit('viewshare', data)

            })
        });
    } catch (error) {
    }
}

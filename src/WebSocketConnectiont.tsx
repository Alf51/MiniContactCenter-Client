import React, { useEffect } from 'react';
import {Client, IMessage, Stomp} from '@stomp/stompjs';

interface MyMessage {
    from: string,
    text: string
}

const WebSocketComponent: React.FC = () => {
    const message: MyMessage = {
        from: "Фронтенд",
        text: "Привет из Фронта"
    }

    useEffect(() => {
        const client = new Client({
            brokerURL: "ws://localhost:8080/ws",
            onConnect: frame => {
                client.subscribe("/topic/message", (callbackMessage) => {
                    if (callbackMessage) {
                        console.log(callbackMessage.body)
                    } else {
                        console.log("Ответ от сервера не получен")
                    }
                })
                client.publish( {destination: "/app/message", body: JSON.stringify(message)});
            }

        })

        client.activate()

        return () => {
            client.deactivate();
        };
    }, []);

    return <div>Проверьте консоль для деталей соединения.</div>;
};

export default WebSocketComponent;


// const WebSocketComponent: React.FC = () => {
//     useEffect(() => {
//         // Создаем нового клиента STOMP
//         const client = new Client({
//             brokerURL: 'ws://localhost:8080/ws', // Указываю URL моего вебсокет-сервера
//             reconnectDelay: 5000,
//             heartbeatIncoming: 4000,
//             heartbeatOutgoing: 4000,
//         });
//
//         const callback = function (message: IMessage) {
//             // called when the client receives a STOMP message from the server
//             if (message.body) {
//                 console.log('got message with body ' + message.body);
//             } else {
//                 console.log('got empty message');
//             }
//         };
//
//         const message = {
//             from: "фронт",
//             text: "Привет из фронтенда"
//         }
//
//         client.onConnect = function (frame) {
//             // Подписываюсь на нужный канал или отправляю сообщение
//             client.subscribe('/topic/message', callback)
//             client.publish({ destination: '/app/message', body: JSON.stringify(message)});
//         };
//
//         client.onStompError = function (frame) {
//             console.error('Broker reported error: ' + frame.headers['message']);
//             console.error('Additional details: ' + frame.body);
//         };
//
//
//         client.activate();
//
//         return () => {
//             client.deactivate();
//         };
//     }, []);
//
//     return <div>Проверьте консоль для деталей соединения.</div>;
// };
//
// export default WebSocketComponent;
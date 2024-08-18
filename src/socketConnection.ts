import {useEffect, useRef, useState} from "react";
import {Client} from "@stomp/stompjs";
import MessageStore from "./store/messageStore";

//todo to убрать и сделать опциональным
export interface MyMessage {
    from: string,
    text: string,
    to: string
}

export interface LoginsMessage {
    logins: Set<string>
}

export function useConnect() {
    const clientRef = useRef(new Client())
    const [isConnection, setConnection] = useState(false)
    const {addMessage, setLogins} = MessageStore

    const connectWS = (login: string) => {
        const client = new Client({
                brokerURL: "ws://localhost:8080/ws",
                onConnect: frame => {
                    setConnection(true)
                    console.log("Соединение успешно")

                    //Отправил логин, который онлайн
                    client.publish({destination: '/app/registerLogin', body: login})

                    client.subscribe("/topic/message", message => {
                        if (message) {
                            const answer = JSON.parse(message.body) as MyMessage
                            addMessage(answer)
                        }
                    })
                    client.subscribe(`/topic/message/private-${login}`, message => {
                        if (message) {
                            console.log('получили приват сообщение')
                            const answer = JSON.parse(message.body) as MyMessage
                            addMessage(answer)
                        }
                    })
                    client.subscribe(`/topic/logins`, message => {
                        if (message) {
                            const logins = new Set<string>(JSON.parse(message.body))
                            logins.delete(login)
                            setLogins(logins)
                        }
                    })
                },
                onWebSocketError: event => {
                    console.log('Веб-сокет соединение не установленно', event)
                    setConnection(false)
                    client.deactivate()
                }
            }
        )

        clientRef.current = client
        clientRef.current.activate()
    }

    const sendMessage = (message: MyMessage): boolean => {
        if (isConnection && clientRef.current && clientRef.current.connected) {
            clientRef.current.publish({destination: '/app/message', body: JSON.stringify(message)})
            return true
        } else {
            setConnection(false)
            clientRef.current.deactivate()
            alert('Ошибка соединения')
            return false
        }
    }

    //todo похоже на sendMessage

    const sendPrivateMessage = (message: MyMessage): boolean => {
        if (isConnection && clientRef.current && clientRef.current.connected) {
            clientRef.current.publish({destination: '/app/message/private', body: JSON.stringify(message)})
            return true
        } else {
            setConnection(false)
            clientRef.current.deactivate()
            alert('Ошибка соединения')
            return false
        }
    }

    const disconnect = () => {
        if (clientRef.current && isConnection) {
            clientRef.current.deactivate()
                .then(() => {
                    setConnection(false)
                    console.log('Соединение разорванно')
                })
                .catch((e) => console.log('Ошибка при попытке разорвать соединение ', e))
        } else {
            console.log('Соединение не установленно')
        }
    }

    return {connectWS, sendMessage, disconnect, isConnection, sendPrivateMessage}
}

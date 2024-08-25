import {useRef, useState} from "react";
import {Client} from "@stomp/stompjs";
import MessageStore from "./store/messageStore";
import {ObservableSet} from "mobx";

//todo to убрать и сделать опциональным
//todo Переименовать в целом
export interface MyMessage {
    from: string
    text: string
    to: string
}

export function useConnect() {
    const clientRef = useRef(new Client())
    const [isConnection, setConnection] = useState(false)
    const {addMessage, deleteLogin, addLogin, setLogins} = MessageStore

    const connectWS = (login: string) => {
        const client = new Client({
                brokerURL: "ws://localhost:8080/ws",
                connectHeaders: {
                    login: login
                },
                onConnect: frame => {
                    setConnection(true)
                    console.log("Соединение успешно")
                    // setLogin(login)

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

                    client.subscribe(`/topic/loginDisconnect`, message => {
                        if (message) {
                            const login = message.body
                            deleteLogin(login)
                        }
                    })

                    client.subscribe(`/topic/loginConnected`, message => {
                        if (message) {
                            const login = message.body
                            addLogin(login)
                        }
                    })

                    //todo переименовать в  user-online (или по аналогии).
                    client.subscribe(`/topic/onlineLogins/${login}`, message => {
                        if (message) {
                            const logins = new ObservableSet<string>(JSON.parse(message.body))
                            setLogins(logins)
                        }
                    })

                    client.publish({destination: '/app/requestOnlineLogins'})
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

    //todo похоже на sendMessage. Можно объединить ?

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
                    console.log('Соединение разорвано')
                })
                .catch((e) => console.log('Ошибка при попытке разорвать соединение ', e))
        } else {
            console.log('Соединение не установленно')
        }
    }

    return {connectWS, sendMessage, disconnect, isConnection, sendPrivateMessage}
}

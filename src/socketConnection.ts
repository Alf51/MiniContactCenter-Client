import {useRef, useState} from "react";
import {Client} from "@stomp/stompjs";

export interface MyMessage {
    from: string,
    text: string
}

export function useConnect() {
    const clientRef = useRef(new Client())
    const [isConnection, setConnection] = useState(false)

    const connectWS = () => {
        const client = new Client({
                brokerURL: "ws://localhost:8080/ws",
                onConnect: frame => {
                    client.subscribe("/topic/message", message => {
                        if (message) {
                            console.log("Ответ от сервера: ", message.body)
                        } else {
                            console.log("Нет ответа от сервера")
                        }
                    })
                }
            }
        )

        clientRef.current = client
        clientRef.current.activate()
        setConnection(true)
        console.log("Соединение успешно")
    }

    const sendMessage = (message: MyMessage) => {
        if (isConnection && clientRef.current) {
            clientRef.current.publish({destination: '/app/message', body: JSON.stringify(message)})
        } else {
            console.log('Соединение не установленно')
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

    return {connectWS, sendMessage, disconnect, isConnection}
}
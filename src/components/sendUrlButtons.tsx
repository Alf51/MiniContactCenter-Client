import React, {ChangeEvent, useEffect, useState} from "react";
import {MyMessage, useWebSocketConnection} from '../webSocketConnectiont'
import {useConnect} from "../socketConnection";
import {text} from "node:stream/consumers";

export function SendUrlButtons(obj: { buttonName: string }) {
    const {sendMessage, connectWS, disconnect} = useConnect()
    const [inputText, setInputText] = useState<string>('')
    const [message, setMessage] = useState<MyMessage>({from: '', text: "hay from React"})

    useEffect(() => {
        setMessage({
            from: "",
            text: inputText
        })
    }, [inputText])

    const handleText = (event: ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value)
    }

    return (
        <div>
            <button onClick={() => connectWS()}>{obj.buttonName}</button>
            <button onClick={() => sendMessage(message)}>Отправить сообщение</button>
            <button onClick={() => disconnect()}>Отсоединиться от сервера</button>
            <input type={'text'} onChange={handleText}></input>
        </div>
    );
}



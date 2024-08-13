import {MyMessage} from "../socketConnection";

export function SimpleForm() {

    return (
        <form>
            <textarea readOnly={true} cols={45} rows={5} value={getFakeDate()}>
            </textarea>
        </form>
    )
}

function getFakeDate(): string {
    let arrayMessage: MyMessage[] = [{from: '', text: ''}];
    const test1: MyMessage = {from: 'front', text: "Helllo Server"}
    const test2: MyMessage = {from: 'server', text: "Helllo Front"}
    arrayMessage.push(test1)
    arrayMessage.push(test2)
    let simpleString = ''

    arrayMessage.forEach(element => simpleString = simpleString.concat(element.text + '\n'))
    return simpleString = simpleString.trim()
}

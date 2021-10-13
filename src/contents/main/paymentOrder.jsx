import { useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";

import settings from "../../settings";

const PaymentOrder = (props) => {
    useEffect(() => {
        const body = document.getElementsByTagName("body")[0];
        const setupScriptElm = document.createElement('script');
        setupScriptElm.type = 'text/javascript';
        setupScriptElm.appendChild(setupScript);
        body.appendChild(setupScriptElm);
    }, []);


    return (<>
        <label htmlFor="cardNumber">カード番号入力</label>
        <div id="cardNumber"></div>
        <div id="cardExpiry"></div>
        <div id="cardCvc"></div>
    </>);
}

const createOrder = (orderId, email, id) => {
    return {type: EXIT, message:"申し訳ございません。現在、在庫切れです。恐れ入りますが、次回の入荷をお待ちください。"};
}

export default PaymentOrder;


// constants
const EXIT = 0;
const PAUSE = 1;

const setupScript = document.createTextNode("var payjp = Payjp('"+ settings.payjpPubKey +"');"+
    "var elements = payjp.elements();"+
    "var cardNumberElm = elements.create('cardNumber');"+
    "var cardExpiryElm = elements.create('cardExpiry');"+
    "var cardCvcElm = elements.create('cardCvc');"+
    "cardNumberElm.mount('#cardNumber');"+
    "cardExpiryElm.mount('#cardExpiry');"+
    "cardCvcElm.mount('#cardCvc');"
);

const submitScript = document.createTextNode(
    "payjp.createToken(cardNumber).then((r)=> {"+
    "if (r.error){showErrorMessage(r.error.message);}"+
    "else {paymentStep();}"+
    "});"
);

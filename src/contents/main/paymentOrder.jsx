import { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";

const PaymentOrder = (props) => {
    const setupScript = createTextNode("const payjp = Payjp('"++"');"+
        "const elements = payjp.elements();"+
        "const cardNumberElm = elements.create('cardNumber');"+
        "const cardExpiryElm = elements.create('cardExpiry');"+
        "const cardCvcElm = elements.create('cardCvc');"+
        "cardNumber.mount('#cardNumber');"+
        "cardExpiry.mount('#cardExpiry');"+
        "cardCvc.mount('#cardCvc');"
    );

    const submitScript = createTextNode(
        "payjp.createToken(cardNumber, {card: {name: '"++"'}}).then((r)=> {"+
        "if (r.error){showErrorMessage(r.error.message);}"+
        "else {paymentStep();}"+
        "});"
    );
}

const createOrder = (orderId, email, id) => {
    return {type: EXIT, message:"申し訳ございません。現在、在庫切れです。恐れ入りますが、次回の入荷をお待ちください。"};
}
}

import { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import axios from "axios";

import ModalDialog from "./ModalDialog";
import settings from "../../settings";
import constants from "../../constants";

const PaymentOrder = (props) => {
    const [modal, setModal] = useState({
        show: false,
        message: "",
        onClick: null
    });

    useEffect(() => {
        const body = document.getElementsByTagName("body")[0];
        const setupScriptElm = document.createElement('script');
        setupScriptElm.type = 'text/javascript';
        setupScriptElm.appendChild(setupScript);
        body.appendChild(setupScriptElm);
        window.setModal = setModal;
        window.modalClose = () => {
            setModal({
                show: false,
                message: "",
                onClose: null
            });
        }
        window.paied = (cardToken)=> {
            createOrder(cardToken, props, setModal);
        }
    }, []);


    return (<>
        <Row className="bg-primary text-white mb-4">
            <h2>支払い情報入力</h2>
        </Row>
        <Row className="p2 mb-2">
            <p>以下に必要事項を入力し、確定ボタンを選択してください。</p>
        </Row>
        <Row className="p2">
            <Col xs="12" md="3" className="mt-2">
                <p className="mb-0"><label htmlFor="cardNumber">カード番号</label></p>
            </Col>
            <Col xs="12" md="9" className="p-2 bg-info">
                <div id="cardNumber"></div>
            </Col>
            <Col xs="12" md="3" className="mt-2">
                <p className="mb-0"><label htmlFor="cardExpiry">有効期限</label></p>
            </Col>
            <Col xs="12" md="9" className="p-2 bg-info">
                <div id="cardExpiry"></div>
            </Col>
            <Col xs="12" md="3" className="mt-2">
                <p className="mb-0"><label htmlFor="cardCvc">セキュリティコード (CVC)</label></p>
            </Col>
            <Col xs="12" md="9" className="p-2 bg-info">
                <div id="cardCvc"></div>
            </Col>
        </Row>
        <Row className="p-2 mt-2 bg-success">
            <Col xs="12" md="8">
                <p class="text-white">支払い確定後、変更や払い戻しはできません。</p>
            </Col>
            <Col xs="6" md="2" className="text-end">
                <Button onClick={()=>{props.setOrderStep(constants.ORDER_STEP_NONE)}} variant="light">中止</Button>
            </Col>
            <Col xs="6" md="2" className="text-end">
                <Button onClick={()=>{window.handleSubmit()}} variant="light">次へ</Button>
            </Col>
        </Row>

        <ModalDialog {...modal} />
    </>);
}

const createOrder = (cardToken, props, setModal) => {
    console.log(props.orderFormData);
    axios.post(settings.apiUrl + "pay", {
        orderId: props.orderFormData.orderId,
        email: props.orderFormData.email,
        cardToken: cardToken
    }).then((v) => {
        setModal({
            show: true,
            message: reason2Message(v.data.reason),
            onClose: () => {window.modalClose();}
        });
    }).catch((e) => {
        setModal({
            show: true,
            message: "ダメでした。",
            onClose: () => {window.modalClose();}
        });
    });
}

const reason2Message = (reason) => {
    if (reason === "invalid request") {
        return "不明なエラーが発生しました。お手数ですが、時間をおいて、再度お試しください。";
    } else if (reason === "invalid cardToken") {
        return "エラーが発生しました。お手数ですが、時間をおいて、再度お試しください。";
    } else if (reason === "invalid orderId") {
        return "エラーが発生しました。お手数ですが、時間をおいて、再度お試しください。";
    } else if (reason === "invalid email") {
        return "エラーが発生しました。お手数ですが、時間をおいて、再度お試しください。";
    } else if (reason === "order not found") {
        return "エラーが発生しました。お手数ですが、時間をおいて、最初からやりなおしてください。";
    } else if (reason === "no stock") {
        return "申し訳ありません。現在在庫切れです。次回入荷をお待ちください。";
    } else if (reason === "card error") {
        return "カード決済に失敗しました。入力内容をご確認いただくか、別のカードをご利用ください。";
    } else if (reason === "network error") {
        return "現在、通信障害が発生しております。お手数ですが、時間をおいて、再度お試しください。";
    } else {
        return reason;
    }
}

export default PaymentOrder;


// constants
const setupScript = document.createTextNode("var payjp = Payjp('"+ settings.payjpPubKey +"');"+
    "var elements = payjp.elements();"+
    "var cardNumberElm = elements.create('cardNumber');"+
    "var cardExpiryElm = elements.create('cardExpiry');"+
    "var cardCvcElm = elements.create('cardCvc');"+
    "cardNumberElm.mount('#cardNumber');"+
    "cardExpiryElm.mount('#cardExpiry');"+
    "cardCvcElm.mount('#cardCvc');"+
    "var handleSubmit = () => {"+
    "setModal({"+
    "show: true, message: 'カード決済中...', onClose: null"+
    "});"+
    "payjp.createToken(cardNumberElm).then((r)=> {"+
    "if (r.error){setModal({"+
    "show: true, message: r.error.message, onClose: modalClose"+
    "});}"+
    "else {paied(r.id);}"+
    "});"+
    "}"
);

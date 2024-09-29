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
    const [cardHolderName, setCardHolderName] = useState("");

    useEffect(() => {
        const body = document.getElementsByTagName("body")[0];
        const setupScriptElm = document.createElement('script');
        setupScriptElm.type = 'text/javascript';
        setupScriptElm.appendChild(createSetupScript(props.payjpPubKey));
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

    const hSubmit = (e) => {
        // 標準インプットチェック
        if (cardHolderName === "") {
            setModal({
                show: true,
                message: "カード名義人を入力してください。",
                onClose: () => {
                    window.modalClose();
                }
            });
            return;
        }
        window.handleSubmit();
    }
    
    const hCardHolderName = (e) => {
        const val = e.target.value.replace(/[^a-zA-Z0-9. -]/g, "");
        // 45文字以内
        if (e.target.value.length > 45) {
            return;
        }
        setCardHolderName(val);
    }

    return (<>
        <Row className="bg-primary text-white mb-4">
            <h2>支払い情報入力</h2>
        </Row>
        <Row className="p2 mb-2">
            <p>以下に必要事項を入力し、確定ボタンを押してください。</p>
        </Row>
        <Row className="p2">
            <Col xs="12" md="3" className="mt-2">
                <p className="mb-0"><label htmlFor="cardNumber">カード番号</label></p>
            </Col>
            <Col xs="12" md="9" className="p-2">
                <div id="cardNumber" className="border border-dark"></div>
                <p>カード番号は、16桁です。（例）0000111122223333</p>
            </Col>
            <Col xs="12" md="3" className="mt-2">
                <p className="mb-0"><label htmlFor="cardHolderName">カード名義人</label></p>
            </Col>
            <Col xs="12" md="9" className="p-2">
                <div>
                    <input placeholder="カード名義人（ローマ字）" autoComplete="cc_name" id="cardHolderName" value={cardHolderName} onChange={hCardHolderName} className="border border-dark w-100"/>
                </div>
                <p>カードに表示されているローマ字氏名を入力します。（例）EIICHI SHIBUSAWA</p>
            </Col>
            <Col xs="12" md="3" className="mt-2">
                <p className="mb-0"><label htmlFor="cardExpiry">有効期限</label></p>
            </Col>
            <Col xs="12" md="9" className="p-2">
                <div id="cardExpiry" className="border border-dark"></div>
                <p>有効期限は、月2桁、年2桁の順で入力します。（例）0322</p>
            </Col>
            <Col xs="12" md="3" className="mt-2">
                <p className="mb-0"><label htmlFor="cardCvc">セキュリティコード (CVC)</label></p>
            </Col>
            <Col xs="12" md="9" className="p-2">
                <div id="cardCvc" className="border border-dark"></div>
                <p>セキュリティコード（CVC）は、カード裏面の署名欄右上に記載の3桁の数字です。カードにより、記載位置が異なる場合や、4桁の場合があります。（例）555</p>
            </Col>
        </Row>
        <Row className="p-2 mt-2 bg-success">
            <Col xs="12" md="8">
                <p className="text-white">支払い確定後、変更や払い戻しはできません。</p>
                <p className="mb-1"><a className="text-white" href="https://actlab.org/disclose/policy" target="_blank" rel="noopener noreferrer">
                    次へ進む前に必ずここをクリックし、新規タブでプライバシーポリシーをご一読ください。
                </a></p>
                <p className="text-white mt-1">ご注文を続けることにより、当ラボのプライバシーポリシーとその他の諸条件をすべて理解し、同意したことになります。</p>
            </Col>
            <Col xs="6" md="2" className="text-end mt-auto">
                <Button onClick={()=>{window.location.href = "https://actlab.org/"}} variant="light">中止</Button>
            </Col>
            <Col xs="6" md="2" className="text-end mt-auto">
                <Button onClick={hSubmit} variant="light">次へ</Button>
            </Col>
        </Row>

        <ModalDialog {...modal} />
    </>);
}

const createOrder = (cardToken, props, setModal) => {
    //console.log(props.orderFormData);
    axios.post(settings.apiUrl + "pay", {
        orderId: props.orderFormData.orderId,
        email: props.orderFormData.email,
        cardToken: cardToken
    }).then((v) => {
        if ((typeof v.data) != "object") {
            console.log(v);
            return;
            //return window.location = "/error";
        }
        if (v.data.code === 200 && v.data.type === "finished") {
            props.setSerialnumbers(v.data.serialnumbers);
            props.setOrderStep(constants.ORDER_STEP_FINISH);
        } else if (v.data.code === 200 && v.data.type === "challenge") {
            let paymentId = v.data.paymentId;
            window.handleThreeDChallenge(paymentId).then((v) => {
                createOrder(cardToken, props, setModal);
            });
        } else{
            setModal({
                show: true,
                message: reason2Message(v.data.reason),
                onClose: () => {window.modalClose();}
            });
        }
    }).catch((e) => {
        setModal({
            show: true,
            message: "不明なエラーが発生しました。恐れ入りますが、時間をおいて、再度お試しください。",
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
    } else if (reason === "cvc error") {
        return "カード決済に失敗しました。入力内容をご確認いただくか、別のカードをご利用ください。";
    } else if (reason === "card error") {
        return "カード決済に失敗しました。別のカードをご利用いただくか、発行元のカード会社にお問い合わせください。";
    } else if (reason === "network error") {
        return "現在、通信障害が発生しております。お手数ですが、時間をおいて、再度お試しください。";
    } else {
        return "エラーが発生しました。恐れ入りますが、時間をおいて、再度お試しください。";
    }
}

export default PaymentOrder;


// constants
const createSetupScript = (payjpPubKey) => {
    return document.createTextNode("var payjp = Payjp('"+ payjpPubKey +"');"+
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
        "let ccName = document.getElementById('cardHolderName').value;"+
        "payjp.createToken(cardNumberElm, {card: {name: ccName}}).then((r)=> {"+
        "if (r.error){setModal({"+
        "show: true, message: r.error.message, onClose: modalClose"+
        "});}"+
        "else {paied(r.id);}"+
        "});"+
        "};"+
        "var handleThreeDChallenge = (paymentId) => {"+
        "return payjp.openThreeDSecureDialog(paymentId);"+
        "}"
    );
}

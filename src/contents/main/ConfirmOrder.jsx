import { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import axios from "axios";

import settings from "../../settings";
import constants from "../../constants";


const ConfirmOrder = (props) => {
    
    const [formData, setFormData] = useState({
        confirmationCode: ""
    });
    const [message, setMessage] = useState("");
    const [ successButton, setSuccessButton ] = useState(false);
    const handleChange = (e) => {
        let k = e.target.name;
        setFormData(s => ({...s, [k]: e.target.value}));
        if (e.target.value.match(/^[0-9]{6}$/g) === null) {
            setMessage("認証コードの形式が誤っています。");
            setSuccessButton(false);
        } else {
            setMessage("注文を確定し、支払いに進みます。");
            setSuccessButton(true);
        }
    }
    const handleSubmit = () => {
        let data = {...props.orderFormData, ...formData};
        sendOrder(data, setMessage, props.setOrderFormData, props.setOrderStep);
    }

    let totalPrice = props.productInformation.price * props.orderFormData.quantity;
    if (props.orderFormData.paymentType === "transfer") {
        totalPrice = totalPrice + constants.TRANSFER_FEE;
    }

    return (<>
        <Row className="bg-primary text-white mb-4">
            <h2>注文内容確認</h2>
        </Row>
        <Row className="p2 mb-2">
            <p>以下の内容で注文を行います。よろしければ、お送りしたメール本文中の認証コードを入力し、確定ボタンを選択してください。</p>
        </Row>
        <Row className="p2">
            <Col xs="12" md="3">
                <p><label>製品名</label></p>
            </Col>
            <Col xs="12" md="9" className="mb-2">
                <p>{props.productInformation.name}</p>
            </Col>
            <Col xs="12" md="3">
                <p><label>エディション</label></p>
            </Col>
            <Col xs="12" md="9" className="mb-2">
                <p>{props.productInformation.edition}</p>
            </Col>
            <Col xs="12" md="3">
                <p><label>説明</label></p>
            </Col>
            <Col xs="12" md="9"className="mb-2">
                <p>{props.productInformation.discription}</p>
            </Col>
            <Col xs="12" md="3">
                <p><label>価格</label></p>
            </Col>
            <Col xs="12" md="9" className="mb-2">
                <p>{parseInt(props.productInformation.price * (1 + constants.TAX_RATE)).toLocaleString()} 円</p>
            </Col>
            <Col xs="12" md="3">
                <p><label>お名前</label></p>
            </Col>
            <Col xs="12" md="9" className="mb-2">
                <p>{props.orderFormData.name}</p>
            </Col>
            <Col xs="12" md="3">
                <p><label>メールアドレス</label></p>
            </Col>
            <Col xs="12" md="9" className="mb-2">
                <p>{props.orderFormData.email}</p>
            </Col>
            <Col xs="6" md="3">
                <p><label>購入個数</label></p>
            </Col>
            <Col xs="12" md="9" className="mb-2">
                <p>{props.orderFormData.quantity} 個</p>
            </Col>
            <Col xs="6" md="3">
                <p><label>注文合計</label></p>
            </Col>
            <Col xs="12" md="9" className="mb-2">
                <p>{parseInt(totalPrice * (1 + constants.TAX_RATE)).toLocaleString()} 円</p>
                { (props.orderFormData.paymentType === "transfer") && (<p>（支払い事務手数料込み）</p>)}
            </Col>
            <Col xs="6" md="3">
                <p><label>支払い方法</label></p>
            </Col>
            <Col xs="12" md="9" className="mb-2">
                <p>{ constants.PAYMENT_TYPE_JAPANESE[props.orderFormData.paymentType] }</p>
            </Col>
            <Col xs="6" md="3">
                <p><label htmlFor="confirmForm_code">認証コード</label></p>
            </Col>
            <Col xs="6" md="6" className="mb-2">
                <input name="confirmationCode" onChange={handleChange} id="confirmForm_code" className="form-control" />
            </Col>
        </Row>
        <Row className="p2 mt-2">
            <Col xs="12" md="8">
                <p>{message}</p>
            </Col>
            <Col xs="6" md="2" className="text-end">
                <Button onClick={()=> {props.setOrderStep(constants.ORDER_STEP_INPUT)}} valiant="success">戻る</Button>
            </Col>
            <Col xs="6" md="2" className="text-end">
                {successButton && <Button onClick={()=>{handleSubmit()}} variant="success">次へ</Button>}
            </Col>
        </Row>
    </>);
}

const setOrder = (data) => {
    return "認証コードが誤っています。"
}

const sendOrder = (formData, setMessage, setFormData, setOrderStep) => {
    axios.post(settings.apiUrl + "order", formData).then((r) => {
        if   ((typeof r.data) != "object") {
            return window.location = "/error";
        }
        if ((r.data.code === 200) && (r.data.orderId)) {
            setFormData(s => ({...s, orderId: r.data.orderId}));
            setOrderStep(constants.ORDER_STEP_PAYMENT);
        } else if (r.data.reason) {
            if (r.data.reason === "confirmation faild") {
                return window.location = settings.siteUrl;
            }
            setMessage(getMessage(r.data.reason));
        }
    }, (e) => {
        window.location = "error";
    });
}

const getMessage = (reason) => {
    if (reason === "wrong confirmation code") {
        return "認証コードが誤っています。一定数以上間違えると、注文を中止し、トップページに移動します。";
    } else {
        return "不明なエラーが発生しました。時間をおいて、再度お試しください。";
    }
}

export default ConfirmOrder;

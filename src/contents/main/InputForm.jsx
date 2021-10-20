import { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";

import constants from "../../constants";


const InputForm = (props) => {
    
    const [formData, setFormData] = useState({
        name: props.orderFormData.name,
        email: props.orderFormData.email,
        quantity: props.orderFormData.quantity,
        paymentType: props.orderFormData.paymentType
    });
    const handleChange = (e) => {
        let k = e.target.name;
        setFormData(s => ({...s, [k]: e.target.value}));
    }
    const handleSubmit = () => {
        props.setOrderFormData({...formData, productId: props.productInformation.productId, quantity: parseInt(formData.quantity)});
        props.setOrderStep(constants.ORDER_STEP_CONFIRM);
    }

    let message = validateForm(formData);
    let nextButton = false;
    if (message === "") {
        message = "次の画面で、あなたのメールアドレスと注文内容を確認します。";
        nextButton = true;
    }

    let paymentTypeCombo = [];
    for (const [k,v] of Object.entries(constants.PAYMENT_TYPE_JAPANESE)) {
        paymentTypeCombo.push(<option key={k} value={k}>{v}</option>);
    }

    let quantityCombo = [];
    for(let i=1; i <= 10; i++) {
        quantityCombo.push(<option key={i} value={i}>{i}個</option>);
    }
    
    return (<>
        <Row className="bg-primary text-white mb-4">
            <h2>注文情報入力</h2>
        </Row>
        <Row className="p2 mb-2">
            <p>以下に必要事項を入力し、次へボタンを選択してください。</p>
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
                <p>{parseInt(props.productInformation.price * (1 + constants.TAX_RATE))} 円</p>
            </Col>
            <Col xs="12" md="3">
                <p><label htmlFor="orderForm-name">お名前</label></p>
            </Col>
            <Col xs="12" md="9" className="pb-2 mb-2">
                <input name="name" value={formData.name} onChange={handleChange} className="form-control" id="orderForm-name" type="text"/>
            </Col>
            <Col xs="12" md="3">
                <p><label htmlFor="orderForm-email">メールアドレス</label></p>
            </Col>
            <Col xs="12" md="9" className="pb-2 mb-2">
                <input name="email" value={formData.email} onChange={handleChange} className="form-control" id="orderForm-email" type="text"/>
            </Col>
            <Col xs="6" md="3">
                <p><label htmlFor="orderForm-quantity">購入個数</label></p>
            </Col>
            <Col xs="6" md="9" className="pb-2 mb-2">
                <Col md="3">
                    <select name="quantity" value={formData.quantity} onChange={handleChange} className="form-control">{quantityCombo}</select>
                </Col>
            </Col>
            <Col xs="6" md="3">
                <p><label htmlFor="orderForm-paymentType">支払い方法</label></p>
            </Col>
            <Col xs="6" md="9" className="pb-2 mb-2">
                <Col md="5">
                    <select name="paymentType" value={formData.paymentType} onChange={handleChange} className="form-control">{paymentTypeCombo}</select>
                </Col>
            </Col>
        </Row>
        <Row className="p2 mt-2">
            <Col xs="12" md="8">
                <p style={{whiteSpace: "pre-wrap"}}>{message}</p>
            </Col>
            <Col xs="12" md="4" className="text-end">
                {nextButton && <Button onClick={()=>{handleSubmit()}} variant="success">次へ</Button>}
            </Col>
        </Row>
    </>);
}

const validateForm = (data) => {
    let errMessages = [];
    if (data.name.length < 1) {
        errMessages.push("・お名前を、２文字以上で入力してください。");
    }
    if (!(/^.+@.+\..*[a-zA-Z]$/.test(data.email))) {
        errMessages.push("・メールアドレスが誤っています。");
    }
    if ((isNaN(data.quantity)) || (parseInt(data.quantity) <= 0) || (parseInt(data.quantity) > 10)) {
        errMessages.push("・購入個数は、１～10までで指定してください。");
    }
    
    if (errMessages.length === 0) {
        return "";
    } else if(errMessages.length === 3) {
        return "必要事項を入力してください。";
    } else{
        return errMessages.join("\n");
    }
}

export default InputForm;

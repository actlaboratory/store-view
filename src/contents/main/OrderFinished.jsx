import { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";

import constants from "../../constants";


const OrderFinished = (props) => {
    let message = "";
    let topMessage = "";
    let labelMessage = "";
    if (props.orderFormData.paymentType === "credit") {
        topMessage = "ご注文ありがとうございました。シリアル番号を発行いたしましたので、ご確認の上、大切に保管してください。";
        labelMessage = "シリアル番号一覧";
        message = "* " + props.serialnumbers.join("\n* ");
    } else if (props.orderFormData.paymentType === "transfer") {
        topMessage = "ご注文ありがとうございました。7日以内に、以下の内容にてお振込みください。お支払いが確認できましたら、シリアル番号をメールにてお送りさせていただきます。";
        labelMessage = "お支払い情報";
        message = "振込先:"
            + constants.BANK_NAME + constants.BANK_BRANCH
            + "\n" + constants.BANK_ACCOUNT + " " + constants.BANK_ACCOUNT_NO
            + "\n口座名義: " + constants.BANK_ACCOUNT_OWNER
            + "\n* 振込任命には、注文者名と注文番号を併記してください。";
    }
    let price = parseInt(props.orderFormData.quantity * props.productInformation.price * (1 + constants.TAX_RATE));
    if (props.orderFormData.paymentType === "transfer") {
        price = price + constants.TRANSFER_FEE * (1 + constants.TAX_RATE);
    }
    
    const handleSubmit = () => {
        props.setOrderStep(constants.ORDER_STEP_NONE);
    }

    return (<>
        <Row className="bg-primary text-white mb-4">
            <h2>注文完了</h2>
        </Row>
        <Row className="p2 mb-2">
            <p>{topMessage}</p>
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
            <Col xs="6" md="3">
                <p><label>個数</label></p>
            </Col>
            <Col xs="6" md="3" className="mb-2">
                <p>{props.orderFormData.quantity}</p>
            </Col>
            <Col xs="6" md="3">
                <p><label>金額</label></p>
            </Col>
            <Col xs="6" md="3" className="mb-2">
                <p>{price }円</p>
            </Col>
            <Col xs="12" md="3">
                <p><label>{labelMessage}</label></p>
            </Col>
            <Col xs="12" md="9" className="mb-2">
                <textarea value={message} />
            </Col>
        </Row>
        <Row className="p2 mt-2">
            <Col xs="12" md="8">
                <p>上記内容は、なくさないように、大切に保管してください。</p>
            </Col>
            <Col xs="12" md="4" className="text-end">
                <Button onClick={()=>{handleSubmit()}} variant="success">内容を確認し、保存しました</Button>
            </Col>
        </Row>
    </>);
}

export default OrderFinished;

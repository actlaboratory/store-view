import { useState } from "react";
import { Link } from "react-router-dom"; import "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";

import constants from "../../constants";
import settings from "../../settings";


const OrderFinished = (props) => {
    let message = "";
    let topMessage = "";
    let labelMessage = "";
    if (props.orderFormData.paymentType === "credit") {
        topMessage = "ご注文ありがとうございました。シリアル番号を発行いたしましたので、ご確認の上、大切に保管してください。シリアル番号はメールでもお送りしていますが、この画面を閉じる前にメールの到着を確認してください。";
        labelMessage = "シリアル番号一覧";
        message = "* " + props.serialnumbers.join("\n* ");
    } else if (props.orderFormData.paymentType === "transfer") {
        topMessage = "ご注文ありがとうございました。7日以内に、以下の内容にてお振込みください。振込先などについてはメールでもお送りしています。お振込みの前に、メールが受信できていることをご確認ください。お支払いが確認できましたら、5営業日以内にシリアル番号をメールにてお送りさせていただきます。";
        labelMessage = "お支払い情報";
        message = "振込先:"
            + "\n" + constants.BANK_NAME + constants.BANK_BRANCH
            + "\n" + constants.BANK_ACCOUNT + " " + constants.BANK_ACCOUNT_NO
            + "\n口座名義: " + constants.BANK_ACCOUNT_OWNER
            + "\n* 振込人名には、注文番号と、先ほどご入力されたお名前を指定してください。（例：　13 ヤマダタロウ）"
            + "\n* 上記金額を、振込手数料お客様負担にてお支払いください。";
    } else if (props.orderFormData.paymentType === "free") {
        topMessage = "ご注文ありがとうございました。クーポンにより無料でご購入いただけます。シリアル番号を発行いたしましたので、ご確認の上、大切に保管してください。シリアル番号はメールでもお送りしていますが、この画面を閉じる前にメールの到着を確認してください。";
        labelMessage = "シリアル番号一覧";

        if (props.orderResponseData && props.orderResponseData.serialnumbers) {
            message = "* " + props.orderResponseData.serialnumbers.join("\n* ");
        } else if (props.serialnumbers) {
            message = "* " + props.serialnumbers.join("\n* ");
        } else {
            message = "シリアル番号の取得に失敗しました。メールをご確認ください。";
        }
    }
    let price = props.orderFormData.quantity * props.productInformation.price;

    // 割引適用
    if (props.orderFormData.isCouponApplied) {
        price = price - props.orderFormData.discountAmount;
        if (price < 0) price = 0;
    }

    price = parseInt(price * (1 + constants.TAX_RATE));

    if (props.orderFormData.paymentType === "transfer") {
        price = price + constants.TRANSFER_FEE * (1 + constants.TAX_RATE);
    }

    price = price.toLocaleString();

    return (<>
        <Row className="bg-primary text-white mb-4">
            <h2>注文完了</h2>
        </Row>
        <Row className="p2 mb-2">
            <p role="alert">{topMessage}</p>
        </Row>
        <Row className="p2">
            <Col xs="12" md="3">
                <p><label>注文番号</label></p>
            </Col>
            <Col xs="12" md="9" className="mb-2">
                <p>{props.orderFormData.orderId}</p>
            </Col>
            <Col xs="12" md="3">
                <p><label>お名前</label></p>
            </Col>
            <Col xs="12" md="9" className="mb-2">
                <p>{props.orderFormData.name}</p>
            </Col>
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
            {props.orderFormData.isCouponApplied && (
                <>
                    <Col xs="12" md="3">
                        <p><label>適用クーポン</label></p>
                    </Col>
                    <Col xs="12" md="9" className="mb-2">
                        <p>{props.orderFormData.couponCode}</p>
                    </Col>
                    <Col xs="12" md="3">
                        <p><label>割引額</label></p>
                    </Col>
                    <Col xs="12" md="9" className="mb-2">
                        <p className="text-success">-{props.orderFormData.discountAmount.toLocaleString()} 円</p>
                    </Col>
                </>
            )}
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
                <textarea rows="10" className="form-control" style={{overflow: "scroll"}} value={message} />
            </Col>
        </Row>
        <Row className="p2 mt-2">
            <Col xs="12" md="8">
                <p>上記内容は、なくさないように、大切に保管してください。</p>
            </Col>
            <Col xs="12" md="4" className="text-end">
                <Button variant="success" onClick={() => {window.location.href = settings.siteUrl}}>内容を確認し、保存しました</Button>
            </Col>
        </Row>
    </>);
}

export default OrderFinished;

import axios from "axios";
import { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";

import settings from "../../settings";
import constants from "../../constants";


const InputForm = (props) => {
    const [formData, setFormData] = useState({
        name: props.orderFormData.name,
        email: props.orderFormData.email,
        quantity: props.orderFormData.quantity,
        paymentType: props.orderFormData.paymentType,
        couponCode: props.orderFormData.couponCode,
        discountAmount: props.orderFormData.discountAmount,
        isCouponApplied: props.orderFormData.isCouponApplied
    });
    const [couponInputValue, setCouponInputValue] = useState(
        props.orderFormData.isCouponApplied ? props.orderFormData.couponCode : ""
    );
    const [couponMessage, setCouponMessage] = useState("");
    const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
    const handleChange = (e) => {
        let k = e.target.name;
        let newValue = e.target.value;

        if (k === "quantity" && parseInt(newValue) >= 2 && formData.isCouponApplied) {
            setFormData(s => ({
                ...s,
                [k]: newValue,
                couponCode: "",
                discountAmount: 0,
                isCouponApplied: false
            }));
            setCouponInputValue("");
            setCouponMessage("個数が2個以上のため、クーポンが無効化されました。");
        } else {
            setFormData(s => ({...s, [k]: newValue}));
        }
    }
    const handleApplyCoupon = async () => {
        setIsApplyingCoupon(true);
        setCouponMessage("");

        try {
            const response = await axios.post(settings.apiUrl + "coupon", {
                product_id: props.productInformation.productId,
                code: couponInputValue
            });

            if (response.data.code === 200) {
                setFormData(s => ({
                    ...s,
                    couponCode: couponInputValue,
                    discountAmount: response.data.discountAmount,
                    isCouponApplied: true
                }));
                setCouponMessage("クーポンが適用されました。割引額: " + response.data.discountAmount + "円");
            } else {
                setCouponMessage(response.data.reason || "クーポンコードが無効です。");
            }
        } catch (e) {
            setCouponMessage("エラーが発生しました。時間をおいて再度お試しください。");
        } finally {
            setIsApplyingCoupon(false);
        }
    };

    const handleRemoveCoupon = () => {
        setFormData(s => ({
            ...s,
            couponCode: "",
            discountAmount: 0,
            isCouponApplied: false
        }));
        setCouponInputValue("");
        setCouponMessage("");
    };

    const calcFinalPrice = () => {
        // 金額計算
        let totalPriceBeforeTax = props.productInformation.price * formData.quantity;
        let discountedPrice = totalPriceBeforeTax - formData.discountAmount;
        if (discountedPrice < 0) discountedPrice = 0;
        let fee = 0;
        // 割引後の金額が0円の場合は振込手数料を加算しない
        if (discountedPrice > 0 && formData.paymentType === "transfer") {
            fee = constants.TRANSFER_FEE;
        }
        let finalPrice = parseInt((discountedPrice + fee) * (1 + constants.TAX_RATE));
        return finalPrice
    };

    const handleSubmit = () => {
        let finalPrice = calcFinalPrice();
        let isFreeOrder = finalPrice === 0;

        let submitData = {...formData, productId: props.productInformation.productId, quantity: parseInt(formData.quantity)};
        if (isFreeOrder) {
            submitData.paymentType = "free";
        }

        props.setOrderFormData(submitData);
        axios.post(settings.apiUrl + "setemail", {"email": formData.email}).then((r)=> {
            if   ((typeof r.data) != "object") {
                return window.location = "/error";
            }
            if (r.data.code === 200) {
                props.setOrderStep(constants.ORDER_STEP_CONFIRM);
            } else {
                window.location = "error";
            }
        }).catch((e) => {
            // return console.log(e.response.data);
            window.location = "error";
        });
    }

    let message = validateForm(formData);
    let nextButton = false;
    if (message === "") {
        message = "次の画面で、あなたのメールアドレスと注文内容を確認します。";
        nextButton = true;
    }

    const finalPrice = calcFinalPrice();
    const isFreeOrder = finalPrice === 0;

    let paymentTypeCombo = [];
    for (const [k,v] of Object.entries(constants.PAYMENT_TYPE_JAPANESE)) {
        if(k === "free") {
            continue;
        }
        if (k === "transfer") {
            paymentTypeCombo.push(<option key={k} value={k}>{v + " (支払い事務手数料" + constants.TRANSFER_FEE * (1 + constants.TAX_RATE)}円)</option>);
        } else {
            paymentTypeCombo.push(<option key={k} value={k}>{v}</option>);
        }
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
            <p>以下に必要事項を入力し、次へボタンを押してください。</p>
            <p>
				*クレジットカード決済でご注文される際は、GoogleChrome、またはFirefoxのそれぞれ最新版をご利用ください。
				NetReaderなど、その他のブラウザについては動作確認を行っておりません。
			</p>
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
                    <select id="orderForm-quantity" name="quantity" value={formData.quantity} onChange={handleChange} className="form-control">{quantityCombo}</select>
                </Col>
            </Col>
            <Col xs="12" md="3">
                <p><label htmlFor="orderForm-couponCode">クーポンコード（任意）</label></p>
            </Col>
            <Col xs="12" md="9" className="pb-2 mb-2">
                <Row>
                    <Col xs="8" md="6">
                        <input
                            name="couponCode"
                            value={couponInputValue}
                            onChange={(e) => setCouponInputValue(e.target.value)}
                            className="form-control"
                            id="orderForm-couponCode"
                            type="text"
                            disabled={formData.quantity >= 2 || formData.isCouponApplied}
                            placeholder="クーポンコード"
                        />
                    </Col>
                    <Col xs="4" md="3">
                        {formData.isCouponApplied ? (
                            <Button
                                onClick={handleRemoveCoupon}
                                variant="danger"
                                disabled={isApplyingCoupon}
                            >
                                削除
                            </Button>
                        ) : (
                            <Button
                                onClick={handleApplyCoupon}
                                variant="primary"
                                disabled={couponInputValue === "" || formData.quantity >= 2 || isApplyingCoupon}
                            >
                                適用
                            </Button>
                        )}
                    </Col>
                </Row>
                {formData.quantity >= 2 && (
                    <p className="text-muted mt-1">クーポンは1個購入時のみ利用できます。</p>
                )}
                {couponMessage && (
                    <p role="alert" className={formData.isCouponApplied ? "text-success mt-1" : "text-danger mt-1"}>
                        {couponMessage}
                    </p>
                )}
            </Col>
            {formData.isCouponApplied && (
                <>
                    <Col xs="12" md="3">
                        <p><label>割引額</label></p>
                    </Col>
                    <Col xs="12" md="9" className="mb-2">
                        <p className="text-success">-{formData.discountAmount.toLocaleString()} 円</p>
                    </Col>
                </>
            )}
            <Col xs="12" md="3">
                <p><label>合計金額（税込）</label></p>
            </Col>
            <Col xs="12" md="9" className="mb-2">
                <p>{finalPrice.toLocaleString()} 円</p>
            </Col>
            {isFreeOrder ? (
                <>
                    <Col xs="12" md="3">
                        <p><label>支払い方法</label></p>
                    </Col>
                    <Col xs="12" md="9" className="pb-2 mb-2">
                        <p>お支払いは不要です</p>
                    </Col>
                </>
            ) : (
                <>
                    <Col xs="6" md="3">
                        <p><label htmlFor="orderForm-paymentType">支払い方法</label></p>
                    </Col>
                    <Col xs="6" md="9" className="pb-2 mb-2">
                        <Col md="5">
                            <select id="orderForm-paymentType" name="paymentType" value={formData.paymentType} onChange={handleChange} className="form-control">{paymentTypeCombo}</select>
                        </Col>
                    </Col>
                </>
            )}
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
    if (data.name.length < 2) {
        errMessages.push("・お名前を、２文字以上で入力してください。");
    }
    if (!(/^([a-zA-Z0-9][._\-?+]?)+[a-zA-Z0-9]@([a-zA-Z0-9][._\-?+]?)+[a-zA-Z0-9]\.[a-zA-Z0-9]+$/.test(data.email))) {
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

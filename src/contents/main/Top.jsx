import { useState } from "react";
import queryString from "query-string";

import constants from "../../constants";
import InputForm from "./InputForm";
import ConfirmOrder from "./ConfirmOrder";
import PaymentOrder from "./paymentOrder";
import OrderFinished from "./OrderFinished";


const Top = (props) => {
  const [orderStep, setOrderStep] = useState(constants.ORDER_STEP_FINISH);
  const [orderFormData, setOrderFormData] = useState({
    productId: 0,
    name: "",
    email: "oreore@oresama.com",
    quantity: 1,
    paymentType: "credit",
    orderId: 3
  });
  const [productInformation, setProductInformation] = useState(null);
  const [initialized, setInitialized] = useState(false);
  
  // ページ初期化
  const params = queryString.parse(props.location.search);
  if ((!(isNaN(params.productid))) && (productInformation === null) && (!(initialized))){
    let productId = parseInt(params.productid);
    setProductInformation(getProductInformation(productId));
    setOrderFormData((s) => ({...s, productId: productId}));
    setOrderStep(constants.ORDER_STEP_INPUT);
    setInitialized(true);
  }
  
  if (orderStep === constants.ORDER_STEP_INPUT) {
    return (
      <InputForm productInformation={productInformation} orderFormData={orderFormData} setOrderFormData={setOrderFormData} setOrderStep={setOrderStep} />
    );
  } else if (orderStep === constants.ORDER_STEP_CONFIRM) {
    return (
      <ConfirmOrder productInformation={productInformation} orderFormData={orderFormData} setOrderFormData={setOrderFormData} setOrderStep={setOrderStep} />
    );
  } else if (orderStep === constants.ORDER_STEP_PAYMENT) {
    return (
      <PaymentOrder orderFormData={orderFormData} setOrderStep={setOrderStep} />
    );
  } else if (orderStep === constants.ORDER_STEP_FINISH) {
    return (
      <OrderFinished productInformation={productInformation} orderFormData={orderFormData} setOrderStep={setOrderStep} />
    );
  }
}


function getProductInformation(id){
  if (id === 1) {
    return {
      productId: id,
      name: "oreore software",
      edition: "Ultra Super Edition",
      discription: "これは、ヤバイです。",
      price: 500
    };
  }
  return null;
}

export default Top;

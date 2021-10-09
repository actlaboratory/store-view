import { useState } from "react";
import queryString from "query-string";

import constants from "../../constants";
import InputForm from "./InputForm";


const Top = (props) => {
  const [orderStep, setOrderStep] = useState(constants.ORDER_STEP_NONE);
  const [orderFormData, setOrderFormData] = useState({
    productId: 0,
    name: "",
    email: "",
    quantity: 0,
    paymentType: constants.PAYMENT_TYPE_CREDIT,
    orderId: 0
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
    }
}

function getProductInformation(id){
  if (id === 1) {
    return {
      productId: id,
      name: "oreore software",
      edition: "Ultra Super Edition",
      discription: "これは、ヤバイです。"
    };
  }
  return null;
}

export default Top;

import { useState } from "react";
import queryString from "query-string";
import axios from "axios";

import constants from "../../constants";
import settings from "../../settings";
import InputForm from "./InputForm";
import ConfirmOrder from "./ConfirmOrder";
import PaymentOrder from "./paymentOrder";
import OrderFinished from "./OrderFinished";


const Top = (props) => {
  const setProductInformationProc = (info) => {
    setProductInformation(info);
    setOrderFormData((s) => ({...s, productId: info.productId}));
    setOrderStep(constants.ORDER_STEP_INPUT);
  }
  const [orderStep, setOrderStep] = useState(constants.ORDER_STEP_NONE);

  const [orderFormData, setOrderFormData] = useState({
    productId: 0,
    name: "",
    email: "",
    quantity: 1,
    paymentType: "credit",
    orderId: 0
  });
  const [productInformation, setProductInformation] = useState(null);
  const [initialized, setInitialized] = useState(false);
  const [serialnumbers, setSerialnumbers] = useState(null);
  
  // ページ初期化
  const params = queryString.parse(props.location.search);
  if ((!(isNaN(params.productid))) && (productInformation === null) && (!(initialized))){
    let productId = parseInt(params.productid);
    getProductInformation(productId, setProductInformationProc);
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
    if (orderFormData.paymentType === "transfer") {
      setOrderStep(constants.ORDER_STEP_FINISH);
    }
    return (
      <PaymentOrder orderFormData={orderFormData} setOrderStep={setOrderStep} setSerialnumbers={setSerialnumbers} />
    );
  } else if (orderStep === constants.ORDER_STEP_FINISH) {
    return (
      <OrderFinished productInformation={productInformation} orderFormData={orderFormData} setOrderStep={setOrderStep} serialnumbers={serialnumbers} />
    );
  }
  return (<p>読み込み中...</p>);
}


function getProductInformation(id, func){
  axios.get(settings.apiUrl + "getproduct?productid=" + id).then((r) => {
    if ((r.data.software)) {
      return func({
        productId: id,
        name: r.data.software.name,
        edition: r.data.software.edition,
        discription: r.data.software.discription,
        price: r.data.software.price
      });
    }
  });
}

export default Top;

import { useState } from "react";
import queryString from "query-string";

import constants from "../../constants";


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
  
  // ページ初期化
  const params = queryString.parse(props.location.search);
  if ((!(isNaN(params.productid))) && (productInformation === null)){
    setProductInformation(getProductInformation(params.productid));
  }
  
  return (<>
    <p>productId param is {params.productid}</p>
  </>);
}

function getProductInformation(id){
  return {};
}

export default Top;

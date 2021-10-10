const constants = {
    ORDER_STEP_NONE: 0,
    ORDER_STEP_INPUT: 1,
    ORDER_STEP_CONFIRM: 2,
    ORDER_STEP_PAYMENT: 3,
    ORDER_STEP_FINISH: 4,
    PAYMENT_TYPE_JAPANESE: {
        credit: "クレジットカード決済",
        transfer: "銀行振込"
    },
    TAX_RATE: 0.1
};

export default constants;

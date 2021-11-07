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
    TAX_RATE: 0.1,
    BANK_NAME: "立地立地銀行",
    BANK_BRANCH: "符号支店",
    BANK_ACCOUNT: "普通",
    BANK_ACCOUNT_NO: "3383333",
    BANK_ACCOUNT_OWNER: "カネ　モチタロウ",
    TRANSFER_FEE: 500
};

export default constants;

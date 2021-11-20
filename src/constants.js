import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

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
    BANK_NAME: "三菱UFJ銀行",
    BANK_BRANCH: "玉川支店",
    BANK_ACCOUNT: "普通",
    BANK_ACCOUNT_NO: "0909939",
    BANK_ACCOUNT_OWNER: "アクセシブル　ツールズ　ラボラトリー　コウチ　ユウキ",
    TRANSFER_FEE: 500
};

export default constants;

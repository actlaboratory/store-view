import { Row, Col, Button } from "react-bootstrap";


const Input = (props) => {
    return (
        <Row>
            <h2>注文情報入力</h2>
        </Row>
        <Row>
            <p>以下に必要事項を入力し、次へボタンを選択してください。</p>
        </Row>
        <Row>
            <Col xs=12 md=3>
                <label>製品名</label>
            </Col>
            <Col xs=12 md=3>
                <p>{props.productInformation.name}</p>
            </Col>
            <Col xs=12 md=3>
                <label>エディション</label>
            </Col>
            <Col xs=12 md=3>
                <p>{props.productInformation.edition}</p>
            </Col>
            <Col xs=12 md=3>
                <label>説明</label>
            </Col>
            <Col xs=12 md=3>
                <p>{props.productInformation.discription}</p>
            </Col>
            <Col xs=12 md=3>
                <label htmlFor="orderForm-name">お名前</label>
            </Col>
            <Col xs=12 md=3>
                <input id="orderForm-name" type="text"/>
            </Col>
            <Col xs=12 md=3>
                <label htmlFor="orderForm-email">メールアドレス</label>
            </Col>
            <Col xs=12 md=3>
                <input id="orderForm-email" type="text"/>
            </Col>
            <Col xs=12 md=3>
                <label htmlFor="orderForm-quantity">購入個数</label>
            </Col>
            <Col xs=12 md=3>
                <input id="orderForm-quantity" type="number" />
            </Col>
        </Row>
        <Row>
            <Col xs=12 md=8>
                <p>次の画面で、あなたのメールアドレスと注文内容を確認します。</p>
            <col xs=12 md=4 style="text-right">
                <Button variant="primary">次へ</Button>
            </Col>
        </Row>
    )
}

import { Row, Col } from "react-bootstrap";
import settings from "../../settings"


const Error = () => {
    return (<>
        <Row className="bg-primary text-white mb-4">
            <h2>エラー</h2>
        </Row>
        <Row className="p2 mb-2">
            <p>不明なエラーが発生しました。恐れ入りますが、時間をおいて、再度アクセスしてみてください。</p>
        </Row>
        <Row className="p2 mb-2">
            <Col className="12 text-end">
                <button className="btn btn-success px-3" onClick={()=>{window.location = settings.siteUrl }}>トップページに戻る</button>
            </Col>
        </Row>
    </>);
}

export default Error;

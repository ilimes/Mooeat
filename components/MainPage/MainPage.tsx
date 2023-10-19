import CardComponent from "../Card/Card";

const MainPage: React.FC = () => {
    return (
        <>
            <div style={{ marginBottom: 20, fontWeight: 700, fontSize: 24 }}>
                👀 둘러보기
            </div>
            <div style={{ display: 'flex', gap: 10, overflow: 'auto', paddingBottom: 10 }}>
                <CardComponent />
                <CardComponent />
                <CardComponent />
                <CardComponent />
                <CardComponent />
            </div>
            <div style={{ marginBottom: 20, fontWeight: 700, fontSize: 24 }}>
                👀 둘러보기
            </div>
            <div style={{ display: 'flex', gap: 10, overflow: 'auto', paddingBottom: 10 }}>
                <CardComponent />
                <CardComponent />
                <CardComponent />
                <CardComponent />
                <CardComponent />
            </div>
        </>
    )
}

export default MainPage;
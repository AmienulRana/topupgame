import TransactionsStepItem from "../../molekuls/TransactionsStepItem";

const TransactionsStep = () => {
    return(
    <section id="feature" className="feature pt-50 pb-50">
        <div className="container-fluid">
            <h2 className="text-4xl fw-bold color-palette-1 text-center mb-30">It’s Really That Easy to Win the Game
            </h2>
            <div className="row gap-lg-0 gap-4" data-aos="fade-up">
                <TransactionsStepItem 
                    icon="step1" 
                    title="1. Start" 
                    description="Pilih salah satu game
                    yang ingin kamu top up"
                />
                <TransactionsStepItem 
                    icon="step2" 
                    title="2. Fill Up" 
                    description="Top up sesuai dengan
                    nominal yang sudah tersedia"
                />
                <TransactionsStepItem 
                    icon="step3" 
                    title="3. Be a Winner"
                    description="Siap digunakan untuk
                    improve permainan kamu"
                />
            </div>
        </div>
    </section>
    )
}

export default TransactionsStep;
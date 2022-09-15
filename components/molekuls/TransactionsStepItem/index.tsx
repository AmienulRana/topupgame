interface Props {
    icon: 'step1' | 'step2' | 'step3';
    title: string;
    description:string;
}
const TransactionsStepItem = (props: Props) => {
    const { description, icon, title } = props;
    return(
        <div className="col-lg-4">
            <div className="card feature-card border-0">
                <img src={`/icons/${icon}.svg`} width="80" height="80" alt="icon step" className="mb-2"/>
                <p className="fw-semibold text-2xl mb-2 color-palette-1">{ title } </p>
                <p className="text-lg color-palette-1 mb-0">{ description } </p>
            </div>
        </div>
    )
}

export default TransactionsStepItem;
import "./style.scss"

export default function MusicCard(props) {
    const { CardData } = props
    return (
        <div className="card-outer-wrapper">
            <div className="card-inner-wrapper">
                <img src={CardData.image[2].link} alt={CardData.name} className="w-100"/>
                <p className="font-14 mt-3 text-white text-start" dangerouslySetInnerHTML={{__html:CardData.name}}></p>
            </div>
        </div>
    )
}
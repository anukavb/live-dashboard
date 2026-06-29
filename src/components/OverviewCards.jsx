import "./OverviewCards.css";
import useStore from "../store/useStore";

export default function OverviewCards() {

    const stats = useStore(state=>state.stats);

    const cards=[

        {
            title:"Tasks",
            value:stats.tasks
        },

        {
            title:"Comments",
            value:stats.comments
        },

        {
            title:"Progress",
            value:stats.progress+"%"
        },

        {
            title:"Team",
            value:stats.activeUsers
        }

    ];

    return(

        <div className="cards">

            {

                cards.map(card=>(

                    <div
                        key={card.title}
                        className="card"
                    >

                        <p>

                            {card.title}

                        </p>

                        <h2>

                            {card.value}

                        </h2>

                    </div>

                ))

            }

        </div>

    )

}
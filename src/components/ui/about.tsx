import Goal from "../../assets/Goal.png";
import Rocket from "../../assets/Rocket.png";
import Brain from "../../assets/Brain.png";
import Frame from "../../assets/Frame.png";

export interface Cards {
    image: string,
    title: string,
    description: string
}

const card = [
    {
        image: Goal,
        title: "Missão",
        description: "Democratizar o aprendizado auditivo de inglês adaptando-se à rotina de cada pessoa."
    },
    {
        image: Brain,
        title: "Método",
        description: "Baseado em escuta ativa e repetição contextual, usando seus próprios áudios como material de estudo."
    },
    {
        image: Rocket,
        title: "Resultados",
        description: "Melhore sua compreensão, pronúncia e confiança em menos tempo."
    }
]

export const CardsData = (data: Cards) => {
    return (
        <article className="flex flex-col justify-center items-center max-w-64 p-6 shadow-md rounded-xl border border-gray-100 bg-white transition hover:shadow-xl">
            <img src={data.image} alt={data.title} className="w-16 h-16 mb-4" />
            <h3 className="font-bold text-xl mb-2 text-gray-900">{data.title}</h3>
            <p className="text-center text-gray-600 text-sm">{data.description}</p>
        </article>
    );
};

export const About = () => {
    return (
        <section className="w-full px-6 md:px-20 py-16 flex flex-col gap-20 items-center">
            {/* Título principal */}
            <div className="text-center max-w-3xl mx-auto flex flex-col gap-3">
                <h2 className="text-3xl font-extrabold text-gray-900">
                    Transforme o modo como aprende inglês
                </h2>
                <h3 className="text-gray-600 text-lg">
                    O Audio Learn combina prática auditiva e personalização para acelerar seu domínio da língua.
                </h3>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
                {card.map((value, index) => (
                    <CardsData
                        key={index}
                        description={value.description}
                        image={value.image}
                        title={value.title}
                    />
                ))}
            </div>

            {/* CTA + Imagem */}
            <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 max-w-fit">
                
                <div className="flex flex-col gap-4 max-w-lg">
                    <h2 className="text-2xl font-semibold text-gray-900 leading-snug">
                        Cada som pode se tornar um passo rumo à fluência.
                    </h2>
                    <h3 className="text-gray-600">
                        Com o Audio Learn, você transforma o cotidiano em aprendizado.
                    </h3>
                    <button
                        type="button"
                        className="rounded-md w-64 h-11 text-white bg-primary hover:bg-primary/80 transition font-medium"
                    >
                        Gerar seu próprio áudio
                    </button>
                </div>

                <img src={Frame} alt="Ilustração Audio Learn" className="w-[320px] lg:w-[380px]" />
            </div>
        </section>
    );
};

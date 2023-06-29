import Card from "./Card"
import ContactForm from "./ContactForm"

const Nosotros = () => {

    return (
        <div className="bg-slate-300 h-screen">
            <div className="flex justify-center ">
                <div className="bg-colorestxbg text-3xl border-2 my-5 p-2 border-black">Quienes Somos?</div>
            </div>
            <div className="flex">
                <div className=" flex w-1/3 py-4 justify-center">
                    <Card
                        title="David Samaniego"
                        description="Licenciado en Interactividad y Multimedia"
                        image="../../images/DS Picture.jpg"
                        email="davteran@gmail.com"
                    />
                </div>
                <div className="flex w-1/3 py-4 justify-center">
                    <Card
                        title="Melanie Naranjo"
                        description="Diseñadora Gráfica e Industrial"
                        image="../../images/Melanie.jpeg"
                        email="manaranjov97@gmail.com"
                    />
                </div>
                <div className="flex w-1/3 justify-center py-4">
                    <ContactForm />
                </div>
            </div>
        </div>

    )
}

export default Nosotros

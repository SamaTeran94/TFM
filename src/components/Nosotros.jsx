import Card from "./Card"
import ContactForm from "./ContactForm"

const Nosotros = () => {

    return (
        <div className="bg-slate-300 h-full xl:h-screen pb-10 xl:pb-0">
            <div className="flex justify-center ">
                <div className="bg-colorestxbg text-3xl border-2 my-5 p-2 border-black">Quienes Somos?</div>
            </div>
            <div className="flex items-center flex-col xl:flex-row w-full">
                <div className="flex flex-col lg:flex-row w-full xl:w-3/4 justify-evenly">
                    <div className=" flex py-5 justify-center">
                        <Card
                            title="David Samaniego"
                            description="Licenciado en Interactividad y Multimedia"
                            image="https://firebasestorage.googleapis.com/v0/b/tfm-unir-fb71e.appspot.com/o/images%2FDavidpng.png?alt=media&token=00c31983-b993-4341-b8fa-b701702cd0f1"
                            email="davteran@gmail.com"
                        />
                    </div>
                    <div className="flex py-5 justify-center">
                        <Card
                            title="Melanie Naranjo"
                            description="Diseñadora Gráfica e Industrial"
                            image="https://firebasestorage.googleapis.com/v0/b/tfm-unir-fb71e.appspot.com/o/images%2FMelanie.jpeg?alt=media&token=a8a60214-11d5-47db-aa94-5347e498e9f7"
                            email="manaranjov97@gmail.com"
                        />
                    </div>
                </div>
                <div className="flex p-10 sm:p-0 w-3/4 sm:w-1/2 lg:w-1/3 xl:w-1/4 mt-10 lg:mt-10 xl:mr-20 justify-center bg-white rounded">
                    <div className="flex-col justify-center py-5">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Nosotros

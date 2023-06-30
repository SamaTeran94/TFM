
import emailjs from 'emailjs-com'

const ContactForm = () => {

    const sendEmail = (e) => {
        e.preventDefault();

        try {
            emailjs.sendForm('service_fmbnaoe', 'template_jc3vy4s', e.target, 'dH1el8-p5RqKTMwhB')
                .then((result) => {
                    console.log(result.text);
                }, (error) => {
                    console.log(error.text);
                });
        } catch (error) {
            console.log(error)
        }
        e.target.reset()
        alert('Mensaje Enviado')
    }

    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold mb-4">Envianos un Mensaje</h2>
            <form onSubmit={sendEmail} className="max-w-md">
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Nombre</label>
                    <input
                        required
                        type="text"
                        name='name'
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Correo</label>
                    <input
                        required
                        type="email"
                        name='email'
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Asunto</label>
                    <input
                        required
                        type="text"
                        name='subject'
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Mensaje</label>
                    <textarea
                        required
                        name="message"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        rows={4}
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md"
                    value='Enviar Mensaje'
                >
                    Enviar Mensaje
                </button>
            </form>
        </div>
    )
}

export default ContactForm

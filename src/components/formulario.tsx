import { incluirContaPath } from "@/constants/pathNames";
import { axiosClient } from "@/SERVICES/axiosClient";
import { FormEvent, useState } from "react";

export default function Formulario() {

    interface respostaApi {
        respondido: boolean,
        falha?: boolean,
        mensagens?: string[]
    }

    const [respostaApi, setRespostaApi] = useState<respostaApi>({ respondido: false })

    const [formData, setFormData] = useState({
        nome: '',
        valorOriginal: 0,
        dataVencimento: '',
        dataPagamento: '',
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const formData = new FormData(event.currentTarget)

            const body = {
                nome: formData.get('nome') as string,
                valorOriginal: Number(formData.get('valorOriginal')),
                dataVencimento: formData.get('dataVencimento') as string,
                dataPagamento: formData.get('dataPagamento') as string,
            };

            const response = (await axiosClient.post(incluirContaPath, body));
            setRespostaApi({ respondido: true, falha: false, mensagens: response.data.mensagens })

        } catch (error: any) {
            if (error.response.status === 422) {
                setRespostaApi({ respondido: true, falha: true, mensagens: error.response.data?.mensagens })
            } else {
                setRespostaApi({ respondido: true, falha: true, mensagens: ["Falha ao fazer Inclusão."] })
            }
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="text-white text-lg w-full space-y-4">
                <div className="flex items-center space-x-4">
                    <label htmlFor="nome" className="w-32 text-right">Nome:</label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        className="bg-black bg-opacity-40 text-white rounded-lg px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="flex items-center space-x-4">
                    <label htmlFor="valorOriginal" className="w-32 text-right">Valor:</label>
                    <input
                        type="number"
                        id="valorOriginal"
                        name="valorOriginal"
                        min="0.01" step="0.01"
                        className="bg-black bg-opacity-40 text-white rounded-lg px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={formData.valorOriginal}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="flex items-center space-x-4">
                    <label htmlFor="dataVencimento" className="w-32 text-right">Vencimento:</label>
                    <input
                        type="date"
                        id="dataVencimento"
                        name="dataVencimento"
                        className="bg-black bg-opacity-40 text-white rounded-lg px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={formData.dataVencimento}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="flex items-center space-x-4">
                    <label htmlFor="dataPagamento" className="w-32 text-right">Pagamento:</label>
                    <input
                        type="date"
                        id="dataPagamento"
                        name="dataPagamento"
                        className="bg-black bg-opacity-40 text-white rounded-lg px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={formData.dataPagamento}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        className="bg-gradient-to-r from-green-400 via-teal-300 to-emerald-500 text-white font-bold px-6 py-2 rounded-lg shadow-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-green-400"
                        type="submit"
                    >
                        Incluir
                    </button>
                </div>
            </form>


            {respostaApi.respondido && divMenssagens(respostaApi)}
        </>
    );

    function divMenssagens(resposta: respostaApi) {
        return (
            <div className="
             text-base
             p-5
             mt-5
             text-white
             bg-black bg-opacity-40
            rounded-lg
            ">
                <div
                    className="flex space-x-4">
                    <div className={` font-bold text-lg mb-4 ${respostaApi.falha
                        ? "text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700 font-bold text-lg "
                        : "text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-700 font-bold text-lg "
                        }`}
                    >
                        {respostaApi.falha ? "Não Incluído" : " Incluído"}
                    </div>
                </div>
                <div>
                    {
                        resposta.mensagens?.map((m) =>
                            <span >{m}<br /></span>)
                    }
                </div>
            </div>
        )
    }
}
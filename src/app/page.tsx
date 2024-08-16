'use client';
import Formulario from "@/components/formulario";
import Grade from "@/components/grade";
import Listagem from "@/components/listagem";
import { consultarPath } from "@/constants/pathNames";
import { axiosClient } from "@/SERVICES/axiosClient";
import { Conta } from "@/types";
import { useState } from "react";
import Pesquisar from "../components/pesquisar";

export default function Home() {
  const [isListagem, setIsListagem] = useState(false);
  const [isFormulario, setIsFormulario] = useState(false);
  const [isPesquisa, setIsPesquisa] = useState(false);
  const [contas, setContas] = useState<Conta[]>();

  const getAllContas = async () => {
    try {
      const response = (await axiosClient.get(consultarPath));
      const data: Conta[] = response.data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const getListagem = async () => {
    getAllContas().then(
      contas => {
        setContas(contas);
      }
    )
    setIsFormulario(false);
    setIsPesquisa(false);
    setIsListagem(true);
  }

  const pushConta = async () => {
    setIsListagem(false);
    setIsPesquisa(false);
    setIsFormulario(true);
  }

  const getConta = async () => {
    setIsListagem(false);
    setIsFormulario(false);
    setIsPesquisa(true);
  }

  return (
    <main className="flex min-h-screen
    flex-col items-center
    justify-between
    p-20">

      <div className="flex
       flex-col
       space-y-5
       text-3xl
       items-center">

        <h1 className="text-4xl
        font-bold 
      bg-black
        bg-opacity-50
      text-white
        shadow-md p-2 rounded-lg 
        ">Conta - Frutiger Aero</h1>

        <div className="space-x-10">
          <button className="bg-gradient-to-r
          from-blue-400
          via-cyan-300
          to-indigo-500
            botoesFrutigerAero"
            onClick={() => getListagem()}
          >Listar Conta</button>

          <button className="bg-gradient-to-r
          from-green-400
          via-teal-300
          to-emerald-500
            botoesFrutigerAero"
            onClick={() => pushConta()}
          >Incluir Conta</button>

          <button className="bg-gradient-to-r
          from-blue-400
          via-cyan-300
          to-indigo-500
            botoesFrutigerAero"
            onClick={() => getConta()}
          > Pesquisar Conta
          </button>
        </div>
        <div>
          {isListagem && <Grade><Listagem contas={contas as Conta[]}></Listagem></Grade>}
          {isFormulario && <Grade><Formulario></Formulario></Grade>}
          {isPesquisa && <Grade><Pesquisar></Pesquisar></Grade>}
        </div>
      </div>

    </main>
  );
}

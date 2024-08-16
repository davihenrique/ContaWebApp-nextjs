"use client";
import Grade from '@/components/grade';
import { consultarPath } from '@/constants/pathNames';
import { axiosClient } from '@/SERVICES/axiosClient';
import { Conta } from '@/types';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';

export default function PesquisarConta() {
  const params = useParams();
  const id = params.id as string;
  const [conta, setConta] = useState<Conta>();
  const router = useRouter();

  const getConta = async () => {
    try {
      const url = `${consultarPath}?id=${id}`;
      const response = await axiosClient.get(url);
      const data: Conta =  response.data[0];
      return data;
    } catch (error) {
      return null;
    }
  };

  const handleClick = () => {
    router.push('/');
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getConta();
      setConta(data as Conta);
    };
    fetchData();
  }, [id]);

  return (
    <div className='flex
    flex-col
    items-center
    justify-between
    p-20
  text-white text-xl'>
      <Grade>
        <span><b>ID:</b> {conta?.id || ""}</span><br />
        <span> <b>Nome:</b> {conta?.nome || ""}</span><br />
        <span> <b>Valor Original:</b> {conta?.valorOriginal || ""}</span><br />
        <span> <b>Valor Corrigido:</b> {conta?.valorCorrigido || ""}</span><br />
        <span> <b>Dias de Atraso:</b> {conta?.quantidadeDiasDeAtraso || ""}</span><br />
        <span> <b>Data de Pagamento:</b> {conta?.dataPagamento ? format(new Date(conta.dataPagamento), 'dd/MM/yyyy') : ""}</span><br />
        <span> <b>Regra de Cálculo:</b> {conta?.regraCalculo || ""}</span><br />
      </Grade>

      <button className="mt-10
      bg-gradient-to-r
    from-green-400
    via-teal-300
    to-emerald-500
      botoesFrutigerAero"
      onClick={() => {handleClick()}}>
        Incluir Conta</button>
    </div>
  );
}

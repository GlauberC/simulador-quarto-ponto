import {
  addHours,
  differenceInHours,
  differenceInMinutes,
  format,
  subMinutes,
} from "date-fns";
import { useMemo, useState } from "react";
import InputMask from "react-input-mask";

export default function Home() {
  const [resposta, setResposta] = useState("");
  const [primeiroPonto, setPrimeiroPonto] = useState("");
  const [segundoPonto, setSegundoPonto] = useState("");
  const [terceiroPonto, setTerceiroPonto] = useState("");

  function verificaCalcular() {
    return (
      primeiroPonto &&
      !primeiroPonto.match("_") &&
      segundoPonto &&
      !segundoPonto.match("_") &&
      terceiroPonto &&
      !terceiroPonto.match("_")
    );
  }

  function calcularHoraFinal() {
    if (verificaCalcular()) {
      const [primeirasHoras, primeirosMinutos] = primeiroPonto.split(":");
      const [segundasHoras, segundosMinutos] = segundoPonto.split(":");
      const [terceirasHoras, terceirosMinutos] = terceiroPonto.split(":");

      let primeiroTime = new Date(0, 0, 0, 0, 0, 0, 0);
      let segundoTime = new Date(0, 0, 0, 0, 0, 0, 0);
      let terceiroTime = new Date(0, 0, 0, 0, 0, 0, 0);
      if (
        Number(primeirasHoras) >= 0 &&
        Number(primeirasHoras) <= 23 &&
        Number(primeirosMinutos) >= 0 &&
        Number(primeirosMinutos) <= 59
      ) {
        primeiroTime.setHours(Number(primeirasHoras));
        primeiroTime.setMinutes(Number(primeirosMinutos));
      }

      if (
        Number(segundasHoras) >= 0 &&
        Number(segundasHoras) <= 23 &&
        Number(segundosMinutos) >= 0 &&
        Number(segundosMinutos) <= 59 &&
        Number(terceirasHoras) >= 0 &&
        Number(terceirasHoras) <= 23 &&
        Number(terceirosMinutos) >= 0 &&
        Number(terceirosMinutos) <= 59
      ) {
        segundoTime.setHours(Number(segundasHoras));
        segundoTime.setMinutes(Number(segundosMinutos));
        terceiroTime.setHours(Number(terceirasHoras));
        terceiroTime.setMinutes(Number(terceirosMinutos));
      }
      const pagoMinutes = differenceInMinutes(segundoTime, primeiroTime);
      const referenceResposta = addHours(terceiroTime, 8);
      const respostaTime = subMinutes(referenceResposta, pagoMinutes);
      setResposta(format(respostaTime, "HH:mm"));
    }
  }

  return (
    <div className="flex flex-col m-12">
      <h1 className="font-bold">Primeiro Ponto</h1>
      <InputMask
        mask="99:99"
        onChange={(e) => setPrimeiroPonto(e.target.value)}
        value={primeiroPonto}
        className="border border-cyan-900 rounded-m mb-2 w-32 text-center outline-none mt-1"
      />
      <h1 className="font-bold">Segundo Ponto</h1>
      <InputMask
        mask="99:99"
        onChange={(e) => setSegundoPonto(e.target.value)}
        value={segundoPonto}
        className="border border-cyan-900 rounded-m mb-2 w-32 text-center outline-none mt-1"
      />
      <h1 className="font-bold">Terceiro Ponto</h1>
      <InputMask
        mask="99:99"
        onChange={(e) => setTerceiroPonto(e.target.value)}
        value={terceiroPonto}
        className="border border-cyan-700 rounded-m mb-2 w-32 text-center outline-none mt-1"
      />
      <button
        type="button"
        className={` mt-4 w-32 p-2 text-white rounded-sm ${
          verificaCalcular()
            ? "bg-cyan-700 hover:bg-cyan-900 transition"
            : "bg-gray-200"
        } `}
        onClick={() => calcularHoraFinal()}
      >
        Calcular
      </button>
      {resposta !== "" && (
        <div className="mt-4 text-center w-32">
          <h1 className="font-bold">Quarto Ponto</h1>
          <h1 className="text-2xl">{resposta}</h1>
        </div>
      )}
    </div>
  );
}

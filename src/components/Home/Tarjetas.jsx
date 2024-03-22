import React from 'react';
import AnimatedCounter from './AnimatedCounter';

const Tarjetas = ({ infoHome }) => {
  return (
    <section className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-5 text-white md:text-base text-xs">
      <article className="p-4 border-2 border-black rounded-md py-2 bg-gradient-to-r from-red-800 to-red-500">
        <div className="text-center flex flex-col">
          <AnimatedCounter value={infoHome?.SociosSupervielle} />
          SOCIOS SUPERVIELLE
        </div>
      </article>
      <article className="p-4 border-2 border-black rounded-md py-2 bg-gradient-to-b from-blue-800 to-blue-500">
        <div className="text-center flex flex-col">
          <AnimatedCounter value={infoHome?.SociosOtrosBancos} />
          SOCIOS OTROS BANCOS
        </div>
      </article>
      <article className="p-4 border-2 border-black rounded-md py-2 bg-gradient-to-l from-violet-800 to-violet-500">
        <div className="text-center flex flex-col">
          <AnimatedCounter value={infoHome?.SociosTarjeta} />
          SOCIOS TARJETA
        </div>
      </article>
      <article className="p-4 border-2 border-black rounded-md py-2 bg-gradient-to-r from-slate-800 to-slate-500">
        <div className="text-center flex flex-col">
          <AnimatedCounter value={infoHome?.SociosActivos} />
          RESPONSABLES ACTIVOS
        </div>
      </article>
      <article className="p-4 border-2 border-black rounded-md py-2 bg-gradient-to-b from-slate-800 to-slate-500">
        <div className="text-center flex flex-col">
          <AnimatedCounter value={infoHome?.Adherentes} />
          SOCIOS ADHERENTES
        </div>
      </article>
      <article className="p-4 border-2 border-black rounded-md py-2 bg-gradient-to-l from-slate-800 to-slate-500">
        <div className="text-center flex flex-col">
          <AnimatedCounter value={infoHome?.Servicios} />
          SERVICIOS TOTALES
        </div>
      </article>
    </section>
  );
};

export default Tarjetas;

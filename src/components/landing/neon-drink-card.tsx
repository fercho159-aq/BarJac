"use client"

import Link from "next/link";

// Componente de Tarjeta de Bebida Neon
export const NeonDrinkCard = ({ name, price, color, description, icon }) => {
  const colorMap = {
    pink: 'border-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.4)] text-pink-500',
    green: 'border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.4)] text-green-500',
    blue: 'border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.4)] text-blue-500',
    yellow: 'border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.4)] text-yellow-400',
    orange: 'border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.4)] text-orange-500',
  };

  return (
    <div className={`relative bg-gray-900/80 border-2 ${colorMap[color]} rounded-xl p-6 transform hover:-translate-y-2 transition-all duration-300 group`}>
      <div className="absolute -top-4 -right-4 bg-black border border-white rounded-full p-2 rotate-12 group-hover:rotate-0 transition-transform">
        <span className="text-white font-bold text-lg">${price}</span>
      </div>
      <div className="h-16 w-16 mb-4 mx-auto text-4xl flex items-center justify-center">
        {icon || '🦆'}
      </div>
      <h3 className={`text-2xl font-black uppercase text-center mb-2 ${colorMap[color].split(' ').pop()}`}>{name}</h3>
      <p className="text-gray-400 text-center text-sm mb-4">{description}</p>
       <Link href="/menu" className={`w-full py-2 rounded font-bold border ${colorMap[color]} hover:bg-white hover:text-black transition-colors uppercase text-sm block text-center`}>
        Ver Detalle
      </Link>
    </div>
  );
};

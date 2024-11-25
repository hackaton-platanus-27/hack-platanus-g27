"use client";

import React from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";

const HomePage: React.FC = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>3³</title>
        <meta
          name="description"
          content="Democratizando el acceso a la educación superior con práctica personalizada."
        />
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 space-y-12 bg-gradient-to-tr from-blue-100 via-purple-100 to-yellow-100 rounded-2xl">
        <main className="flex flex-col items-center text-center px-4 py-4 w-full max-w-6xl rounded-xl">
          <h1 className="text-2xl lg:text-3xl max-w-2xl font-bold text-gray-700 mb-4">
            La práctica hace al maestro 💡 y nosotros hacemos la práctica 💪✨
          </h1>
          <p className="text-gray-600 mb-8">
            Democratizamos el acceso a la educación superior con práctica
            accesible y personalizada.
          </p>
          <button
            className="border border-gray-300 bg-white text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-black hover:text-white transition duration-300"
            onClick={() => router.push("/quiz")}
          >
            Comienza ahora
          </button>
        </main>

        <footer className="w-full text-center py-6 bg-gray-100 rounded-xl max-w-6xl">
          <p className="text-gray-600 text-sm font-light">
            El proyecto 3³ se encuentra bajo la licencia MIT y es{" "}
            <a
              href="https://github.com/hackaton-platanus-27/hack-platanus-g27"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:text-green-600 hover:underline"
            >
              código abierto
            </a>
            🚀
          </p>
        </footer>
      </div>
    </>
  );
};

export default HomePage;

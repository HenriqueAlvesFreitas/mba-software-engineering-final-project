import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      alert("Preencha todos os campos");
      return;
    }

    // salvando no localStorage
    localStorage.setItem("user", JSON.stringify({ email, password }));

    // opcional: salvar um flag de login
    localStorage.setItem("isAuthenticated", "true");

    navigate("/dashboard");
  };

  return (
    <div className="h-screen w-full flex bg-[#0f172a]">
      
      {/* LEFT SIDE */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-[#1d4ed8] via-[#2563eb] to-[#7c3aed] text-white relative">
        <div className="max-w-md text-center px-8">
          
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-xl">
              🤖
            </div>
            <h1 className="text-3xl font-bold">AgentSquad</h1>
          </div>

          <p className="text-lg text-white/80 mb-10">
            Insights de dados em segundos. <br />
            Sem intermediários, sem espera.
          </p>

          <div className="flex gap-4 justify-center">
            <div className="bg-white/10 px-6 py-4 rounded-xl backdrop-blur">
              <p className="text-2xl font-bold">70%</p>
              <p className="text-sm text-white/70">Menos tempo</p>
            </div>

            <div className="bg-white/10 px-6 py-4 rounded-xl backdrop-blur">
              <p className="text-2xl font-bold">150</p>
              <p className="text-sm text-white/70">Usuários</p>
            </div>

            <div className="bg-white/10 px-6 py-4 rounded-xl backdrop-blur">
              <p className="text-2xl font-bold">3s</p>
              <p className="text-sm text-white/70">Resposta</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-1 items-center justify-center bg-white">
        <div className="w-full max-w-md px-8">
          
          <h2 className="text-2xl font-bold text-[#0f172a] mb-2">
            Bem-vindo de volta
          </h2>
          <p className="text-[#64748b] mb-6">
            Acesse com sua conta
          </p>

          {/* SSO BUTTONS */}
          <div className="space-y-3 mb-6">
            <button
                disabled
                className="w-full border rounded-xl py-3 transition 
                        bg-gray-100 text-gray-400 cursor-not-allowed 
                        flex items-center justify-center gap-2"
            >
                🔵 Entrar com Microsoft (SSO)
            </button>

            <button
                disabled
                className="w-full border rounded-xl py-3 transition 
                        bg-gray-100 text-gray-400 cursor-not-allowed 
                        flex items-center justify-center gap-2"
            >
                🔴 Entrar com Google (SSO)
            </button>
         </div>

          {/* DIVIDER */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-sm text-gray-400">ou use e-mail e senha</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* FORM */}
          <div className="space-y-4">
            <input
              type="email"
              placeholder="E-mail corporativo"
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}  
            />

            <input
              type="password"
              placeholder="Senha"
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={handleLogin}
            className="w-full mt-6 bg-[#2563eb] text-white py-3 rounded-xl font-medium hover:bg-[#1d4ed8] transition shadow-lg"
          >
            Entrar →
          </button>

          <p className="text-xs text-gray-400 mt-4 text-center">
            Dados protegidos por criptografia AES-256
          </p>
        </div>
      </div>
    </div>
  );
}
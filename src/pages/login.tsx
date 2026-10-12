function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary">Sentinela Hospital</h1>
            <p className="text-gray-600 mt-2">Sistema Hospitalar Integrado</p>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="••••••••"
              />
            </div>

            <button className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors">
              Entrar
            </button>

            <div className="text-center">
              <a href="#" className="text-sm text-primary hover:underline">
                Esqueci a senha
              </a>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Ambiente de desenvolvimento - Configure as credenciais do Supabase para autenticação
              real
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

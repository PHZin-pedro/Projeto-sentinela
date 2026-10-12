import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/login";
import { MainLayout } from "./layouts/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <MainLayout>
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900">Atendimentos Hoje</h3>
                    <p className="text-3xl font-bold text-primary mt-2">0</p>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900">Em Espera</h3>
                    <p className="text-3xl font-bold text-warning mt-2">0</p>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900">Salas Livres</h3>
                    <p className="text-3xl font-bold text-success mt-2">0</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Módulos Disponíveis</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="text-sm font-medium text-gray-900">Recepção</div>
                    </button>
                    <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="text-sm font-medium text-gray-900">Triagem</div>
                    </button>
                    <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="text-sm font-medium text-gray-900">Médico</div>
                    </button>
                    <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="text-sm font-medium text-gray-900">Enfermagem</div>
                    </button>
                    <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="text-sm font-medium text-gray-900">Farmácia</div>
                    </button>
                    <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="text-sm font-medium text-gray-900">Financeiro</div>
                    </button>
                    <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="text-sm font-medium text-gray-900">Administração</div>
                    </button>
                    <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="text-sm font-medium text-gray-900">Painel TV</div>
                    </button>
                  </div>
                </div>
              </div>
            </MainLayout>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

-- Migration: Schema Inicial - Sentinela Hospital
-- Autor: Sistema
-- Data: 2024-01-01
-- Descrição: Criação das tabelas iniciais, RLS e perfis de usuário

-- =====================================================
-- EXTENSIONS
-- =====================================================

-- Habilita UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- ENUMS
-- =====================================================

-- Perfis de usuário
CREATE TYPE user_role AS ENUM (
  'admin',
  'medico',
  'enfermeiro',
  'recepcionista',
  'farmaceutico',
  'financeiro',
  'triagem'
);

-- Estados do atendimento
CREATE TYPE attendance_status AS ENUM (
  'chegada',
  'triagem',
  'espera',
  'atendimento',
  'finalizado',
  'cancelado'
);

-- Estados da triagem
CREATE TYPE triage_status AS ENUM (
  'pendente',
  'em_triagem',
  'classificada',
  'reavaliacao',
  'cancelada'
);

-- Prioridades de triagem
CREATE TYPE triage_priority AS ENUM (
  'vermelho',
  'laranja',
  'amarelo',
  'verde',
  'azul'
);

-- Estados da sala
CREATE TYPE room_status AS ENUM (
  'livre',
  'ocupada',
  'limpeza',
  'indisponivel'
);

-- =====================================================
-- TABELAS PRINCIPAIS
-- =====================================================

-- Organizações (multi-tenancy)
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  cnpj TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Unidades hospitalares
CREATE TABLE units (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  is_headquarters BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Departamentos/Setores
CREATE TABLE departments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  unit_id UUID NOT NULL REFERENCES units(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Perfis de usuário extendidos
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'recepcionista',
  unit_id UUID REFERENCES units(id) ON DELETE SET NULL,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pacientes
CREATE TABLE patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  unit_id UUID NOT NULL REFERENCES units(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  cpf TEXT UNIQUE,
  rg TEXT,
  date_of_birth DATE,
  gender TEXT,
  phone TEXT,
  email TEXT,
  address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Atendimentos
CREATE TABLE attendances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  unit_id UUID NOT NULL REFERENCES units(id) ON DELETE CASCADE,
  status attendance_status NOT NULL DEFAULT 'chegada',
  password TEXT,
  arrival_time TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Triagens
CREATE TABLE triages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  attendance_id UUID NOT NULL REFERENCES attendances(id) ON DELETE CASCADE,
  professional_id UUID REFERENCES profiles(id),
  status triage_status NOT NULL DEFAULT 'pendente',
  priority triage_priority,
  chief_complaint TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sinais vitais
CREATE TABLE vital_signs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  triage_id UUID NOT NULL REFERENCES triages(id) ON DELETE CASCADE,
  blood_pressure_systolic INTEGER,
  blood_pressure_diastolic INTEGER,
  heart_rate INTEGER,
  respiratory_rate INTEGER,
  temperature DECIMAL(5, 2),
  oxygen_saturation DECIMAL(5, 2),
  blood_glucose DECIMAL(5, 2),
  recorded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Salas
CREATE TABLE rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  unit_id UUID NOT NULL REFERENCES units(id) ON DELETE CASCADE,
  department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- consulta, exame, procedimento
  status room_status NOT NULL DEFAULT 'livre',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Chamadas TV
CREATE TABLE calls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  attendance_id UUID NOT NULL REFERENCES attendances(id) ON DELETE CASCADE,
  room_id UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pendente',
  called_at TIMESTAMPTZ DEFAULT NOW(),
  arrived_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auditoria
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  action TEXT NOT NULL,
  table_name TEXT NOT NULL,
  record_id UUID,
  old_data JSONB,
  new_data JSONB,
  ip_address INET,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE units ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendances ENABLE ROW LEVEL SECURITY;
ALTER TABLE triages ENABLE ROW LEVEL SECURITY;
ALTER TABLE vital_signs ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE calls ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Revogar grants padrão
REVOKE ALL ON organizations FROM anon, authenticated;
REVOKE ALL ON units FROM anon, authenticated;
REVOKE ALL ON departments FROM anon, authenticated;
REVOKE ALL ON profiles FROM anon, authenticated;
REVOKE ALL ON patients FROM anon, authenticated;
REVOKE ALL ON attendances FROM anon, authenticated;
REVOKE ALL ON triages FROM anon, authenticated;
REVOKE ALL ON vital_signs FROM anon, authenticated;
REVOKE ALL ON rooms FROM anon, authenticated;
REVOKE ALL ON calls FROM anon, authenticated;
REVOKE ALL ON audit_logs FROM anon, authenticated;

-- Conceder grants mínimos para authenticated
GRANT SELECT ON organizations TO authenticated;
GRANT SELECT ON units TO authenticated;
GRANT SELECT ON departments TO authenticated;
GRANT SELECT, UPDATE ON profiles TO authenticated;
GRANT SELECT, INSERT, UPDATE ON patients TO authenticated;
GRANT SELECT, INSERT, UPDATE ON attendances TO authenticated;
GRANT SELECT, INSERT, UPDATE ON triages TO authenticated;
GRANT SELECT, INSERT, UPDATE ON vital_signs TO authenticated;
GRANT SELECT ON rooms TO authenticated;
GRANT SELECT, INSERT, UPDATE ON calls TO authenticated;
GRANT SELECT ON audit_logs TO authenticated;

-- =====================================================
-- POLÍTICAS RLS (SIMPLIFICADAS)
-- =====================================================

-- Por enquanto, políticas simplificadas para permitir desenvolvimento
-- Serão refinadas conforme necessário

-- Organizations: Todos podem ver (para simplificar)
CREATE POLICY "Users can view organizations"
ON organizations FOR SELECT
TO authenticated
USING (true);

-- Units: Todos podem ver
CREATE POLICY "Users can view units"
ON units FOR SELECT
TO authenticated
USING (true);

-- Departments: Todos podem ver
CREATE POLICY "Users can view departments"
ON departments FOR SELECT
TO authenticated
USING (true);

-- Profiles: Usuários só podem ver o próprio
CREATE POLICY "Users can view own profile"
ON profiles FOR SELECT
TO authenticated
USING (id = auth.uid());

CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
TO authenticated
USING (id = auth.uid());

-- Patients: Todos podem ver (será refinado depois)
CREATE POLICY "Users can view patients"
ON patients FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Users can insert patients"
ON patients FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Users can update patients"
ON patients FOR UPDATE
TO authenticated
USING (true);

-- Attendances: Todos podem ver
CREATE POLICY "Users can view attendances"
ON attendances FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Users can insert attendances"
ON attendances FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Users can update attendances"
ON attendances FOR UPDATE
TO authenticated
USING (true);

-- Triages: Todos podem ver
CREATE POLICY "Users can view triages"
ON triages FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Users can insert triages"
ON triages FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Users can update triages"
ON triages FOR UPDATE
TO authenticated
USING (true);

-- Vital signs: Todos podem ver
CREATE POLICY "Users can view vital_signs"
ON vital_signs FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Users can insert vital_signs"
ON vital_signs FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Users can update vital_signs"
ON vital_signs FOR UPDATE
TO authenticated
USING (true);

-- Rooms: Todos podem ver
CREATE POLICY "Users can view rooms"
ON rooms FOR SELECT
TO authenticated
USING (true);

-- Calls: Todos podem ver
CREATE POLICY "Users can view calls"
ON calls FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Users can insert calls"
ON calls FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Users can update calls"
ON calls FOR UPDATE
TO authenticated
USING (true);

-- Audit logs: Todos podem ver (será refinado para admin)
CREATE POLICY "Users can view audit_logs"
ON audit_logs FOR SELECT
TO authenticated
USING (true);

-- =====================================================
-- FUNÇÕES AUXILIARES
-- =====================================================

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para updated_at
CREATE TRIGGER update_organizations_updated_at
  BEFORE UPDATE ON organizations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_units_updated_at
  BEFORE UPDATE ON units
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_patients_updated_at
  BEFORE UPDATE ON patients
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_attendances_updated_at
  BEFORE UPDATE ON attendances
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_triages_updated_at
  BEFORE UPDATE ON triages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- DADOS INICIAIS (SEED)
-- =====================================================

-- Criar organização padrão
INSERT INTO organizations (name, cnpj) VALUES
('Sentinela Hospital', '00.000.000/0001-00');

-- Criar unidade padrão
INSERT INTO units (organization_id, name, address, phone, is_headquarters) VALUES
(
  (SELECT id FROM organizations WHERE name = 'Sentinela Hospital'),
  'Matriz',
  'Rua Principal, 123',
  '(11) 1234-5678',
  TRUE
);

-- Criar departamentos
INSERT INTO departments (unit_id, name, description) VALUES
(
  (SELECT id FROM units WHERE name = 'Matriz'),
  'Recepção',
  'Área de recepção e cadastro'
),
(
  (SELECT id FROM units WHERE name = 'Matriz'),
  'Triagem',
  'Área de triagem e classificação de risco'
),
(
  (SELECT id FROM units WHERE name = 'Matriz'),
  'Consultório',
  'Área de consultas médicas'
);

-- Criar salas
INSERT INTO rooms (unit_id, department_id, name, type, status) VALUES
(
  (SELECT id FROM units WHERE name = 'Matriz'),
  (SELECT id FROM departments WHERE name = 'Consultório'),
  'Consultório 1',
  'consulta',
  'livre'
),
(
  (SELECT id FROM units WHERE name = 'Matriz'),
  (SELECT id FROM departments WHERE name = 'Consultório'),
  'Consultório 2',
  'consulta',
  'livre'
),
(
  (SELECT id FROM units WHERE name = 'Matriz'),
  (SELECT id FROM departments WHERE name = 'Triagem'),
  'Sala de Triagem 1',
  'triagem',
  'livre'
);

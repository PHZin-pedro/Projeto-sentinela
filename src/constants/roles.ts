/**
 * Perfis de Usuário - Sentinela Hospital
 *
 * Define os perfis de acesso e suas permissões básicas.
 */

export enum UserRole {
  ADMIN = "admin",
  MEDICO = "medico",
  ENFERMEIRO = "enfermeiro",
  RECEPCIONISTA = "recepcionista",
  FARMACEUTICO = "farmaceutico",
  FINANCEIRO = "financeiro",
  TRIAGEM = "triagem",
}

export const roleLabels: Record<UserRole, string> = {
  [UserRole.ADMIN]: "Administrador",
  [UserRole.MEDICO]: "Médico",
  [UserRole.ENFERMEIRO]: "Enfermeiro",
  [UserRole.RECEPCIONISTA]: "Recepcionista",
  [UserRole.FARMACEUTICO]: "Farmacêutico",
  [UserRole.FINANCEIRO]: "Financeiro",
  [UserRole.TRIAGEM]: "Triagem",
};

export const roleDescriptions: Record<UserRole, string> = {
  [UserRole.ADMIN]: "Acesso completo ao sistema, configurações e gestão de usuários",
  [UserRole.MEDICO]: "Acesso a prontuário, prescrições e diagnósticos",
  [UserRole.ENFERMEIRO]: "Acesso a plano de cuidados e administração de medicamentos",
  [UserRole.RECEPCIONISTA]: "Acesso a cadastro, check-in e filas",
  [UserRole.FARMACEUTICO]: "Acesso a estoque, dispensação e compras",
  [UserRole.FINANCEIRO]: "Acesso a faturamento, contas e relatórios financeiros",
  [UserRole.TRIAGEM]: "Acesso a triagem e classificação de risco",
};

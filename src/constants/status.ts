/**
 * Estados do Sistema - Sentinela Hospital
 *
 * Define os estados e transições para as principais entidades.
 */

// Estados do Atendimento
export enum AttendanceStatus {
  CHEGADA = "chegada",
  TRIAGEM = "triagem",
  ESPERA = "espera",
  ATENDIMENTO = "atendimento",
  FINALIZADO = "finalizado",
  CANCELADO = "cancelado",
}

export const attendanceStatusLabels: Record<AttendanceStatus, string> = {
  [AttendanceStatus.CHEGADA]: "Chegada",
  [AttendanceStatus.TRIAGEM]: "Em Triagem",
  [AttendanceStatus.ESPERA]: "Em Espera",
  [AttendanceStatus.ATENDIMENTO]: "Em Atendimento",
  [AttendanceStatus.FINALIZADO]: "Finalizado",
  [AttendanceStatus.CANCELADO]: "Cancelado",
};

// Estados da Triagem
export enum TriageStatus {
  PENDENTE = "pendente",
  EM_TRIAGEM = "em_triagem",
  CLASSIFICADA = "classificada",
  REAVALIACAO = "reavaliacao",
  CANCELADA = "cancelada",
}

export const triageStatusLabels: Record<TriageStatus, string> = {
  [TriageStatus.PENDENTE]: "Pendente",
  [TriageStatus.EM_TRIAGEM]: "Em Triagem",
  [TriageStatus.CLASSIFICADA]: "Classificada",
  [TriageStatus.REAVALIACAO]: "Reavaliação",
  [TriageStatus.CANCELADA]: "Cancelada",
};

// Estados da Sala
export enum RoomStatus {
  LIVRE = "livre",
  OCUPADA = "ocupada",
  LIMPEZA = "limpeza",
  INDISPONIVEL = "indisponivel",
}

export const roomStatusLabels: Record<RoomStatus, string> = {
  [RoomStatus.LIVRE]: "Livre",
  [RoomStatus.OCUPADA]: "Ocupada",
  [RoomStatus.LIMPEZA]: "Em Limpeza",
  [RoomStatus.INDISPONIVEL]: "Indisponível",
};

// Estados da Chamada TV
export enum CallStatus {
  PENDENTE = "pendente",
  CHAMANDO = "chamando",
  CHEGOU = "chegou",
  CONCLUIDA = "concluida",
  CANCELADA = "cancelada",
}

export const callStatusLabels: Record<CallStatus, string> = {
  [CallStatus.PENDENTE]: "Pendente",
  [CallStatus.CHAMANDO]: "Chamando",
  [CallStatus.CHEGOU]: "Chegou",
  [CallStatus.CONCLUIDA]: "Concluída",
  [CallStatus.CANCELADA]: "Cancelada",
};

// Estados da Prescrição
export enum PrescriptionStatus {
  RASCUNHO = "rascunho",
  PRESCRITA = "prescrita",
  EM_DISPENSACAO = "em_dispensacao",
  DISPENSADA = "dispensada",
  ADMINISTRADA = "administrada",
  CANCELADA = "cancelada",
  RECUSADA = "recusada",
  OMITIDA = "omitida",
}

export const prescriptionStatusLabels: Record<PrescriptionStatus, string> = {
  [PrescriptionStatus.RASCUNHO]: "Rascunho",
  [PrescriptionStatus.PRESCRITA]: "Prescrita",
  [PrescriptionStatus.EM_DISPENSACAO]: "Em Dispensação",
  [PrescriptionStatus.DISPENSADA]: "Dispensada",
  [PrescriptionStatus.ADMINISTRADA]: "Administrada",
  [PrescriptionStatus.CANCELADA]: "Cancelada",
  [PrescriptionStatus.RECUSADA]: "Recusada",
  [PrescriptionStatus.OMITIDA]: "Omitida",
};

// Estados do Estoque (Lote)
export enum BatchStatus {
  DISPONIVEL = "disponivel",
  RESERVADO = "reservado",
  DISPENSADO = "dispensado",
  BAIXADO = "baixado",
  BLOQUEADO = "bloqueado",
  QUARENTENA = "quarentena",
}

export const batchStatusLabels: Record<BatchStatus, string> = {
  [BatchStatus.DISPONIVEL]: "Disponível",
  [BatchStatus.RESERVADO]: "Reservado",
  [BatchStatus.DISPENSADO]: "Dispensado",
  [BatchStatus.BAIXADO]: "Baixado",
  [BatchStatus.BLOQUEADO]: "Bloqueado",
  [BatchStatus.QUARENTENA]: "Em Quarentena",
};

// Estados da Transação Financeira
export enum TransactionStatus {
  PENDENTE = "pendente",
  APROVADA = "aprovada",
  CONCILIADA = "conciliada",
  CANCELADA = "cancelada",
  ESTORNADA = "estornada",
}

export const transactionStatusLabels: Record<TransactionStatus, string> = {
  [TransactionStatus.PENDENTE]: "Pendente",
  [TransactionStatus.APROVADA]: "Aprovada",
  [TransactionStatus.CONCILIADA]: "Conciliada",
  [TransactionStatus.CANCELADA]: "Cancelada",
  [TransactionStatus.ESTORNADA]: "Estornada",
};

/**
 * Prioridades de Triagem - Sentinela Hospital
 *
 * Baseado no protocolo de Manchester (adaptável).
 */

export enum TriagePriority {
  VERMELHO = "vermelho", // Emergência - atendimento imediato
  LARANJA = "laranja", // Muito urgente - atendimento até 10 min
  AMARELO = "amarelo", // Urgente - atendimento até 60 min
  VERDE = "verde", // Pouco urgente - atendimento até 120 min
  AZUL = "azul", // Não urgente - atendimento até 240 min
}

export const triagePriorityLabels: Record<TriagePriority, string> = {
  [TriagePriority.VERMELHO]: "Emergência",
  [TriagePriority.LARANJA]: "Muito Urgente",
  [TriagePriority.AMARELO]: "Urgente",
  [TriagePriority.VERDE]: "Pouco Urgente",
  [TriagePriority.AZUL]: "Não Urgente",
};

export const triagePriorityDescriptions: Record<TriagePriority, string> = {
  [TriagePriority.VERMELHO]: "Risco de vida iminente - atendimento imediato",
  [TriagePriority.LARANJA]: "Risco potencial de vida - atendimento até 10 minutos",
  [TriagePriority.AMARELO]: "Situação urgente mas estável - atendimento até 60 minutos",
  [TriagePriority.VERDE]: "Situação não urgente - atendimento até 120 minutos",
  [TriagePriority.AZUL]: "Situação não urgente - atendimento até 240 minutos",
};

export const triagePriorityColors: Record<TriagePriority, string> = {
  [TriagePriority.VERMELHO]: "bg-red-600 text-white",
  [TriagePriority.LARANJA]: "bg-orange-500 text-white",
  [TriagePriority.AMARELO]: "bg-yellow-500 text-black",
  [TriagePriority.VERDE]: "bg-green-600 text-white",
  [TriagePriority.AZUL]: "bg-blue-600 text-white",
};

export const triagePriorityOrder: TriagePriority[] = [
  TriagePriority.VERMELHO,
  TriagePriority.LARANJA,
  TriagePriority.AMARELO,
  TriagePriority.VERDE,
  TriagePriority.AZUL,
];

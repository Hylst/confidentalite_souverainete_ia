export const profileRecommendations: Record<string, string[]> = {
  rh: ['/module/3', '/module/6', '/atelier/5'],
  dev: ['/module/4', '/module/5', '/module/8', '/atelier/3', '/atelier/4'],
  juriste: ['/module/1', '/module/2', '/module/7', '/atelier/1', '/atelier/2', '/annexe/glossaire'],
  dpo: ['/module/1', '/module/2', '/module/3', '/module/4', '/module/5', '/module/6', '/module/7', '/module/8', '/atelier/6'],
  autre: []
};

export const profileLabels: Record<string, string> = {
  rh: 'Ressources Humaines (RH)',
  dev: 'Développeur / Tech',
  juriste: 'Juriste / Légal',
  dpo: 'DPO / Conformité',
  autre: 'Curieux / Autre'
};

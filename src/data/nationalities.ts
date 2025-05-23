import flags from 'emoji-flags';

export const nationalityOptions = flags.data.map(flag => ({
  value: flag.name,
  label: `${flag.emoji} ${flag.name}`
}));
export const positionOptions = [
  { value: 'Goalkeeper', label: '🥅 Goalkeeper' },
  { value: 'Defender', label: '🛡️ Defender' },
  { value: 'Midfielder', label: '🎯 Midfielder' },
  { value: 'Forward', label: '⚽ Forward' }
];

export const strongFootOptions = [
  { value: 'right', label: '🦶 Right' },
  { value: 'left', label: '🦶 Left' },
  { value: 'both', label: '🦵 Both' }
];

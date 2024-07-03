type Player = {
  id: string;
  name: string;
};
type InitialStateProps = {
  userName: string;
  currentLevel: number;
  players: Player[];
};
export { InitialStateProps, Player };

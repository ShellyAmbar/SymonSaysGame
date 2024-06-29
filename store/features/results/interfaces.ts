type Result = {
  id: string;
  userName: string;
  score: number;
};
type InitialStateProps = {
  results: Result[];
  sortedResultsByUser: Result[];
};
export { Result, InitialStateProps };

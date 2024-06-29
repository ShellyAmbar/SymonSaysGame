type Result = {
  dateCreated: string;
  userName: string;
  level: number;
  indexInLevel: number;
};
type InitialStateProps = {
  results: Result[];
  sortedResultsByUser: Result[];
};
export { Result, InitialStateProps };

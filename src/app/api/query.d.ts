export interface QueryParams {
  $select?: string;
  $filter?: string;
  $expand?: string;
  $orderby?: string;
  $top?: number;
  $skip?: number;
}

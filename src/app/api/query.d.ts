export interface QueryParams {
  queryKey?: any[];
  $select?: string;
  $filter?: string;
  $expand?: string;
  $orderby?: string;
  $top?: number;
  $skip?: number;
  $count?: boolean;
}

export interface ODataResponse<T> {
  "@odata.count"?: number;
  value: T[];
}

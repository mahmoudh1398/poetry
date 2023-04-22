import { FILTER_OPTIONS } from "enums/filter-options-enum";
import { FilterOptionsModel } from "models/filter-options.model";
import { PoemModel, PoemsModel } from "models/poems.model";

interface sortByStringProps {
  arr: PoemsModel;
  filter: string;
}

export const sortByString = (props: sortByStringProps) => {
  const sortedPoems = props.arr.sort((a: PoemModel, b: PoemModel) => {
    if (
      a[FILTER_OPTIONS[props.filter as FilterOptionsModel]] <
      b[FILTER_OPTIONS[props.filter as FilterOptionsModel]]
    ) {
      return -1;
    }
    if (
      a[FILTER_OPTIONS[props.filter as FilterOptionsModel]] >
      b[FILTER_OPTIONS[props.filter as FilterOptionsModel]]
    ) {
      return 1;
    }
    return 0;
  });
  return sortedPoems;
};

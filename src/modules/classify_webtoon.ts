import type { A_webtoon_info } from "./base_modules";

const assemble_parts = (webtoon_data: A_webtoon_info[], view_webtoon_count: number) => {
  //요일별로 분류
  const weekday_webtoon = (week_num: number): A_webtoon_info[] => {
    let weekday_webtoon_data = webtoon_data.filter(function (element: A_webtoon_info) {
      return element.weekday == week_num;
    });
    return weekday_webtoon_data;
  };
  //한페이지에 보여줄 갯수로 묶음
  const partition_webtoon = (weekday_webtoon_data: A_webtoon_info[], view_webtoon_count: number) => {
    let partition_webtoon_data: A_webtoon_info[][] = [];
    const weekday_webtoon_count: number = weekday_webtoon_data.length;
    const rest_webtoon_count: number = weekday_webtoon_count % view_webtoon_count;
    if (rest_webtoon_count == 0) {
      const partition_count = weekday_webtoon_count / view_webtoon_count;
      for (let i = 0; i < partition_count; i++) {
        partition_webtoon_data.push(weekday_webtoon_data.slice(i * view_webtoon_count, i * view_webtoon_count + view_webtoon_count));
      }
    } else {
      const partition_count = (weekday_webtoon_count - rest_webtoon_count) / view_webtoon_count;
      for (let i = 0; i < partition_count; i++) {
        partition_webtoon_data.push(weekday_webtoon_data.slice(i * view_webtoon_count, i * view_webtoon_count + view_webtoon_count));
      }
      partition_webtoon_data.push(weekday_webtoon_data.slice(weekday_webtoon_count - rest_webtoon_count - 1, weekday_webtoon_count - 1));
    }
    return partition_webtoon_data;
  };

  //분류했던 데이터 재조립
  let classify_webtoon_data: A_webtoon_info[][][] = [];
  for (let i = 0; i < 8; i++) {
    classify_webtoon_data.push(partition_webtoon(weekday_webtoon(i), view_webtoon_count));
  }
  return classify_webtoon_data;
};

function search_data(input_txt: string, webtoon_data: A_webtoon_info[]) {
  const change_target_data = webtoon_data.filter(function (element: A_webtoon_info) {
    return element.title.includes(input_txt) || element.artist.includes(input_txt);
  });
  return change_target_data;
}

export { assemble_parts, search_data };

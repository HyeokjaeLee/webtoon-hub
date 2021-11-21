export default function get_json_data(url: string) {
  let xmlhttp = new XMLHttpRequest()
  let json_data: any
  xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      try {
        json_data = JSON.parse(xmlhttp.responseText)
      } catch (err: any) {
        console.log(err.message + " in " + xmlhttp.responseText)
        return
      }
    }
  }
  xmlhttp.open("GET", url, false) //true는 비동기식, false는 동기식 true로 할시 변수 변경전에 웹페이지가 떠버림
  xmlhttp.send()
  return json_data
}

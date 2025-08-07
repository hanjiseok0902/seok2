function getMealInfo() {
  const dateInput = document.getElementById("mealDate").value;
  const resultDiv = document.getElementById("mealResult");

  if (!dateInput) {
    resultDiv.innerText = "📅 날짜를 선택해주세요.";
    return;
  }

  const formattedDate = dateInput.replace(/-/g, "");
  const apiUrl = `https://open.neis.go.kr/hub/mealServiceDietInfo?ATPT_OFCDC_SC_CODE=J10&SD_SCHUL_CODE=7530079&MLSV_YMD=${formattedDate}`;

  fetch(apiUrl)
    .then(response => response.text())
    .then(xmlText => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, "text/xml");
      const mealNode = xmlDoc.querySelector("row > DDISH_NM");

      if (mealNode) {
        // 줄바꿈 처리 (HTML <br/> 대신 \n)
        const mealInfo = mealNode.textContent.replace(/<br\/>/g, '\n');
        resultDiv.innerText = `📅 ${dateInput} 급식 메뉴:\n\n${mealInfo}`;
      } else {
        resultDiv.innerText = `해당 날짜(${dateInput})의 급식 정보가 없습니다.`;
      }
    })
    .catch(error => {
      console.error("Error fetching meal info:", error);
      resultDiv.innerText = "급식 정보를 가져오는 중 오류가 발생했습니다.";
    });
}

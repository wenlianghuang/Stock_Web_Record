package sox

import (
	"encoding/json"
	"fmt"
	"os"

	"github.com/gocolly/colly"
)

func Sox() {
	file, err := os.ReadFile("D:\\Stock_Web_Record\\data.json")
	if err != nil {
		fmt.Println("Error reading file: ", err)
		return
	}
	var data []map[string]string
	err = json.Unmarshal(file, &data)
	if err != nil {
		fmt.Println("Error unmarshalling JSON:", err)
		return
	}
	c := colly.NewCollector()
	var allstring []string

	// 指數
	c.OnHTML(".livePrice.yf-1tejb6 > span", func(e *colly.HTMLElement) {
		//println(e.Text)
		text := e.Text
		data[4]["value"] = text
	})
	// 漲跌數字和比例
	c.OnHTML(".priceChange.yf-1tejb6 > span", func(e *colly.HTMLElement) {
		allstring = append(allstring, e.Text)

	})
	c.Visit("https://finance.yahoo.com/quote/%5ESOX?p=^SOX")
	data[4]["change"] = allstring[0] + " " + allstring[1]
	print(data[4]["change"])
	updatedData, err := json.MarshalIndent(data, "", "")
	if err != nil {
		fmt.Println("Error marshlling JSON:", err)
		return
	}

	err = os.WriteFile("D:\\Stock_Web_Record\\data.json", updatedData, 0644)
	if err != nil {
		fmt.Println("Error writing file:", err)
		return
	}
	//for i := 0; i < len(allstring); i++ {
	//println(allstring[i])
	//}

}

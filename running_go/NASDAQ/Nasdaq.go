package nasdaq

import (
	"encoding/json"
	"fmt"
	"os"

	"github.com/gocolly/colly"
)

func NASDAQ() {
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
	c.OnHTML(".livePrice.yf-mgkamr > span", func(e *colly.HTMLElement) {
		//println(e.Text)
		text := e.Text
		data[1]["value"] = text
	})
	c.OnHTML(".priceChange.yf-mgkamr > span", func(e *colly.HTMLElement) {
		allstring = append(allstring, e.Text)
	})
	c.Visit("https://finance.yahoo.com/quote/%5EIXIC?p=^IXIC")
	data[1]["change"] = allstring[0] + " " + allstring[1]
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
}

package doj

import (
	"encoding/json"
	"fmt"
	"os"

	"github.com/gocolly/colly"
)

func Doj() {
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
	c.OnHTML(".livePrice.yf-1tejb6 > span", func(e *colly.HTMLElement) {
		//println(e.Text)
		text := e.Text
		data[0]["value"] = text
	})
	//c.OnHTML(".priceChange.yf-mgkamr > span", func(e *colly.HTMLElement) {
	c.OnHTML(".priceChange.yf-1tejb6 > span", func(e *colly.HTMLElement) {
		allstring = append(allstring, e.Text)
	})
	c.Visit("https://finance.yahoo.com/quote/%5EDJI?p=^DJI")
	data[0]["change"] = allstring[0] + " " + allstring[1]
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

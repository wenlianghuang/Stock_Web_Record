package ko

import "github.com/gocolly/colly"

func Ko() {
	c := colly.NewCollector()
	var allstring []string
	c.OnHTML(".priceChange.yf-mgkamr > span", func(e *colly.HTMLElement) {
		allstring = append(allstring, e.Text)
	})
	c.Visit("https://finance.yahoo.com/quote/KO?p=KO")
	for i := 0; i < len(allstring); i++ {
		println(allstring[i])
	}
}

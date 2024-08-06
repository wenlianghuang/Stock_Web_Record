package sandp500

import (
	"github.com/gocolly/colly"
)

func SandP500() {
	c := colly.NewCollector()
	var allstring []string
	c.OnHTML(".priceChange.yf-mgkamr > span", func(e *colly.HTMLElement) {
		allstring = append(allstring, e.Text)
	})
	c.Visit("https://finance.yahoo.com/quote/%5EGSPC?p=^GSPC")
	for i := 0; i < len(allstring); i++ {
		println(allstring[i])
	}
}

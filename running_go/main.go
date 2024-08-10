package main

import (
	CrudeOil "running_go/CrudOil"
	DowJones "running_go/DOJ"
	Nasdaq "running_go/NASDAQ"
	SandP500 "running_go/SandP500"
)

func main() {
	// This is a comment
	// This is another comment
	// This is a third comment
	SandP500.SandP500()
	DowJones.Doj()
	Nasdaq.NASDAQ()
	CrudeOil.CrudeOil()
	//Sox.Sox()

}

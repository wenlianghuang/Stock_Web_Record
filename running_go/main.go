package main

import (
	DowJones "running_go/DOJ"
	Nasdaq "running_go/NASDAQ"
	Sox "running_go/SOX"
	SandP500 "running_go/SandP500"
)

func main() {
	// This is a comment
	// This is another comment
	// This is a third comment
	SandP500.SandP500()
	DowJones.Doj()
	Nasdaq.NASDAQ()
	Sox.Sox()
}

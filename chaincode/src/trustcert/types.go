package main

// Response struct for the chaincode response
type Response struct {
	Result interface{} `json:"result"`
	Error  string      `json:"error`
}

type Role struct {
	Role string `json:"role"`
}

type QueryResult struct {
	Key    string `json:"Key"`
	Record string `json:"Record"`
}

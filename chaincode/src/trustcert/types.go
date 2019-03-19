package main

// Response struct for the chaincode response
type Response struct {
	result interface{} `json:"result"`
	error  string      `json:"error`
}

type Role struct {
	role string `json:"role"`
}

type QueryResult struct {
	Key    string `json:"Key"`
	Record string `json:"Record"`
}

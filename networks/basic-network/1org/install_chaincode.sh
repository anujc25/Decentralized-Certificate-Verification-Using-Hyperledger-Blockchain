export CORE_PEER_LOCALMSPID=SJSUMSP
export CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/sjsu.vericert.com/users/Admin@sjsu.vericert.com/msp

# append this to gopath
export CC_SRC_PATH=github.com/vericert
export LANGUAGE=golang

starttime=$(date +%s)

docker exec -e "CORE_PEER_LOCALMSPID=$CORE_PEER_LOCALMSPID" -e "CORE_PEER_MSPCONFIGPATH=$CORE_PEER_MSPCONFIGPATH" cli peer chaincode install -n vericert -v 1.0 -p "$CC_SRC_PATH" -l "$LANGUAGE"
docker exec -e "CORE_PEER_LOCALMSPID=$CORE_PEER_LOCALMSPID" -e "CORE_PEER_MSPCONFIGPATH=$CORE_PEER_MSPCONFIGPATH" cli peer chaincode instantiate -o orderer.vericert.com:7050 -C mychannel -n vericert -l "$LANGUAGE" -v 1.0 -c '{"Args":[""]}' -P "OR ('SJSUMSP.member')"
sleep 10
docker exec -e "CORE_PEER_LOCALMSPID=$CORE_PEER_LOCALMSPID" -e "CORE_PEER_MSPCONFIGPATH=$CORE_PEER_MSPCONFIGPATH" cli peer chaincode invoke -o orderer.vericert.com:7050 -C mychannel -n vericert -c '{"function":"initLedger","Args":[""]}'

printf "\nTotal setup execution time : $(($(date +%s) - starttime)) secs ...\n\n\n"
printf "Start by installing required packages run 'npm install'\n"
printf "Then run 'node enrollAdmin.js', then 'node registerUser'\n\n"
printf "The 'node invoke.js' will fail until it has been updated with valid arguments\n"
printf "The 'node query.js' may be run at anytime once the user has been registered\n\n"



##
# key: hash
# value:
#     timestamp
#     issuer
#     user    
Set GOPATH in the environment variable(in ~/.bashrc) as path to this directory.
E.g.    My project location is in the directory /Documents/CMPE_295B/gitrepo/VeriCert.
        Set GOPATH as 
            GOPATH=$HOME/Documents/CMPE_295B/gitrepo/VeriCert/chaincode

Steps:
    1.  On terminal, Open ~/.bashrc file (On Linux)
        vi ~/.bashrc (If required, use su privilige)
    2.  Go to last line and insert GOPATH line (press "i" to enter into edit mode):
        GOPATH=$HOME/Documents/CMPE_295B/gitrepo/VeriCert/chaincode
    3.  Save the file and quit.
        Press "esc" and press ":wq" and enter.
    4.  Type the following command to get the changes in effect immediately:
        source ~/.bashrc
    5.  Close terminal
    6.  Open Visual Studio code. Open the "$HOME/Documents/CMPE_295B/gitrepo/VeriCert/chaincode/src/trustcert" folder using "Open Folder" from "File" Menu on top.
    7.  Proceed with packaging of chaincode.
var HttpRequest = require("nebulas").HttpRequest;
var Neb = require("nebulas").Neb;
var Account = require("nebulas").Account;
var Transaction = require("nebulas").Transaction;
var Unit = require("nebulas").Unit;
var myneb = new Neb();
myneb.setRequest(new HttpRequest("https://mainnet.nebulas.io"));
var account, tx, txhash;
var dappaddress="n1rp1eCMHKRHXyWtDHP6i3U3z1asCmU8kQV";
function createResultDiv(titleText)	//创建结果区
{
	var maindiv=document.getElementById("main");	//获取主块
	var resultDiv=document.getElementById('resultarea');	//获取并删除之前的转换结果div
	if(resultDiv!=null)
	{
		maindiv.removeChild(resultDiv);
	}
	resultDiv=document.createElement("div");	//创建元素
	resultDiv.setAttribute("id","resultarea");
	maindiv.appendChild(resultDiv);				//追加到主块
	resultTitle=document.createElement("h1");
	var node=document.createTextNode(titleText+" 频道上的最新广播");
	resultTitle.appendChild(node);
	resultDiv.appendChild(resultTitle);
}
function addNewResult(result,resultNumber=0,resultBoxRows=10)	//添加监听结果
{
	var resultDiv=document.getElementById('resultarea');
	var newresultDiv=document.createElement("div");
	var copyButton=document.createElement("button");
	
	newresult=document.createElement("textarea");
	newresult.value=result;
	newresult.setAttribute("id","resultBox"+resultNumber);
	newresult.setAttribute("class","resultBox");
	newresult.setAttribute("rows",resultBoxRows);
	
	//var node=document.createTextNode("点击复制以下内容");
	copyButton.appendChild(node);
	copyButton.setAttribute("data-clipboard-target","#resultBox"+resultNumber);
	copyButton.setAttribute("class","btn");
	
	newresultDiv.appendChild(copyButton);
	newresultDiv.appendChild(newresult);
	resultDiv.appendChild(newresultDiv);
}
function getlastbroadcasting(username)
{
	
	var dapp_address=dappaddress;
	var dapp_function="getlastbroadcasting";
	if(username)
	{
		var dapp_arguments=username;
		createResultDiv(username);
	}
	else{
		var dapp_arguments=document.getElementById('username').value;
		createResultDiv(dapp_arguments);
	}
	myneb.api.call({
					from:dapp_address,
                    to: dapp_address,
                    value: 0,
                    contract: {
						function: dapp_function,
						args: "[\""+dapp_arguments+"\"]"
					},
					   gasPrice: 1000000,
						gasLimit: 2000000,
                }).then(function(tx) {
					addNewResult(JSON.parse(tx.result).maintext.trim());
				})
}
function userregister()
{
	var arguments = "[\"" + document.getElementById('username').value + "\"]";
        window.postMessage({
            "target": "contentscript",
            "data":{
                "to" : dappaddress,
                "value" : "0",
                "contract" : {
                    "function" : "register",
                    "args" : arguments
                }
            },
            "method": "neb_sendTransaction"
        }, "*");
}
function broadcasting()
{
		var arguments =  "[\"" + document.getElementById('username').value + "\",\"" + document.getElementById('maintext').value + "\"]";
        window.postMessage({
            "target": "contentscript",
            "data":{
                "to" : dappaddress,
                "value" : "0",
                "contract" : {
                    "function" : "register",
                    "args" : arguments
                }
            },
            "method": "neb_sendTransaction"
        }, "*");
}
function anonymousbroadcasting()
{
	var arguments =  "[\"" + document.getElementById('maintext').value + "\"]";
        window.postMessage({
            "target": "contentscript",
            "data":{
                "to" : dappaddress,
                "value" : "0",
                "contract" : {
                    "function" : "anonymousbroadcasting",
                    "args" : arguments
                }
            },
            "method": "neb_sendTransaction"
        }, "*");
}

setTimeout(function(){getlastbroadcasting("星云广播");},1000);

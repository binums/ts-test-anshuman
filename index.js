"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const AWS = require("aws-sdk");
const AWSTypes = require("@aws-sdk/types");
const ses = new AWS.SES();
const https = require("https");
exports.handler = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("line 8");
        const params = {
            Destination: {
                ToAddresses: ["anshumansaged@gmail.com"]
            },
            Message: {
                Body: {
                    Text: { Data: "Hey Your Server is down! Please look once" }
                },
                Subject: { Data: "Website Status" }
            },
            Source: "anshumansaged@gmail.com"
        };
        let url = "https://www.antstack.io/hello";
        const promise = new Promise(function (resolve, reject) {
            https
                .get(url, (res) => {
                if (res.statusCode === 200) {
                    console.log("Working like rocket~~!");
                    return {
                        statusCode: 200,
                        body: JSON.stringify("You are still going well")
                    };
                }
                else {
                    console.log("error");
                    return ses.sendEmail(params, function (err, data) {
                        if (err)
                            console.log(err);
                        else
                            console.log(data);
                    });
                }
                // resolve(res.statusCode);
            })
                .on("error", (e) => {
                reject(Error(e));
            });
        });
        return promise;
    }
    catch (err) {
        console.log(err);
        return err;
    }
});

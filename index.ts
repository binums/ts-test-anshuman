const AWS = require("aws-sdk");
const AWSTypes = require("@aws-sdk/types");
const ses = new AWS.SES();

const https = require("https");

exports.handler = async () => {
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
				.get(url, (res: { statusCode: number }) => {
					if (res.statusCode === 200) {
						console.log("Working like rocket~~!");
						return {
							statusCode: 200,
							body: JSON.stringify("You are still going well")
						};
					} else {
						console.log("error");
						return ses.sendEmail(params, function (err: any, data: any) {
							if (err) console.log(err);
							else console.log(data);
						});
					}
					// resolve(res.statusCode);
				})
				.on("error", (e: any) => {
					reject(Error(e));
				});
		});
		return promise;
	} catch (err) {
		console.log(err);
		return err;
	}
};

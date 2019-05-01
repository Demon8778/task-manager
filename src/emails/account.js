const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// sgMail.setApiKey(
// 	'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'
// );

const sendWelcomeEmail = (email, name) => {
	sgMail.send({
		to: email,
		from: 'kirankatariya8778@gmail.com',
		subject: 'Thanks for joining in!',
		text: `
            Welcome to the app, ${name}. please let me know if you are enjoying it or not!
        `
	});
};

const sendCancelationEmail = (email, name) => {
	sgMail.send({
		to: email,
		from: 'kirankatariya8778@gmail.com',
		subject: 'Sorry to see you go!',
		text: `
            Goodbye, ${name}. Hope to see you soon!
        `
	});
};

module.exports = {
	sendWelcomeEmail,
	sendCancelationEmail
};

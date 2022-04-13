// import transport from '../api/nodeMailer';
import nodemailer from 'nodemailer';
export async function post() {
	const transport = nodemailer.createTransport({
		host: 'smtp.mailtrap.io',
		port: 2525,
		auth: {
			user: '872946cdbb94a0',
			pass: '34332f67b9a58b'
		}
	});
	try {
		transport.sendMail(
			{
				from: 'ziggySS@donotreply.com', // sender address
				to: 'bribri546@gmail.com', // list of receivers
				subject: 'Hello ✔', // Subject line
				text: 'Hello world?', // plain text body
				html: '<b>Hello world?</b>' // html body
			},
			(error) => {
				if (error) {
					console.log('Error: ', error);
					return {
						status: 400,
						body: JSON.stringify({
							message: 'Bad Request!'
						})
					};
				} else {
					console.log('Send success!');
					return {
						status: 200,
						body: JSON.stringify({
							message: 'email sent!'
						})
					};
				}
			}
		);
	} catch (error) {
		return {
			status: 500,
			body: JSON.stringify({
				message: 'There was a problem with the email submit!'
			})
		};
	}
}

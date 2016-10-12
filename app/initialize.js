import App from 'components/App';

document.addEventListener('DOMContentLoaded', () => {
	const testData = {"text" : "This is a test string"};
  	const app = new App(testData);
  	app.start();
});
